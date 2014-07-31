var repl = require('repl');
var db = require('./models/index.js');
var pkge = require("./package")
var newREPL = repl.start(pkge.name + " > ");

// db.user.create
// db.user.findAll().success(function(user){
//   console.log(user);
// });

 db.post.create({title: "blah", body: "stuff", toot: "shhhh"});
// db.user.find({id:1}).success(function(user) {
//   console.log(user);
// });

// .find({id: 4})
// .findAll
// .create //save right after
// .build && .save
// .findOrCreate

// .addNAMEOFYOURMODEL
// .addPost


// newREPL.context.db = db;