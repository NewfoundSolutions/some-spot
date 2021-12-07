const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(cors());
//app.use(express.urlencoded({ extended: true }))
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//dbconfig 
const db = config.get('mongoURI');


mongoose
.connect(db)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log(err));

//import routes
const markersRouter = require("./routes/markers");

const port = process.env.PORT || 3001;

//routes
app.use("/markers", markersRouter);


app.listen(port, function() {
  console.log("Runnning on " + port);
});


module.exports = app;