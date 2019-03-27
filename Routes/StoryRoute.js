const express = require("express");
const routes = express.Router();

//============================================
//Importing DB Model for Creating stories
//============================================

const StoryController = require("./../controllers/StoryController");
const StoryValidator = require("./../validations/StoryValidator");
const verifyToken = require('./../middleware/verifyToken');

const { getAllStories, createNewStory, getSingleStory } = StoryController;
const {validateStory} = StoryValidator;

routes.get("/getAllStories", verifyToken, getAllStories);

routes.get("/getSingleStory/:id", verifyToken, getSingleStory);
routes.post("/createNewStory", verifyToken, validateStory, createNewStory);

module.exports = routes;
