let express = require("express");
let routes = express.Router();

//============================================
//Importing DB Model for Creating Students
//============================================
let Student = require("../Model/Students/RegisterStudent");

routes.get("/registeredStudents", (req, res) => {
  Student.find().then(allRegisteredStudents => {
    res.status(200).send({
      success: true,
      data: allRegisteredStudents
    });
  });
});

//The Students Register Endpoint
routes.post("/register", (req, res) => {
  //Create New Student (Work on the Mongo Db stuff here..)
  let student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    password: req.body.password
  });

  student
    .save()
    .then(newStudent => {
      res.status(200).send({
        success: true,
        data: newStudent
      });
    })
    .catch(err => {
      res.status(400).send("Could not create new student :(", err.message);
    });
});

//exporting  thr Student Resister Route
module.exports = routes;
