let express = require("express");
let routes = express.Router();
let Student = require("../");

routes.get("/registeredStudents", (req, res) => {
  res.status(200).send("<h3>All Registered Students:</h3>");
});

//The Students Register Endpoint
routes.post("/register", (req, res) => {
  //Create New Student (Work on the Mongo Db stuff here..)
  res.status(200).send("<h3>New students will signup here!</h3>");
});

//exporting  thr Student Resister Route
module.exports = routes;
