//Require all that's needed to power this App
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./config/connection");
const expressValidator = require("express-validator");
const app = express();
//=========================================================
//Importing All Routes
//=========================================================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//allowing for serving static files
app.use(express.static("public"));
//Index / landing Route
let indexRoute = require("./Routes/Index");
// app.use('/public/schools', express.static(__dirname + '/Images'));
//Students Register Route
let studentRoute = require("./Routes/Student");

//School Creation Route
let schoolRoute = require("./Routes/School");

//importing the advice route
let AdviceRoute = require("./Routes/Advice");

//importing the House route
let HousingRoute = require("./Routes/HousingRoute");

//importing the Student Profile route
let StudentProfileRoute = require("./Routes/StudentProfileRoute");

//importing the scholarship route
let ScholarshipRoute = require("./Routes/ScholarshipRoute");

//=========================================================
//All Middlewares here
//=========================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
//=========================================================
//All Routes (Endpoints) getting used here
//=========================================================

//CORS

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//default landing:
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      " <br/><center><h3>The College Situation API</h3> <small>Version 1.0 <br/> <br/>Favour Ori & Franklyn Nwanze</small> </center>"
    );
});

//Welcome Route
app.use("/api/v1/landing", indexRoute);

//Other Endpoints
//Students Endpoint
app.use("/api/v1/student", studentRoute);

//school endpoint
app.use("/api/v1/school", schoolRoute);

//Advice endpoint
app.use("/api/v1/advice", AdviceRoute);

//House endpoint
app.use("/api/v1/housing", HousingRoute);

//Student Profile endpoint
app.use("/api/v1/student", StudentProfileRoute);

//scholarship endpoint
app.use("/api/v1/scholarship", ScholarshipRoute);

//=========================================================
//Running the server on Port 3000 default
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
