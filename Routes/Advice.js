const express = require("express");
const routes = express.Router();

//============================================
//Importing DB Model for Creating Advices
//============================================

const AdviceController = require("./../controllers/AdviceController");

const { getAdvices, createAdvice } = AdviceController;

routes.get("/allAdvices", getAdvices);

routes.post("/createAdvice", createAdvice);

module.exports = routes;
