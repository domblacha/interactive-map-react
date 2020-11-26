const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersShema = new Schema({
  name: { type: String, require: true },
  surname: { type: String, require: true },
  login: { type: String, require: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model("Users", usersShema);
