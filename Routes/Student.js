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


routes.get("/registeredStudents",getRegisteredStudents);

routes.post("/register", registerStudent);

routes.post("/login", loginStudent);


module.exports = routes;
