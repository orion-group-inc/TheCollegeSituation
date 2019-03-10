const mongoose = require("mongoose");
/**
 * Transaction status
 * pending
 * cancelled
 * approved
 */
let PaymentSchema = mongoose.Schema({
  authInfo: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  invoice: String,
  trials: {type: Number, default: 0},
  transactionStatus: {type: String, default: 'pending'},
  dateOfCreation: { type: Date, default: Date.now },
});

let Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
