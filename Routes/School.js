const express = require("express");
const routes = express.Router();
const multer = require("multer");
const fs = require('fs');
const dest = "public/schools/";

// if (!fs.existsSync(dest)){
//   fs.mkdirSync(dest);
// }
let uploaded = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    let filename =
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1];
    cb(null, filename);
  }
});

const upload = multer({ storage });

//============================================
//Importing DB Model for Creating Schools
//============================================

const SchoolController = require("./../controllers/SchoolController");
const SchoolValidator = require("./../validations/SchoolValidator");

const {
  getSchools,
  createSchool,
  createTempSchool,
  migrateSchool,
  searchSchoolByName,
  searchSchoolByCity
} = SchoolController;
const { validateSchool } = SchoolValidator;

routes.get("/allSchools", getSchools);

routes.post("/createSchool",upload.single("photo"), validateSchool, createSchool);

routes.get("/migrateSchool/:id", migrateSchool);

routes.post(
  "/createTempSchool",
  upload.single("photo"),
  validateSchool,
  createTempSchool
);

routes.get("/searchSchoolByName", searchSchoolByName);
routes.get("/searchSchoolByCity", searchSchoolByCity);
module.exports = routes;
