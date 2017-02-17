var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "Server running on http://localhost:3000" );

module.exports.TimeSlot = require("./timeSlot.js");
module.exports.User = require("./user.js");