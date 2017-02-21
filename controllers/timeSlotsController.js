var db = require("../models");

function index(req,res) {
  db.TimeSlot.find({}, function(err, timeSlots){
    res.json(timeSlots);
  });
}

function update(req, res) {
  db.TimeSlot.findById(req.params.id, function(err, foundTimeSlot){
    if (err) {res.send(err.message);}
    foundTimeSlot.user = req.body.user;
    foundTimeSlot.save(function(err, savedTimeSlot){
      if (err) { res.send(err.message); }
      res.json(savedTimeSlot);
    });
  });
}

function show(req, res) {
  db.TimeSlot.findById(req.params.id, function(err, foundTimeSlot) {
    if(err) { console.log('timeSlotsController.show error', err); }
    res.json(foundTimeSlot);
  });
}

module.exports = {
  index: index,
  update: update,
  show: show
}
