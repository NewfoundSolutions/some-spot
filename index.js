const express = require("express");
const path = require("path")
const mongoose = require("mongoose");
const cloudinary = require("cloudinary")
var cookieParser = require('cookie-parser');
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv").config()


const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));


app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//config 
const db = process.env.NODE_APP_MONGO_URI;
cloudinary.config({ 
  cloud_name: process.env.NODE_APP_CLOUD_NAME, 
  api_key: process.env.NODE_APP_CLOUD_KEY, 
  api_secret: process.env.NODE_APP_CLOUD_SECRET 
});


mongoose
.connect(db)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log(err));

//import routes
const markersRouter = require("./routes/markers");
const usersRouter = require("./routes/users");

const port = process.env.PORT || 3001;

//routes
app.use("/markers", markersRouter);
app.use("/users", usersRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(port, function() {
  console.log("Runnning on " + port);
});


module.exports = app;