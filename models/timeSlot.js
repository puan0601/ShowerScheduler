var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var TimeSlotSchema = new Schema({
  time: Number,
  user: String
});

var TimeSlot = mongoose.model("TimeSlot", TimeSlotSchema);

module.exports = TimeSlot;