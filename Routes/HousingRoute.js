const express = require("express");
const routes = express.Router();
const multer = require("multer");
const fs = require('fs');
const dest = "public/houses/";

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
const verifyToken = require('./../middleware/verifyToken');

const { getHouses, createHouse, getSingleHouse } = HousingController;

const { validateHousing} = HousingValidator;

routes.get("/allHouses",verifyToken, getHouses);
routes.get("/getSingleHouse/:id",verifyToken, getSingleHouse);
routes.post("/createHouse",verifyToken, validateHousing, createHouse);
module.exports = routes;
