const express = require("express");
const router = express.Router();
let markers = require("../data/tempLocations");

router.get("/list", async (req, res) => {
  try {
    res.status(200).json({
      data: markers
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    let marker = markers.find(marker => marker.id === id);
    res.status(200).json({
      data: marker
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

module.exports = router;