const express = require("express");
const routes = express.Router();
const multer = require("multer");
const fs = require('fs');
const dest = "public/scholarships/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    let filename =
      file.fieldname + "-" + Math.random().toString(36).substring(7)+ Date.now() + "." + file.mimetype.split("/")[1];
    cb(null, filename);
  }
});

const upload = multer({ storage });

//============================================
//Importing scholarship model
//============================================
const Scholarship = require("../models/Scholarship");
const ScholarshipController = require("./../controllers/ScholarshipController");
const ScholarshipValidator = require("./../validations/ScholarshipValidator");
const verifyToken = require('./../middleware/verifyToken');

const {
    getAllScholarships,
    createScholarship,
    getSingleScholarship
} = ScholarshipController;

const {validateScholarship} = ScholarshipValidator;

routes.get("/getAllScholarships", verifyToken, getAllScholarships);
routes.post("/createScholarship", verifyToken, validateScholarship, upload.single("photo"), createScholarship);
routes.get("/getSingleScholarship/:id", verifyToken, getSingleScholarship);

module.exports = routes;