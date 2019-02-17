const express = require("express");
const routes = express.Router();

//============================================
//Importing DB Model for Creating Schools
//============================================

const SchoolController = require("./../controllers/SchoolController");

const { getSchools, createSchool } = SchoolController;

routes.get("/allSchools", getSchools);

routes.post("/createSchool", createSchool);

module.exports = routes;
