//Require all that's needed to power this App
const express = require("express");
const bodyParser = require("body-parser");
const connection = require('./config/connection');

const app = express();

//Importing Routes
let indexRoute = require("./routes/Index");

//Students Register Route
let studentRoute = require("./routes/Student");

//--------------------------------------
//All Middlewares here
//--------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


//--------------------------------------
//All Routes here
//--------------------------------------


//default landing:
app.get('/', (req, res)=>{
  res.status(200).send(" <br/><h3>The College Situation API</h3> <small>Version 1.0</small>")
})

//Welcome Route
app.use("/api/v1/secure2019/landing", indexRoute);

//Other Endpoints
//Students Endpoint
app.use("/api/v1/secure2019/student", studentRoute);

//Spining the Server on 3000
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
