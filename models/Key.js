const mongoose = require("mongoose");

let KeySchema = mongoose.Schema({
  live: {type: Boolean, default: false},
  paystackTestSecretKey: String,
  paystackTestPublicKey: String,
  paystackLiveSecretKey: String,
  paystackLivePublicKey: String,
  dateOfCreation: { type: Date, default: Date.now },
});

let Key = mongoose.model("Key", KeySchema);

module.exports = Key;
