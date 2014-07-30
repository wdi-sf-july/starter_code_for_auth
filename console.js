var repl = require('repl');
var db = require('./models/index.js');
var pkge = require("./package")
var newREPL = repl.start(pkge.name + " > ");

newREPL.context.db = db;