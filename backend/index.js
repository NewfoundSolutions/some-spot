const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary")
const config = require("config");
var cookieParser = require('cookie-parser');
const cors = require("cors");
const logger = require("morgan");


const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
//config 
const db = config.get('mongoURI');
cloudinary.config({ 
  cloud_name: config.get('cloudName'), 
  api_key: config.get('cloudKey'), 
  api_secret: config.get('cloudSecret') 
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
app.use("/users", usersRouter)


app.listen(port, function() {
  console.log("Runnning on " + port);
});


module.exports = app;