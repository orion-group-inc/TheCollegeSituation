//Require all that's needed to power this App
let express = require("express");
let bodyParser = require("body-parser");


//===========================================
//Mongoose
let mongoose = require("mongoose");
//===========================================


//===========================================
//connecting to the Mongo Db Server
//===========================================
mongoose
  .connect(
    "mongodb://favourtheo:1A2b3c--@ds331145.mlab.com:31145/collegesituation",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Successfully connected to Mongo DB!");
  })
  .catch(err => {
    console.log("Could not connect to MongoDB " + err.message);
  });

let app = express();

//Importing Routes
let indexRoute = require("./Routes/Index");

//Students Register Route
let studentRegisterRoute = require("./Routes/Students/Register");

//--------------------------------------
//All Middlewares here
//--------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//--------------------------------------
//All Routes here
//--------------------------------------

//Welcome Route
app.use("/api/secure2019/landing", indexRoute);

//Other Endpoints
//Students Register Endpoint
app.use("/api/secure2019/students", studentRegisterRoute);

//Spining the Server on 3000
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
