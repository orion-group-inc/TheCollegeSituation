const mongoose = require("mongoose");

let SubscriptionSchema = mongoose.Schema({
  name: String,
  price: Number,
  duration: Number,
  tag: String,
  desc: String,
  validity: String,
  dateOfCreation: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  
});

let Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
