const express = require("express");
const routes = express.Router();

//============================================
//Importing Key model
//============================================
const Key = require("../models/Key");
const KeyController = require("./../controllers/KeyController");
const verifyToken = require('./../middleware/verifyToken');

const {
  getAllKeys,
  createKey,
  getSingleKey,
  deleteSingleKey
} = KeyController;

routes.get("/getAllKeys", verifyToken, getAllKeys);
routes.post("/createKey", verifyToken, createKey);
routes.delete("/deleteSingleKey/:id", verifyToken, deleteSingleKey);
routes.get("/getSingleKey/:id", verifyToken, getSingleKey);

module.exports = routes;
