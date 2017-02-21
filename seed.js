var db = require("./models");

var userList = [
  {
    name: 'Anton',
    email: 'anton@anton.com',
    time: '6:00am - 7:00am'
  },
  {
    name: 'Christen',
    email: 'christen@anton.com',
    time: '7:00am - 8:00am'
  },
  {
    name: 'Christen',
    email: 'christen@anton.com',
    time: '8:00am - 9:00am'
  },
  {
    name: 'Christen',
    email: 'christen@anton.com',
    time: '6:00pm - 7:00pm'
  },
  {
    name: 'Christen',
    email: 'christen@anton.com',
    time: '7:00pm - 8:00pm'
  },
  {
    name: 'Christen',
    email: 'christen@anton.com',
    time: '8:00pm - 9:00pm'
  },
];

var timeSlotList = [
  {
    time: '6:00am - 7:00am',
    user: "58abf495bce6756f6755f9ca"
  },
  {
    time: '7:00am - 8:00am',
    user: "58abf495bce6756f6755f9ca"
  },
    {
    time: '8:00am - 9:00am',
    user: "58abf495bce6756f6755f9ca"
  },
    {
    time: '6:00pm - 7:00pm',
    user: "58abf495bce6756f6755f9ca"
  },
  {
    time: '7:00pm - 8:00pm',
    user: "58abf495bce6756f6755f9ca"
  },
  {
    time: '8:00pm - 9:00pm',
    user: "58abf495bce6756f6755f9ca"
  }
];


db.TimeSlot.remove({}, function(err, timeSlots){

  db.TimeSlot.create(timeSlotList, function(err, timeSlots){
    if (err) { return console.log("Error: " + err ); }
  });
  console.log(timeSlots);
});

db.User.remove({}, function(err, users) {

  db.User.create(userList, function(err, users){
    if (err) { return console.log("Error: " + err ); }
    process.exit();
  });
});
