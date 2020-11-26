const mongoose = require("mongoose");
const comments = mongoose.model("Comments");

exports.getComments = (req, res) => {
  comments.find({}, (err, comments) => {
    if (err) return res.send(err);
    res.send(comments);
  });
};
exports.deleteComment = (req, res) => {
  const { id } = req.body;
  comments.deleteOne({ _id: id }, (err) => {
    if (err) return res.send(err);
    res.send();
  });
};
exports.addComment = (req, res) => {
  try {
    const { activeMarkerId, id, name, surname, comm, rate } = req.body;
    const newComment = new comments({
      markerId: activeMarkerId,
      userId: id,
      authorName: name,
      authorSurname: surname,
      comment: comm,
      commRate: rate,
    });
    newComment.save((err) => {
      if (err) return res.send(err);
      res.send();
    });
  } catch (err) {
    res.status(500);
  }
};
