// Create web server

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/comments', function(req, res) {
  var comment = req.body.comment;
  var comments = fs.readFileSync('comments.json', {encoding: 'utf-8'});
  comments = JSON.parse(comments);
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send('Comment added');
});

app.get('/comments', function(req, res) {
  var comments = fs.readFileSync('comments.json', {encoding: 'utf-8'});
  comments = JSON.parse(comments);
  res.send(comments);
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});