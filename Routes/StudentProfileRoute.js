const express = require("express");
const routes = express.Router();

//============================================
//Importing
//============================================
const StudentProfile = require("../models/StudentProfile");

const StudentProfileController = require("./../controllers/StudentProfileController");

const {
  getProfiles,
  createProfile,
  getSingleProfile
} = StudentProfileController;

routes.get("/allProfiles", getProfiles);
routes.get("/getSingleProfile/:id", getSingleProfile);
routes.post("/createProfile", createProfile);
module.exports = routes;
