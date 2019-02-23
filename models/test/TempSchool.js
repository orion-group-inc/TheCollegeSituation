const mongoose = require("mongoose");

//Link to scolarships

let TempSchoolSchema = mongoose.Schema({
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
  photos: { type: Array },
  courses: String,
  scholarships: String,
  category: String,
  migrated: {type: Boolean, default: false}
});

let TempSchool = mongoose.model("TempSchool", TempSchoolSchema);

module.exports = TempSchool;
