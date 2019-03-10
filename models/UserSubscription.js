const mongoose = require("mongoose");

let UserSubscriptionSchema = mongoose.Schema({
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  authInfo: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  startDate: {type: Date, default: Date.now},
  endDate: {type: Date},
  dateOfCreation: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

let UserSubscription = mongoose.model("UserSubscription", UserSubscriptionSchema);

module.exports = UserSubscription;
