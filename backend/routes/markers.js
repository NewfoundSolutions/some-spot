const express = require("express");
const router = express.Router();
const markers = require("../data/tempLocations");
const Spot = require("../models/Spot");
const { v4: uuid } = require("uuid");

var cloudinary = require("cloudinary").v2;

router.get("/list", async (req, res) => {
  try {
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

router.get("/list/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let marker = markers.find((marker) => marker._id === id);
    console.log(marker);
    res.status(200).json({
      data: marker,
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

router.post("/upload-pic", async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const data = {
      image: req.body.image,
    };

    // make uuid and pass to cloudinary
    const newID = `/spots/user/${uuid()}`;
    cloudinary.uploader
      .upload(data.image, {resource_type: "image", public_id: newID})
      .then((result) => {
        res.status(200).send({
          message: "success",
          result,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "failure",
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
router.post("/new", async (req, res) => {
  try {
    console.log(req.body);
    // const newSpot = new Spot({
    //   _id: uuid(),
    //   name: req.body.name ? req.body.name : "nope",
    //   coords: req.body.coords ? req.body.coords : "no coords",
    //   content: req.body.content ? req.body.content : "no content"
    // });
    // newSpot.save().then((spot) => res.json(spot));
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

router.get("/test", async (req, res) => {
  const newSpot = new Spot({
    _id: 564567,
    name: "TestSpot",
    coords: { lat: 23.44, lng: 44.55 },
    content: { imgURL: "idunno.com", description: "hoping" },
  });
  newSpot.save().then((spot) => res.json(spot));
});

module.exports = router;
