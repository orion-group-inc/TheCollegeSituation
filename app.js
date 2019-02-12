let express = require("express");
let bodyParser = require("body-parser");

let app = express()

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
