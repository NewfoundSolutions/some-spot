const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var cloudinary = require("cloudinary").v2;

const Spot = require("../models/Spot");

//const markers = require("../data/tempLocations");

const markers = 

router.get("/list", async (req, res) => {
  try {
    const markers = await Spot.find()
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
    const marker = markers.find((marker) => marker._id === id);
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

router.post("/upload-pic", upload.single("files"), (req, res) => {
  console.log(req.body);

  try {
    const data = {
      image: req.file,
    };

    // make uuid and pass to cloudinary
    cloudinary.uploader
      .upload(data.image.path)
      .then(async (result) => {
        console.log("result.url is: ",result.url);
        const newSpot = new Spot ({
          name: req.body.name,
          lat: req.body.lat,
          lng: req.body.lng,
          url: result.url,
          desc: req.body.desc
        })
        newSpot.save();
      

        res.status(200).send({
          message: "upload successful",
          newSpot: newSpot
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
// router.post("/new", async (req, res) => {
//   try {
//     console.log(req.body);
//     // const newSpot = new Spot({
//     //   _id: uuid(),
//     //   name: req.body.name ? req.body.name : "nope",
//     //   coords: req.body.coords ? req.body.coords : "no coords",
//     //   content: req.body.content ? req.body.content : "no content"
//     // });
//     // newSpot.save().then((spot) => res.json(spot));
//   } catch (err) {
//     res.status(400).json({
//       message: "Some error occured",
//       err,
//     });
//   }
// });

// router.get("/test", async (req, res) => {
//   const newSpot = new Spot({
//     _id: 564567,
//     name: "TestSpot",
//     coords: { lat: 23.44, lng: 44.55 },
//     content: { imgURL: "idunno.com", desc: "hoping" },
//   });
//   newSpot.save().then((spot) => res.json(spot));
// });

module.exports = router;
