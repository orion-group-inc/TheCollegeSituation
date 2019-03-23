const express = require("express");
const routes = express.Router();

//============================================
//Importing Payment model
//============================================
const Payment = require("../models/Payment");
const PaymentController = require("./../controllers/PaymentController");
const PaymentValidator = require("./../validations/PaymentValidator");


const {
  getAllPayments,
  createPayment,
  getSinglePayment,
  verifyPayment
} = PaymentController;


const {validatePayment} = PaymentValidator;

routes.get("/getAllPayments", getAllPayments);
routes.post("/createPayment", validatePayment, createPayment);
routes.get("/getSinglePayment/:id", getSinglePayment);
routes.post("/verifyPayment", verifyPayment);

module.exports = routes;
