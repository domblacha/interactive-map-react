const mongoose = require("mongoose");
const users = mongoose.model("Users");

exports.registerUser = (req, res) => {
  try {
    const { name, surname, login, password } = req.body;

    users.findOne({ login }, (err, user) => {
      if (!user) {
        const newUser = new users({
          name,
          surname,
          login,
          password,
        });
        newUser.save((err) => {
          if (err) return res.send(err);
          res.send();
        });
      } else {
        res.status(409).send();
      }
    });
  } catch (err) {
    res.status(500);
  }
};
exports.loginUser = (req, res) => {
  try {
    const { login, password } = req.body;
    users.findOne({ login, password }, (err, user) => {
      if (user) {
        const userInfo = {
          id: user._id,
          name: user.name,
          surname: user.surname,
        };
        res.send(userInfo);
      } else {
        res.status(404).send();
      }
    });
  } catch (err) {
    res.status(500);
  }
};
