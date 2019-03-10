const express = require("express");
const routes = express.Router();

//============================================
//Importing Subscription model
//============================================
const Subscription = require("../models/Subscription");
const SubscriptionController = require("./../controllers/SubscriptionController");

const {
  getAllSubscriptions,
  createSubscription,
  getSingleSubscription
} = SubscriptionController;

routes.get("/getAllSubscriptions", getAllSubscriptions);
routes.post("/createSubscription", createSubscription);
routes.get("/getSingleSubscription/:id", getSingleSubscription);

module.exports = routes;
