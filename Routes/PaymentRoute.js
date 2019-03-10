const express = require("express");
const routes = express.Router();

//============================================
//Importing Payment model
//============================================
const Payment = require("../models/Payment");
const PaymentController = require("./../controllers/PaymentController");

const {
  getAllPayments,
  createPayment,
  getSinglePayment,
  verifyPayment
} = PaymentController;

routes.get("/getAllPayments", getAllPayments);
routes.post("/createPayment", createPayment);
routes.get("/getSinglePayment/:id", getSinglePayment);
routes.post("/verifyPayment", verifyPayment);

module.exports = routes;
