const express = require("express");
const routes = express.Router();
const multer = require("multer");
const fs = require('fs');
const dest = "public/houses/";

// if (!fs.existsSync(dest)){
//     fs.mkdirSync(dest);
// }

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
//Importing DB Model for Creating Houses
//============================================
const House = require("../models/Housing");

const HousingController = require("./../controllers/HousingController");
const HousingValidator = require("./../validations/HousingValidator");

const { getHouses, createHouse, getSingleHouse } = HousingController;

const { validateHousing} = HousingValidator;

routes.get("/allHouses", getHouses);
routes.get("/getSingleHouse/:id", getSingleHouse);
routes.post("/createHouse", upload.any(), validateHousing, createHouse);
module.exports = routes;
