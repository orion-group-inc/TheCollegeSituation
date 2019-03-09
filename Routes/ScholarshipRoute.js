const express = require("express");
const routes = express.Router();

//============================================
//Importing scholarship model
//============================================
const Scholarship = require("../models/Scholarship");
const ScholarshipController = require("./../controllers/ScholarshipController");

const { getAllScholarships, createScholarship } = ScholarshipController;

routes.get("/getAllScholarships", getAllScholarships);
routes.post("/createScholarship", createScholarship);

module.exports = routes;
