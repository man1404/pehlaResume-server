const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtkey } = require("./keys");
const userModel = require("./userModel");
const router = express.Router();
router.post("/Signup", async (req, res) => {
  const { name,email, Password } = req.body;
  try {
    const userdata = await userModel.findOne({ email: email });
    if (!userdata) {
      const userData = {
        name:name,
        email: email,
        Password: Password,
      };
      const user = new userModel(userData);
      await user.save();
      const token = jwt.sign({ userId: user._id, email: email }, jwtkey);
      res.send({ token });
    } else {
      res.status(400).send({ msg: "must provide email or password" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.post("/Login", async (req, res) => {
  const { email, Password } = req.body;
  if (!email || !Password) {
    return res.status(400).send({ error: "must provide email or password" });
  }
  const user = await userModel.findOne({ email,Password});
  if (!user) {
    return res.status(400).send({ error: "must provide email or password" });
  }
  try {
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    return res.status(500).send({ error: "internal server error" });
  }
});
module.exports = router;

 /*
  */