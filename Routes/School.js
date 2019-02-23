const express = require("express");
const routes = express.Router();
const multer  = require('multer');
const dest =  'public/schools/';
let uploaded = [];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        let filename = file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1];
        uploaded.push(filename);
        cb(null, filename);
    }
});

const upload = multer({ storage });

//============================================
//Importing DB Model for Creating Schools
//============================================

const SchoolController = require("./../controllers/SchoolController");
const SchoolValidator = require('./../validations/SchoolValidator');

const { getSchools, createSchool, createTempSchool } = SchoolController;
const {validateSchool}  = SchoolValidator;

routes.get("/allSchools", getSchools);

routes.post("/createSchool", createSchool);

routes.post("/createTempSchool", upload.array('photos', 12), validateSchool, createTempSchool);

module.exports = routes;
