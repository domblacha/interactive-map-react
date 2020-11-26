const express = require("express");
const {
  getMarkers,
  addMarker,
  deleteMarker,
  editMarker,
} = require("../controlers/markersControler");
const router = express.Router();

router.get("/", getMarkers);
router.post("/addmarker", addMarker);
router.post("/deletemarker", deleteMarker);
router.post("/editmarker", editMarker);

module.exports = router;
