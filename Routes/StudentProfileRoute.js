const express = require("express");
const routes = express.Router();

//============================================
//Importing
//============================================
const StudentProfile = require("../models/StudentProfile");

const StudentProfileController = require("./../controllers/StudentProfileController");
const verifyToken = require('./../middleware/verifyToken');

const {
  getProfiles,
  createProfile,
  getSingleProfile
} = StudentProfileController;

routes.get("/allProfiles", verifyToken, getProfiles);
routes.get("/getSingleProfile/:id", verifyToken, getSingleProfile);
routes.post("/createProfile", createProfile);
module.exports = routes;
