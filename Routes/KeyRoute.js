const express = require("express");
const routes = express.Router();

//============================================
//Importing Key model
//============================================
const Key = require("../models/Key");
const KeyController = require("./../controllers/KeyController");

const {
  getAllKeys,
  createKey,
  getSingleKey,
  deleteSingleKey
} = KeyController;

routes.get("/getAllKeys", getAllKeys);
routes.post("/createKey", createKey);
routes.delete("/deleteSingleKey/:id", deleteSingleKey);
routes.get("/getSingleKey/:id", getSingleKey);

module.exports = routes;
