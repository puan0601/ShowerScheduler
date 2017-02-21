var db = require("../models");

function index(req, res) {
  db.User.find({}, function(err, users){
    res.json(users);
  });
}

function update(req, res) {
  db.User.findById(req.params.id, function(err, foundUser){
    if (err) {res.send(err.message);}
    foundUser.name = req.body.name;
    foundUser.email = req.body.email;
    foundUser.time = req.body.time;
    foundUser.save(function(err, savedUser){
      if (err) { res.send(err.message); }
      res.json(savedUser);
    });
  });
}

// GET /api/users/:user
function show(req, res) {
  // find one album by id and send it back as JSON
  db.User.findById(req.params.id, function(err, foundUser) {
    if(err) { console.log('usersController.show error', err); }
    res.json(foundUser);
  });
}

// POST /api/users
function create(req, res) {
  db.User.create(req.body, function(err, user) {
    if (err) { console.log('error', err); }
    db.TimeSlot.findOne({ 'time': user.time },function(err, foundTimeslot){
      foundTimeslot.user = user;
      console.log("time slot:", foundTimeslot);
      res.json(foundTimeslot);
    });
  });
}

// DELETE /api/users/:userId
function destroy(req, res) {
  // find one user by id, delete it, and send it back as JSON
  db.User.findOneAndRemove({ _id: req.params.id }, function(err, foundUser){
    res.json(foundUser);
  });
}


module.exports = {
  index: index,
  update: update,
  show: show,
  create: create,
  destroy: destroy
}
