const Issue = require('../models/issue');

module.exports = function (app) {
  
  app.route('/api/issues/:project')
    
    .get(function (req, res) {
      const project = req.params.project;
      const filters = { ...req.query };
      
      // Remove project from filters if it exists
      delete filters.project;
      
      // Convert string values to appropriate types
      if (filters.open !== undefined) {
        filters.open = filters.open === 'true';
      }
      
      Issue.find({ project, ...filters })
        .then(issues => {
          res.json(issues);
        })
        .catch(err => {
          res.status(500).json({ error: 'Error retrieving issues' });
        });
    })
    
    .post(function (req, res) {
      const project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      
      // Check required fields
      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }
      
      const newIssue = new Issue({
        project,
        issue_title,
        issue_text,
        created_by,
        assigned_to: assigned_to || '',
        status_text: status_text || '',
        open: true,
        created_on: new Date(),
        updated_on: new Date()
      });
      
      newIssue.save()
        .then(issue => {
          res.json(issue);
        })
        .catch(err => {
          res.status(500).json({ error: 'Error creating issue' });
        });
    })
    
    .put(function (req, res) {
      const project = req.params.project;
      const { _id, ...updateFields } = req.body;
      
      // Check if _id is provided
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }
      
      // Check if there are fields to update
      if (Object.keys(updateFields).length === 0) {
        return res.json({ error: 'no update field(s) sent', '_id': _id });
      }
      
      // Add updated_on timestamp
      updateFields.updated_on = new Date();
      
      Issue.findOneAndUpdate(
        { _id, project },
        updateFields,
        { new: true }
      )
        .then(issue => {
          if (!issue) {
            return res.json({ error: 'could not update', '_id': _id });
          }
          res.json({ result: 'successfully updated', '_id': _id });
        })
        .catch(err => {
          res.json({ error: 'could not update', '_id': _id });
        });
    })
    
    .delete(function (req, res) {
      const project = req.params.project;
      const { _id } = req.body;
      
      // Check if _id is provided
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }
      
      Issue.findOneAndDelete({ _id, project })
        .then(issue => {
          if (!issue) {
            return res.json({ error: 'could not delete', '_id': _id });
          }
          res.json({ result: 'successfully deleted', '_id': _id });
        })
        .catch(err => {
          res.json({ error: 'could not delete', '_id': _id });
        });
    });
};
