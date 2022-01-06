const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config")
const auth = require("../middleware/auth")
const jwtSecret = config.get('JWT_SECRET')


router.post('/login', async (req, res) => {
  console.log("req.body is: ", req.body);

  const dbUser = await User.findOne({ email: req.body.email });
   console.log("dbUser is: ",dbUser);
  try{
    const payload = { email: dbUser.email}
    console.log("email is: ", dbUser.email)
      const success = await bcrypt.compare(req.body.password, dbUser.password);
      const accessToken = jwt.sign(payload, jwtSecret, {expiresIn: '1h'});
      if(success){
        console.log("token is: ",accessToken)
        // console.log("res is: ", res)
        res.cookie('token', accessToken, { httpOnly: true })
        .json({ message: "Successful login!" });
      } else {
          res.json({ message: "Failed login attempt" });
      }
  } catch(e) {
      console.log(e)
  }
});

router.get('/checkToken', auth, function(req, res) {
  res.sendStatus(200);
  console.log("checkToken passed")
});

// router.get("/:id", async (req, res) => {
//   let { id } = req.params;
//   console.log(id);
// });

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
      message: "Registration successful"
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.send({ status: "error", error: "email already exists" });
    }
    console.log(JSON.stringify(error));
    throw error;
  }
});

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


module.exports = router;
