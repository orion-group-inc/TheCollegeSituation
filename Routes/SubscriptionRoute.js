const express = require("express");
const routes = express.Router();

//============================================
//Importing Subscription model
//============================================
const Subscription = require("../models/Subscription");
const SubscriptionController = require("./../controllers/SubscriptionController");
const verifyToken = require('./../middleware/verifyToken');

const {
  getAllSubscriptions,
  createSubscription,
  getSingleSubscription
} = SubscriptionController;

routes.get("/getAllSubscriptions",verifyToken, getAllSubscriptions);
routes.post("/createSubscription",verifyToken, createSubscription);
routes.get("/getSingleSubscription/:id",verifyToken, getSingleSubscription);

module.exports = routes;
