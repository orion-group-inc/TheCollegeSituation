const express = require("express");
const routes = express.Router();

//============================================
//Importing DB Model for Creating Houses
//============================================
const House = require("../models/Housing");

const HousingController = require("./../controllers/HousingController");

const { getHouses, createHouse, getSingleHouse } = HousingController;

routes.get("/allHouses", getHouses);
routes.get("/getSingleHouse/:id", getSingleHouse);
routes.post("/createHouse", createHouse);
module.exports = routes;
