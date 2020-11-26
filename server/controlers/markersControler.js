const mongoose = require("mongoose");
const markers = mongoose.model("Markers");

exports.getMarkers = (req, res) => {
  markers.find({}, (err, markers) => {
    if (err) return res.send(err);
    res.send(markers);
  });
};
exports.deleteMarker = (req, res) => {
  const { id } = req.body;
  markers.deleteOne({ _id: id }, (err) => {
    if (err) return res.send(err);
    res.send();
  });
};
exports.editMarker = (req, res) => {
  const { id, pointName, description, authorRate } = req.body;
  const editObj = {
    pointName,
    description,
    authorRate,
  };
  markers.findByIdAndUpdate(id, editObj, (err, editData) => {
    if (err) return res.send(err);
    res.send();
  });
};
exports.addMarker = (req, res) => {
  try {
    const {
      userId,
      latitude,
      longitude,
      name,
      surname,
      pointName,
      description,
      rate,
    } = req.body;
    const newMarker = new markers({
      userId,
      latitude,
      longitude,
      authorName: name,
      authorSurname: surname,
      pointName,
      description,
      authorRate: Number(rate),
    });
    newMarker.save((err) => {
      if (err) return res.send(err);
      res.send();
    });
  } catch (err) {
    res.status(500);
  }
};
