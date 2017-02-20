var db = require("../models");

function index(req,res) {
  db.User.find({}, function(err, users){
    res.json(users);
  });
}

function update(req, res) {
  db.User.findById(req.params.id, function(err, foundUser){
    console.log(foundUser);
    if (err) {res.send(err.message);}
    foundUser.name = req.body.name;
    foundUser.email = req.body.email;
    foundUser.save(function(err, savedUser){
      if (err) { res.send(err.message); }
      res.json(savedUser);
    });
  });
}

module.exports = {
  index: index,
  update: update
}
