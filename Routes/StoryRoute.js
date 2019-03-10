const express = require("express");
const routes = express.Router();

//============================================
//Importing DB Model for Creating stories
//============================================

const StoryController = require("./../controllers/StoryController");

const { getAllStories, createNewStory } = StoryController;

routes.get("/getAllStories", getAllStories);

routes.post("/createNewStory", createNewStory);

module.exports = routes;
