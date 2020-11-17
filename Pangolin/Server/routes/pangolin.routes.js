const router = require("express").Router();
const {
  getPangolin,
  editPangolin,
  addNewFriend,
  removeFriend,
} = require("../controllers/pangolin.controllers");

router.get("/profile", getPangolin);

router.post("/edit", editPangolin);

router.post("/add", addNewFriend);

router.post("/remove", removeFriend);

module.exports = router;
