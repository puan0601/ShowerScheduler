var db = require("./models");

var timeSlotList = [
  {
    time: 1,
    user: ""
  },
  {
    time: 2,
    user: ""
  },
    {
    time: 3,
    user: ""
  },
    {
    time: 4,
    user: ""
  },
  {
    time: 5,
    user: ""
  },
  {
    time: 6,
    user: ""
  }
];


db.TimeSlot.remove({}, function(err, timeSlots){

  db.TimeSlot.create(timeSlotList, function(err, timeSlots){
    if (err) { return console.log("Error: " + err ); }
    process.exit();
  });

});