var db = require("../models");

function index(req,res) {
  db.TimeSlot.find({}, function(err, timeSlots){
    res.json(timeSlots);
  });
}

function update(req, res) {
  db.TimeSlot.findById(req.params.id, function(err, foundTimeSlot){
    console.log(foundTimeSlot)
    if (err) {res.send(err.message);}
    foundTimeSlot.user = req.body.user;
    foundTimeSlot.save(function(err, savedTimeSlot){
      if (err) { res.send(err.message); }
      res.json(savedTimeSlot);
    });
  });
}

module.exports = {
  index: index,
  update: update
}