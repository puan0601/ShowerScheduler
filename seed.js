var db = require("./models");

var timeSlotList = [
  {
    time: 1,
    user: "user-a"
  },
  {
    time: 2,
    user: "user-b"
  },
    {
    time: 3,
    user: "user-c"
  },
    {
    time: 4,
    user: "user-d"
  },
  {
    time: 5,
    user: "user-e"
  },
  {
    time: 6,
    user: "user-f"
  }
];


db.TimeSlot.remove({}, function(err, timeSlots){
  console.log("Db removed");

  db.TimeSlot.create(timeSlotList, function(err, timeSlots){
    if (err) { return console.log("Error: " + err ); }
    process.exit();
  });

});