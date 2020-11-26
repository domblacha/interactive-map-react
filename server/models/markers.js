const mongoose = require("mongoose");
const { Schema } = mongoose;

const markersShema = new Schema({
  userId: { type: String, require: true },
  latitude: { type: Number, require: true },
  longitude: { type: Number, require: true },
  authorName: { type: String, require: true },
  authorSurname: { type: String, require: true },
  pointName: { type: String, require: true },
  description: { type: String },
  authorRate: { type: Number },
});

module.exports = mongoose.model("Markers", markersShema);
