const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const users = require("./models/users");
const markers = require("./models/markers");
const comments = require("./models/comments");

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const usersRoutes = require("./routes/users");
const markersRoutes = require("./routes/markers");
const commentsRoutes = require("./routes/comments");

const port = process.env.PORT || 3001;
const server = express();
server.use(bodyParser.json());
server.use(cors());

server.use("/users", usersRoutes);
server.use("/markers", markersRoutes);
server.use("/comments", commentsRoutes);

server.listen(port, () =>
  console.log(`Server is listening... http://localhost:${port}`)
);
