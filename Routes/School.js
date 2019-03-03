const express = require("express");
const routes = express.Router();
const multer = require("multer");
const dest = "public/schools/";
let uploaded = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    let filename =
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1];
    console.log(file, filename);
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

routes.post("/createSchool", createSchool);

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
