const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);

const projectName = 'apitest';

suite('Functional Tests', function () {
  
  let testIssueId;
  
  // Test 1: Create an issue with every field
  test('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
    const testIssue = {
      issue_title: 'Test Issue with All Fields',
      issue_text: 'This is a test issue with all fields filled',
      created_by: 'Test User',
      assigned_to: 'Developer',
      status_text: 'In Progress'
    };
    
    chai.request(server)
      .post(`/api/issues/${projectName}`)
      .send(testIssue)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, '_id');
        assert.property(res.body, 'issue_title');
        assert.property(res.body, 'issue_text');
        assert.property(res.body, 'created_by');
        assert.property(res.body, 'assigned_to');
        assert.property(res.body, 'status_text');
        assert.property(res.body, 'open');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        assert.property(res.body, 'project');
        
        testIssueId = res.body._id;
        done();
      });
  });
  
  // Test 2: Create an issue with only required fields
  test('Create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
    const testIssue = {
      issue_title: 'Test Issue Required Only',
      issue_text: 'This is a test issue with only required fields',
      created_by: 'Test User'
    };
    
    chai.request(server)
      .post(`/api/issues/${projectName}`)
      .send(testIssue)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, '_id');
        assert.property(res.body, 'issue_title');
        assert.property(res.body, 'issue_text');
        assert.property(res.body, 'created_by');
        assert.property(res.body, 'assigned_to');
        assert.property(res.body, 'status_text');
        assert.property(res.body, 'open');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        assert.property(res.body, 'project');
        
        // Check that optional fields are empty strings
        assert.equal(res.body.assigned_to, '');
        assert.equal(res.body.status_text, '');
        done();
      });
  });
  
  // Test 3: Create an issue with missing required fields
  test('Create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
    const testIssue = {
      issue_title: 'Test Issue Missing Fields',
      // Missing issue_text and created_by
    };
    
    chai.request(server)
      .post(`/api/issues/${projectName}`)
      .send(testIssue)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'required field(s) missing');
        done();
      });
  });
  
  // Test 4: View issues for a project
  test('View issues for a project: GET request to /api/issues/{project}', function (done) {
    chai.request(server)
      .get(`/api/issues/${projectName}`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.isAtLeast(res.body.length, 1);
        
        // Check that each issue has the required fields
        res.body.forEach(issue => {
          assert.property(issue, '_id');
          assert.property(issue, 'issue_title');
          assert.property(issue, 'issue_text');
          assert.property(issue, 'created_by');
          assert.property(issue, 'open');
          assert.property(issue, 'created_on');
          assert.property(issue, 'updated_on');
          assert.property(issue, 'project');
          assert.equal(issue.project, projectName);
        });
        done();
      });
  });
  
  // Test 5: Filter issues with one filter
  test('Filter issues with one filter: GET request to /api/issues/{project}', function (done) {
    chai.request(server)
      .get(`/api/issues/${projectName}?open=true`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        
        // Check that all returned issues have open=true
        res.body.forEach(issue => {
          assert.equal(issue.open, true);
        });
        done();
      });
  });
  
  // Test 6: Filter issues with multiple filters
  test('Filter issues with multiple filters: GET request to /api/issues/{project}', function (done) {
    chai.request(server)
      .get(`/api/issues/${projectName}?open=true&created_by=Test User`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        
        // Check that all returned issues match both filters
        res.body.forEach(issue => {
          assert.equal(issue.open, true);
          assert.equal(issue.created_by, 'Test User');
        });
        done();
      });
  });
  
  // Test 7: Update one field in an issue
  test('Update one field in an issue: PUT request to /api/issues/{project}', function (done) {
    const updateData = {
      _id: testIssueId,
      status_text: 'Completed'
    };
    
    chai.request(server)
      .put(`/api/issues/${projectName}`)
      .send(updateData)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'result');
        assert.property(res.body, '_id');
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, testIssueId);
        done();
      });
  });
  
  // Test 8: Update multiple fields in an issue
  test('Update multiple fields in an issue: PUT request to /api/issues/{project}', function (done) {
    const updateData = {
      _id: testIssueId,
      status_text: 'In Review',
      assigned_to: 'QA Team'
    };
    
    chai.request(server)
      .put(`/api/issues/${projectName}`)
      .send(updateData)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'result');
        assert.property(res.body, '_id');
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, testIssueId);
        done();
      });
  });
  
  // Test 9: Update an issue without _id field
  test('Update an issue without _id field: PUT request to /api/issues/{project}', function (done) {
    const updateData = {
      status_text: 'Updated Status'
      // Missing _id
    };
    
    chai.request(server)
      .put(`/api/issues/${projectName}`)
      .send(updateData)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'missing _id');
        done();
      });
  });
  
  // Test 10: Update an issue without update fields
  test('Update an issue without update fields: PUT request to /api/issues/{project}', function (done) {
    const updateData = {
      _id: testIssueId
      // No update fields
    };
    
    chai.request(server)
      .put(`/api/issues/${projectName}`)
      .send(updateData)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.property(res.body, '_id');
        assert.equal(res.body.error, 'no update field(s) sent');
        assert.equal(res.body._id, testIssueId);
        done();
      });
  });
  
  // Test 11: Update an issue with invalid _id
  test('Update an issue with invalid _id: PUT request to /api/issues/{project}', function (done) {
    const updateData = {
      _id: 'invalid_id_12345',
      status_text: 'Updated Status'
    };
    
    chai.request(server)
      .put(`/api/issues/${projectName}`)
      .send(updateData)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.property(res.body, '_id');
        assert.equal(res.body.error, 'could not update');
        assert.equal(res.body._id, 'invalid_id_12345');
        done();
      });
  });
  
  // Test 12: Delete an issue
  test('Delete an issue: DELETE request to /api/issues/{project}', function (done) {
    const deleteData = {
      _id: testIssueId
    };
    
    chai.request(server)
      .delete(`/api/issues/${projectName}`)
      .send(deleteData)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'result');
        assert.property(res.body, '_id');
        assert.equal(res.body.result, 'successfully deleted');
        assert.equal(res.body._id, testIssueId);
        done();
      });
  });
  
  // Test 13: Delete an issue with invalid _id
  test('Delete an issue with invalid _id: DELETE request to /api/issues/{project}', function (done) {
    const deleteData = {
      _id: 'invalid_id_12345'
    };
    
    chai.request(server)
      .delete(`/api/issues/${projectName}`)
      .send(deleteData)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.property(res.body, '_id');
        assert.equal(res.body.error, 'could not delete');
        assert.equal(res.body._id, 'invalid_id_12345');
        done();
      });
  });
  
  // Test 14: Delete an issue without _id field
  test('Delete an issue without _id field: DELETE request to /api/issues/{project}', function (done) {
    const deleteData = {
      // Missing _id
    };
    
    chai.request(server)
      .delete(`/api/issues/${projectName}`)
      .send(deleteData)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'missing _id');
        done();
      });
  });
});
