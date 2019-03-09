const mongoose = require("mongoose");

let StudentProfileSchema = mongoose.Schema({
  dob: String,
  authInfo: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  gender: String,
  academicLevel: String,
  city: String,
  state: String,
  country: String,
  
});

let StudentProfile = mongoose.model("StudentProfile", StudentProfileSchema);

module.exports = StudentProfile;
