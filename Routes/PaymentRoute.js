const express = require("express");
const routes = express.Router();

//============================================
//Importing Payment model
//============================================
const Payment = require("../models/Payment");
const PaymentController = require("./../controllers/PaymentController");
const PaymentValidator = require("./../validations/PaymentValidator");
const verifyToken = require('./../middleware/verifyToken');

const {
  getAllPayments,
  createPayment,
  getSinglePayment,
  verifyPayment
} = PaymentController;


const {validatePayment} = PaymentValidator;

routes.get("/getAllPayments", verifyToken, getAllPayments);
routes.post("/createPayment", verifyToken, validatePayment, createPayment);
routes.get("/getSinglePayment/:id", verifyToken, getSinglePayment);
routes.post("/verifyPayment", verifyToken, verifyPayment);

module.exports = routes;
