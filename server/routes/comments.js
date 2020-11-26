const express = require("express");
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controlers/commentsControler");
const router = express.Router();

router.get("/", getComments);
router.post("/add", addComment);
router.post("/deletecomm", deleteComment);

module.exports = router;
