// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const comments = require('./comments');

const app = express();
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
  }
  res.json(comment);
});

// Add a new comment
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    body: req.body.body
  };
  comments.push(comment);
  res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
  }
  comment.body = req.body.body;
  res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
  }
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});