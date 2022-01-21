const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

const Spot = require("../models/Spot");
const User = require("../models/User");

const auth = require("../middleware/auth");

//const markers = require("../data/tempLocations");

router.get("/list", async (req, res) => {
  try {
    const markers = await Spot.find();
    // console.log("markers is", markers);
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


router.post("/update", auth, async (req, res) => {
  // let { id } = req.body.id;
  // console.log(id);
  try {
    await Spot.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        desc: req.body.desc,
      }
    );
    res.status(200).json({
      message: "Success: Entry Updated",
    });

    // const marker = markers.find((marker) => marker._id === id);
    // console.log(marker);
    // res.status(200).json({
    //   data: marker,
    // });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

router.post("/upload-pic", auth, upload.single("files"), (req, res) => {
  console.log(req.body);

  try {
    const data = {
      image: req.file,
    };

    // make uuid and pass to cloudinary
    cloudinary.uploader
      .upload(data.image.path)
      .then(async (result) => {
        console.log("result.url is: ", result.url);
        const newSpot = new Spot({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          lat: req.body.lat,
          lng: req.body.lng,
          url: result.url,
          desc: req.body.desc,
          owner: req.body.owner,
        });
        console.log("newSpot is: ", newSpot);
        await newSpot.save();

        await User.updateOne(
          { email: req.body.owner },
          { $push: { entries: newSpot._id } }
        );

        res.status(200).send({
          message: "upload successful",
          newSpot: newSpot,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "failure in uploader",
          error,
        });
      });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

module.exports = router;
