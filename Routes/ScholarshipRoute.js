const express = require("express");
const routes = express.Router();

//============================================
//Importing scholarship model
//============================================
const Scholarship = require("../models/Scholarship");
const ScholarshipController = require("./../controllers/ScholarshipController");

const {
  getAllScholarships,
  createScholarship,
  getSingleScholarship
} = ScholarshipController;

routes.get("/getAllScholarships", getAllScholarships);
routes.post("/createScholarship", createScholarship);
routes.get("/getSingleScholarship/:id", getSingleScholarship);

module.exports = routes;
