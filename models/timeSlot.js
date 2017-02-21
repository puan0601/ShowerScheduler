var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  User = require("./user");

var TimeSlotSchema = new Schema({
  time: String,
  user: User.schema
});

var TimeSlot = mongoose.model("TimeSlot", TimeSlotSchema);

module.exports = TimeSlot;
