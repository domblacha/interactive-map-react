const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsShema = new Schema({
  markerId: { type: String, require: true },
  userId: { type: String, require: true },
  authorName: { type: String, require: true },
  authorSurname: { type: String, require: true },
  comment: { type: String, require: true },
  commRate: { type: Number, required: true },
});

module.exports = mongoose.model("Comments", commentsShema);
