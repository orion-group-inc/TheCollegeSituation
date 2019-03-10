const express = require("express");
const routes = express.Router();

//============================================
//Importing DB Model for Creating story categories
//============================================

const StoryCategoryController = require("./../controllers/StoryCategoryController");

const {
  getAllStoryCategories,
  createNewStoryCategory
} = StoryCategoryController;

routes.get("/getAllStoryCategories", getAllStoryCategories);

routes.post("/createNewStoryCategory", createNewStoryCategory);

module.exports = routes;
