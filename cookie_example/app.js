
var express = require('express'),
  //cookieParser = require('cookie-parser'),
  app = express();


app.get("*", function(req, res){
  var cookie =  req.headers.cookie || '0';
  var count = Number(cookie);
  count++;

  console.log("REQUEST COOKIE:", cookie)
  res.status(200);
  
  res.set({
    "Content-Type": "text/html",
    "Set-Cookie":  count
  });
  res.write(cookie)
  res.end()
});

app.listen(3000)