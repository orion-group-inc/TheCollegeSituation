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
const StudentValidator = require('./../validations/StudentValidator');

const {registerStudent, loginStudent} = AuthController;
const {getRegisteredStudents, getStudentSubscription} = StudentController;
const {validateStudent, validateStudentLogin}  = StudentValidator;

routes.get("/registeredStudents",getRegisteredStudents);

routes.get("/subscription/:id",getStudentSubscription);

routes.post("/register",validateStudent, registerStudent);

routes.post("/login",validateStudentLogin, loginStudent);


module.exports = routes;
