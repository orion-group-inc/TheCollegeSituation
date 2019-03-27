const express = require("express");
const routes = express.Router();

//============================================
//Importing DB Model for Creating story categories
//============================================

const StoryCategoryController = require("./../controllers/StoryCategoryController");
const verifyToken = require('./../middleware/verifyToken');

const {
  getAllStoryCategories,
  createNewStoryCategory
} = StoryCategoryController;

routes.get("/getAllStoryCategories",verifyToken, getAllStoryCategories);

routes.post("/createNewStoryCategory", verifyToken, createNewStoryCategory);

module.exports = routes;
