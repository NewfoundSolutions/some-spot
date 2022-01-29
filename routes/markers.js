const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const { readdirSync, rmSync } = require("fs");
const dir = "./uploads";

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

router.get(`/list/:id`, async (req, res) => {
  try {
    // console.log("req.params.id is:", req.params.id)
    await Spot.findOne({ _id: req.params.id }).then((spot) => {
      res.status(200).json({
        message: "Success",
        updatedSpot: spot ? spot : 'deleted'
      });
    });

    // res.status(200).json({
    //   message: "Success",
    //   updatedEntry: toUpdate
    // })
  } catch (err) {
    res.status(400).json({
      message: "An error occured",
      err,
    });
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    await Spot.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        desc: req.body.desc,
      }
    ).then(
      res.status(200).json({
        message: "Success: Entry Updated",
        id: req.body.id,
      })
    );
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

router.post("/upload-pic", auth, upload.single("files"), async (req, res) => {
  console.log(req.body);

  try {
    const data = {
      image: req.file,
    };

    // make uuid and pass to cloudinary
    cloudinary.uploader
      .upload(data.image.path)
      .then(async (result) => {
        // console.log("result.url is: ", result.url);
        const newSpot = new Spot({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          lat: req.body.lat,
          lng: req.body.lng,
          url: result.url,
          desc: req.body.desc,
          owner: req.body.owner,
        });
        res.status(200).send({
          message: "upload successful",
          id: newSpot._id,
        });
        // readdirSync deletes images uploaded with multer.
        // required due to issues implementing multer memory storage.
        // console.log("newSpot is: ", newSpot);
        readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
        await newSpot.save();

        await User.updateOne(
          { email: req.body.owner },
          { $push: { entries: newSpot._id } }
        );

        
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
router.delete("/delete", auth, async (req, res) => {
  // console.log("req.body is",req.body)
  const deleted = req.body.id;
  await Spot.deleteOne({ _id: req.body.id })
    .then(
      res.status(200).json({
        message: "Deletion successful",
        id: 'deleted',
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(400).send({
        message: "Delete failed, error message: ",
        error,
      });
    });
});
module.exports = router;
