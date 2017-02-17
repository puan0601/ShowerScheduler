var db = require("../models");

function index(req,res) {
  db.TimeSlot.find({}, function(err, timeSlots){
    res.json(timeSlots);
  });
}

module.exports = {
  index: index
}