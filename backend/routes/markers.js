const express = require("express");
const router = express.Router();
const markers = require("../data/tempLocations");
const Spot = require("../models/Spot");

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
router.get("/test", async (req,res) => {
    const newSpot = new Spot({
      _id: 564567,
      name: "TestSpot",
      coords: {lat:23.44,lng:44.55},
      content: {imgURL:"idunno.com", description:"hoping"}
    });
    newSpot.save().then((spot) => res.json(spot));
});

router.post("/list", async (req, res) => {
  try {
    const newSpot = new Spot({
      _id: req.body._id,
      name: req.body.name,
      coords: req.body.coords,
      content: req.body.content
    });
    newSpot.save().then((spot) => res.json(spot));
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

module.exports = router;
