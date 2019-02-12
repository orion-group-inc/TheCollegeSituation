const express = require("express");
const routes = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//============================================
//Importing DB Model for Creating Students
//============================================
const Student = require("../models/Student");
const AuthController = require('./../controllers/AuthController');
const StudentController = require('./../controllers/StudentController');

const {registerStudent, loginStudent} = AuthController;
const {getRegisteredStudents} = StudentController;

// Get Registered users
routes.get("/registeredStudents",getRegisteredStudents);

//The Students Register Endpoint
routes.post("/register", registerStudent);

//The Students Register Endpoint
routes.post("/login", loginStudent);

//exporting  thr Student Resister Route
module.exports = routes;
