const express = require("express");
const routes = express.Router();

//============================================
//Importing DB Model for Creating Advices
//============================================

const AdviceController = require("./../controllers/AdviceController");

const { getAdvices, createAdvice } = AdviceController;

const verifyToken = require('./../middleware/verifyToken');

routes.get("/allAdvices", verifyToken, getAdvices);

routes.post("/createAdvice",verifyToken, createAdvice);

module.exports = routes;
