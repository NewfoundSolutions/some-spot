const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary")
const config = require("config");
var cookieParser = require('cookie-parser');
const cors = require("cors");
const logger = require("morgan");

//const bodyParser = require("body-parser");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

//config 
const db = config.get('mongoURI');
cloudinary.config({ 
  cloud_name: config.get('cloudName'), 
  api_key: config.get('cloudKey'), 
  api_secret: config.get('cloudSecret') 
});
const jwtSecret = config.get('JWT_SECRET')

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