const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', function() {
  const baseUrl = 'http://localhost:3000';
  let testThreadId;
  let testReplyId;
  const testBoard = 'test-board';
  const testPassword = 'test-password';
  const wrongPassword = 'wrong-password';

  suite('API ROUTING FOR /api/threads', function() {
    
    test('Creating a new thread: POST request to /api/threads/{board}', function(done) {
      chai.request(baseUrl)
        .post(`/api/threads/${testBoard}`)
        .send({
          text: 'Test thread text',
          delete_password: testPassword
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, '_id');
          assert.property(res.body, 'text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'bumped_on');
          assert.property(res.body, 'reported');
          assert.property(res.body, 'delete_password');
          assert.property(res.body, 'replies');
          assert.equal(res.body.text, 'Test thread text');
          assert.equal(res.body.delete_password, testPassword);
          assert.isArray(res.body.replies);
          testThreadId = res.body._id;
          done();
        });
    });

    test('Viewing the 10 most recent bumped threads with 3 replies each: GET request to /api/threads/{board}', function(done) {
      chai.request(baseUrl)
        .get(`/api/threads/${testBoard}`)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.isAtMost(res.body.length, 10);
          res.body.forEach(function(thread) {
            assert.property(thread, '_id');
            assert.property(thread, 'text');
            assert.property(thread, 'created_on');
            assert.property(thread, 'bumped_on');
            assert.property(thread, 'replies');
            assert.notProperty(thread, 'reported');
            assert.notProperty(thread, 'delete_password');
            assert.isArray(thread.replies);
            assert.isAtMost(thread.replies.length, 3);
            thread.replies.forEach(function(reply) {
              assert.property(reply, '_id');
              assert.property(reply, 'text');
              assert.property(reply, 'created_on');
              assert.notProperty(reply, 'reported');
              assert.notProperty(reply, 'delete_password');
            });
          });
          done();
        });
    });

    test('Deleting a thread with incorrect password: DELETE request to /api/threads/{board}', function(done) {
      chai.request(baseUrl)
        .delete(`/api/threads/${testBoard}`)
        .send({
          thread_id: testThreadId,
          delete_password: wrongPassword
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'incorrect password');
          done();
        });
    });

    test('Deleting a thread with correct password: DELETE request to /api/threads/{board}', function(done) {
      chai.request(baseUrl)
        .delete(`/api/threads/${testBoard}`)
        .send({
          thread_id: testThreadId,
          delete_password: testPassword
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        });
    });

    test('Reporting a thread: PUT request to /api/threads/{board}', function(done) {
      // First create a new thread to report
      chai.request(baseUrl)
        .post(`/api/threads/${testBoard}`)
        .send({
          text: 'Thread to report',
          delete_password: testPassword
        })
        .end(function(err, res) {
          testThreadId = res.body._id;
          chai.request(baseUrl)
            .put(`/api/threads/${testBoard}`)
            .send({
              thread_id: testThreadId
            })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.text, 'reported');
              done();
            });
        });
    });
  });

  suite('API ROUTING FOR /api/replies', function() {
    
    test('Creating a new reply: POST request to /api/replies/{board}', function(done) {
      chai.request(baseUrl)
        .post(`/api/replies/${testBoard}`)
        .send({
          thread_id: testThreadId,
          text: 'Test reply text',
          delete_password: testPassword
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, '_id');
          assert.property(res.body, 'replies');
          assert.isArray(res.body.replies);
          assert.isAbove(res.body.replies.length, 0);
          const lastReply = res.body.replies[res.body.replies.length - 1];
          assert.equal(lastReply.text, 'Test reply text');
          testReplyId = lastReply._id;
          done();
        });
    });

    test('Viewing a single thread with all replies: GET request to /api/replies/{board}', function(done) {
      chai.request(baseUrl)
        .get(`/api/replies/${testBoard}`)
        .query({ thread_id: testThreadId })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, '_id');
          assert.property(res.body, 'text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'bumped_on');
          assert.property(res.body, 'replies');
          assert.notProperty(res.body, 'reported');
          assert.notProperty(res.body, 'delete_password');
          assert.isArray(res.body.replies);
          assert.isAbove(res.body.replies.length, 0);
          res.body.replies.forEach(function(reply) {
            assert.property(reply, '_id');
            assert.property(reply, 'text');
            assert.property(reply, 'created_on');
            assert.notProperty(reply, 'reported');
            assert.notProperty(reply, 'delete_password');
          });
          done();
        });
    });

    test('Deleting a reply with incorrect password: DELETE request to /api/replies/{board}', function(done) {
      chai.request(baseUrl)
        .delete(`/api/replies/${testBoard}`)
        .send({
          thread_id: testThreadId,
          reply_id: testReplyId,
          delete_password: wrongPassword
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'incorrect password');
          done();
        });
    });

    test('Deleting a reply with correct password: DELETE request to /api/replies/{board}', function(done) {
      chai.request(baseUrl)
        .delete(`/api/replies/${testBoard}`)
        .send({
          thread_id: testThreadId,
          reply_id: testReplyId,
          delete_password: testPassword
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        });
    });

    test('Reporting a reply: PUT request to /api/replies/{board}', function(done) {
      // First create a new reply to report
      chai.request(baseUrl)
        .post(`/api/replies/${testBoard}`)
        .send({
          thread_id: testThreadId,
          text: 'Reply to report',
          delete_password: testPassword
        })
        .end(function(err, res) {
          const newReplyId = res.body.replies[res.body.replies.length - 1]._id;
          chai.request(baseUrl)
            .put(`/api/replies/${testBoard}`)
            .send({
              thread_id: testThreadId,
              reply_id: newReplyId
            })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.text, 'reported');
              done();
            });
        });
    });
  });
});
