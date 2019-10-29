const express = require("express");
const routes = express.Router();

//============================================
//Importing DB Model for Creating stories
//============================================

const StoryController = require("./../controllers/StoryController");
const StoryValidator = require("./../validations/StoryValidator");
const verifyToken = require('./../middleware/verifyToken');

const { getAllStories, createNewStory, getSingleStory, getMyStories, deleteSingleStory } = StoryController;
const {validateStory} = StoryValidator;

routes.get("/getAllStories", verifyToken, getAllStories);
routes.get("/getMyStories", verifyToken, getMyStories);
routes.get("/getSingleStory/:id", verifyToken, getSingleStory);
routes.post("/createNewStory", verifyToken, validateStory, createNewStory);
routes.delete("/singleStory/delete/:id", verifyToken, deleteSingleStory);

module.exports = routes;
