const express = require('express');
const router = express.Router();
const Thread = require('../models/thread');

// 创建新主题
router.post('/threads/:board', async (req, res) => {
  try {
    const { board } = req.params;
    const { text, delete_password } = req.body;
    
    if (!text || !delete_password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const thread = new Thread({
      board,
      text,
      delete_password
    });
    
    await thread.save();
    res.json(thread);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取最近的10个主题，每个主题有3个回复
router.get('/threads/:board', async (req, res) => {
  try {
    const { board } = req.params;
    
    const threads = await Thread.find({ board })
      .sort({ bumped_on: -1 })
      .limit(10)
      .select('-reported -delete_password')
      .lean();
    
    // 只返回每个主题的最近3个回复
    const threadsWithLimitedReplies = threads.map(thread => ({
      ...thread,
      replies: thread.replies
        .sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
        .slice(0, 3)
        .map(reply => ({
          _id: reply._id,
          text: reply.text,
          created_on: reply.created_on
        }))
    }));
    
    res.json(threadsWithLimitedReplies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除主题
router.delete('/threads/:board', async (req, res) => {
  try {
    const { board } = req.params;
    const { thread_id, delete_password } = req.body;
    
    if (!thread_id || !delete_password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const thread = await Thread.findById(thread_id);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    if (thread.delete_password !== delete_password) {
      return res.json('incorrect password');
    }
    
    await Thread.findByIdAndDelete(thread_id);
    res.json('success');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 报告主题
router.put('/threads/:board', async (req, res) => {
  try {
    const { board } = req.params;
    const { thread_id } = req.body;
    
    if (!thread_id) {
      return res.status(400).json({ error: 'Missing thread_id' });
    }
    
    const thread = await Thread.findById(thread_id);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    thread.reported = true;
    await thread.save();
    
    res.json('reported');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建新回复
router.post('/replies/:board', async (req, res) => {
  try {
    const { board } = req.params;
    const { thread_id, text, delete_password } = req.body;
    
    if (!thread_id || !text || !delete_password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const thread = await Thread.findById(thread_id);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    const reply = {
      text,
      delete_password,
      created_on: new Date()
    };
    
    thread.replies.push(reply);
    thread.bumped_on = new Date();
    
    await thread.save();
    
    res.json(thread);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取主题及其所有回复
router.get('/replies/:board', async (req, res) => {
  try {
    const { board } = req.params;
    const { thread_id } = req.query;
    
    if (!thread_id) {
      return res.status(400).json({ error: 'Missing thread_id' });
    }
    
    const thread = await Thread.findById(thread_id)
      .select('-reported -delete_password')
      .lean();
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    // 移除回复中的敏感字段
    const replies = thread.replies.map(reply => ({
      _id: reply._id,
      text: reply.text,
      created_on: reply.created_on
    }));
    
    const result = {
      ...thread,
      replies
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除回复
router.delete('/replies/:board', async (req, res) => {
  try {
    const { board } = req.params;
    const { thread_id, reply_id, delete_password } = req.body;
    
    if (!thread_id || !reply_id || !delete_password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const thread = await Thread.findById(thread_id);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    const reply = thread.replies.id(reply_id);
    
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    
    if (reply.delete_password !== delete_password) {
      return res.json('incorrect password');
    }
    
    reply.text = '[deleted]';
    await thread.save();
    
    res.json('success');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 报告回复
router.put('/replies/:board', async (req, res) => {
  try {
    const { board } = req.params;
    const { thread_id, reply_id } = req.body;
    
    if (!thread_id || !reply_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const thread = await Thread.findById(thread_id);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    const reply = thread.replies.id(reply_id);
    
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    
    reply.reported = true;
    await thread.save();
    
    res.json('reported');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
