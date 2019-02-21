const mongoose = require("mongoose");

let AdviceSchema = mongoose.Schema({
  adviceBody: String,
  dateOfCreation: { type: Date, default: Date.now }
});

let Advice = mongoose.model("Advice", AdviceSchema);

module.exports = Advice;
