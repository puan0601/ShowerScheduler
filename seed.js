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
  });
});

db.User.remove({}, function(err, users) {
  
  db.User.create(userList, function(err, users){
    if (err) { return console.log("Error: " + err ); }
    process.exit();
  });
});
