var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/api" );

module.exports.TimeSlot = require("./timeSlot.js");
module.exports.User = require("./user.js");