var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var postsController = require('./controllers/posts');
var authorsController = require('./controllers/authors');

var app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/posts', postsController);
app.use('/authors', authorsController);

app.get('/', function(req, res) {
  res.render('main/index');
});

app.listen(3000, function() {
  console.log('Server has started');
});
