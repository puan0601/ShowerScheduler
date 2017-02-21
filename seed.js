var db = require("./models");

var userList = [
  {
    name: 'Anton',
    email: 'anton@anton.com'
  },
  {
    name: 'Christen',
    email: 'christen@anton.com'
  },
  {
    name: 'Shiv',
    email: 'shiv@anton.com'
  },
  {
    name: 'Test',
    email: 'atest@anton.com'
  },
  {
    name: 'Tester',
    email: 'atester@anton.com'
  }
];

var timeSlotList = [
  {
    time: '6:00am - 7:00am',
    user: ""
  },
  {
    time: '7:00am - 8:00am',
    user: ""
  },
    {
    time: '8:00am - 9:00am',
    user: ""
  },
    {
    time: '6:00pm - 7:00pm',
    user: ""
  },
  {
    time: '7:00pm - 8:00pm',
    user: ""
  },
  {
    time: '8:00pm - 9:00pm',
    user: ""
  }
];


db.TimeSlot.remove({}, function(err, timeSlots){

  db.TimeSlot.create(timeSlotList, function(err, timeSlots){
    if (err) { return console.log("Error: " + err ); }
  });
});

db.User.remove({}, function(err, users) {

  db.User.create(userList, function(err, users){
    if (err) { return console.log("Error: " + err ); }
    process.exit();
  });
});
