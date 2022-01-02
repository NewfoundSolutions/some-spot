const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const markers = await User.find();
    res.status(200).json({
      data: markers,
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
});

router.post("/new", async (req, res) => {
  console.log("request.body is: ", req.body);

  try {
    const { name, email, password, register_date } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      entries: [],
      register_date: register_date,
    });
    console.log("newUser is: ", newUser);
    newUser.save();
    res.status(200).send({
      message: "Registration successful",
      newSpot: newUser,
    });
    // return res.redirect('/');
  } catch (error) {
    if (error.code === 11000) {
      return res.send({ status: "error", error: "email already exists" });
    }
    console.log(JSON.stringify(error));
    throw error;
  }
});

module.exports = router;
