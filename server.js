var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  db = require("./models"),
  controllers = require("./controllers");

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static("public"));



  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });








app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on http://localhost:3000');
});