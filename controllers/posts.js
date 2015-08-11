var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.post.findAll({include: [db.author]}).then(function(posts) {
    res.render('posts/index', {posts: posts});
  });
});

router.post('/', function(req, res) {
  db.author.findOrCreate({where:
    {name: req.body.author}
  }).spread(function(author, created) {
    author.createPost({title: req.body.title, body: req.body.body}).then(function(post) {
      res.redirect('/posts/' + post.id);
    });
  });
});

router.get('/new', function(req, res) {
  res.render('posts/new');
});

router.get('/:id', function(req, res) {
  db.post.findById(parseInt(req.params.id)).then(function(post) {
    if (post) {
      res.render('posts/show', {post: post});
    } else {
      res.render('main/404');
    }
  }).catch(function(error) {
    res.render('main/404');
  });
});


router.get('/:id/edit', function(req, res) {
  db.post.findById(parseInt(req.params.id)).then(function(post) {
    if (post) {
    res.render('posts/edit', {post: post});
    } else {
      res.render('main/404');
    }
  }).catch(function(error) {
    res.render('main/404');
  });
})

module.exports = router;