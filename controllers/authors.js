var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.author.findAll().then(function(authors) {
    res.render('authors/index', {authors: authors});
  });
});

router.get('/:id', function(req, res) {
  db.author.find({
    where: {id: req.params.id},
    include: [db.post]
  }).then(function(author) {
    res.render('authors/show', {author: author});
  });
});

module.exports = router;