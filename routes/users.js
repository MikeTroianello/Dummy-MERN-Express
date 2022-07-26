var express = require("express");
var router = express.Router();
const User = require("../models/User");

const { isAuthenticated } = require("../middleware/auth");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res, next) => {
  try {
    let createdUser = await User.create({
      ...req.body,
    });
    res.json(createdUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let foundUser = await User.findOne({
      username: req.body.username,
    });

    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(400).json({ message: "No user found" });
    }
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/login-test", isAuthenticated, (req, res) => {
  res.json({ message: "You are logged in" });
});

module.exports = router;
