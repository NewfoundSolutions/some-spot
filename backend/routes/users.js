const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const jwtSecret = config.get("JWT_SECRET");

router.post("/login", async (req, res) => {
  const dbUser = await User.findOne({ email: req.body.email });
  try {
    const payload = { email: dbUser.email };
    const success = await bcrypt.compare(req.body.password, dbUser.password);
    const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    if (success) {
      res
        .cookie("token", accessToken, { httpOnly: true })
        .status(200)
        .json({ message: "Logged in successfully", token: accessToken })
        // .json({  });
    } else {
      res.json({ message: "Failed login attempt" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.get("/checkToken", auth, function (req, res) {
  console.log("req.email is: ", req.email)
  res.status(200).json({email: req.email}) 
  console.log("checkToken passed");
});

router.post("/new", async (req, res) => {

  try {
    const { name, email, password, register_date } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const dbUser = await User.findOne({ email: req.body.email });
    if (dbUser == null) {
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        entries: [],
        register_date: register_date,
      });
      // console.log("newUser is: ", newUser);
      await newUser.save();
      const accessToken = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });
      if (accessToken) {
        res.cookie("token", accessToken, { httpOnly: true });
        res.status(200).send({
          message: "Registration successful",
        });
      }
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.send({ status: "error", error: "email already exists" });
    }
    console.log(JSON.stringify(error));
    throw error;
  }
});

module.exports = router;
