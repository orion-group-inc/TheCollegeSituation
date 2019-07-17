//Require all that's needed to power this App
//adding a few documentation
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./config/connection");
const expressValidator = require("express-validator");
const path = require("path");
const app = express();
//=========================================================
//Importing All Routes
//=========================================================
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb', extended: false }));


//=========================================================
//All Middlewares here
//=========================================================
// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

//importing the scholarship route
let SubscriptionRoute = require("./Routes/SubscriptionRoute");

//importing the scholarship route
let PaymentRoute = require("./Routes/PaymentRoute");

//importing the scholarship route
let KeyRoute = require("./Routes/KeyRoute");

//importing the story category route
let StoryCategoryRoute = require("./Routes/StoryCategoryRoute");

//importing the story route
let StoryRoute = require("./Routes/StoryRoute");

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
      " <br/><center><h3>The College Situation API</h3> <small>Version 1.0 <br/> <br/>Favour Ori & Franklin Nwanze</small> </center>"
    );
});

//default landing:
app.get("/apidoc", (req, res) => {
  res.sendFile(path.join(__dirname, "public/apidoc", "index.html"));
});

app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "payment.html"));
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

//subscription endpoint
app.use("/api/v1/subscription", SubscriptionRoute);

//subscription endpoint
app.use("/api/v1/payment", PaymentRoute);

//key endpoint
app.use("/api/v1/key", KeyRoute);

//story category endpoint
app.use("/api/v1/storyCategory", StoryCategoryRoute);

//story endpoint
app.use("/api/v1/story", StoryRoute);
//=========================================================
//Running the server on Port 3000 default
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
