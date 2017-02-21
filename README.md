# Showerly

This is a scheduling app that allows users to reserve a time slot from a list of pre-selected available times.  Once the user clicks the button that has their desired time slot, they can enter their name, which will be displayed below the time table confirming their selected time slot. When the user first comes onto the page, they can see the reservations that have already been made (i.e. the time slot and the name).  If the user decides that they no longer want that particular time, they can click the delete button next to their reservation and their time slot will be released.

* [Live on Heroku](https://showerly.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
node
```

### Installing

In your CLI, run:
```
npm install
```

and it will install all dependencies for you.

After the dependencies are installed, run:
```
mongod
```
```
nodemon server.js
```

## Built With

* Express
* MongoDB
* Javascript
* jQuery
* Bootstrap
* Mongoose

## Contributing

Please fork if you would like to contribute!

## Versioning

* [GitHub](https://github.com/puan0601/ShowerScheduler)

## Hosting

* [Heroku](https://showerly.herokuapp.com/)

## Authors

* **Anton Pugach**
* **Christen Williams**

## Acknowledgments

* "Prof" Shahrzad Aminshahidy
* Nathan Allen
* Michelle Ferreirae

### Code Snippet
```
var currentTimeSlotId = $(this).closest("form").data("time-id");
$("#entry-form-modal").data("time-id", currentTimeSlotId);
$(e.target).next().modal();

```

```
db.User.create(req.body, function(err, user) {
    db.TimeSlot.findOne({ 'time': user.time },function(err, foundTimeslot){
      foundTimeslot.user = user;}
```
