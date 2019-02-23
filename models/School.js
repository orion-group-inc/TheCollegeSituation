const mongoose = require("mongoose");
//Add Majors to the schema

let SchoolSchema = mongoose.Schema({
  name: String,
  desc: String,
  population: String,
  avgTuitionInternational: String,
  avgTuitionLocal: String,
  website: String,
  address: String,
  state: String,
  city: String,
  zip: String,
  graduationRate: String,
  acceptanceRate: String,
  generalPhone: String,
  intlAdmissionPhone: String,
  dateOfCreation: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  photos: { type: Array }
});

let School = mongoose.model("School", SchoolSchema);

module.exports = School;
