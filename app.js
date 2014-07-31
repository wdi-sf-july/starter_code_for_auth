// app.js

var express = require('express'),
  db = require('./models/index.js'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  app = express();

app.set('view engine', 'ejs');

app.use(methodOverride());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

// logging
app.use(function(req, res, next){
  console.log(req.method, req.url)
  next()
});

// LOGIN 
app.get("/login", function(req, res){
  res.render("sessions/login", {username: ""})
})
app.get("/", function(req, res){
  res.redirect("/login");
})


// SUBMIT LOGIN
app.post('/login', function(req, res){
  var userParams = req.body.user;
  var handleError = function(error){
    res.render("sessions/login", {
      username: userParams.username,
      message: error.message
    });
  }
  var handleSuccess = function(currentUser){
    currentUser.getPosts()
    .success(function(userPosts){
      console.log(userPosts)
      res.render("users/index", {
        posts: userPosts,
        message: "welcome backs"
      });
    })
  }
  db.user.authorize(userParams, handleError, handleSuccess)
})

app.get('/users', function (req,res) {

  res.send("WTF");

});


// SIGNUP FORM
app.get("/signup", function (req, res) {
  res.render("users/signup", {username: ""});
});

// CREATE USER
app.post('/users', function (req, res) {  
  var newUser = req.body.user;
  var handleError = function(error){
    res.render("users/signup", {
      username: newUser.username,
      message: error.message
    });
  }
  var handleSuccess = function(currentUser, success){
    currentUser.getPosts()
    .success(function(userPosts){
      res.render("users/index", {
        posts: userPosts,
        message: success.message
      });
    })
  }
  db.user.createNewUser(newUser, handleError, handleSuccess)
});



app.post('/posts', function (req, res) {
  db.post.create({
    title: req.body.post.title,
    body: req.body.post.body
  }).success(function(post){
    console.log(post)
  });
  res.redirect('/login')
});

app.get('/posts/new', function (req, res) {
  res.render('posts/new');
})


app.get('/posts/:id', function (req,res) {
  var id = req.params.id;
  //

});

app.get('/posts/:id/edit', function (req, res) {

});

app.put('/posts/:id', function (req, res) {
  
});


app.get("*", function (req, res) {
  res.status(404);
  res.render("errors/404");
});

app.listen(3000, function(){
  console.log("LISTENING ON PORT 3000")
})
