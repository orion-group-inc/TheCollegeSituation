const mongoose = require("mongoose");
//The Scholarship Schema

let ScholarshipSchema = mongoose.Schema({
  title: String,
  photo: String,
  dueDate: String,
  amount: String,
  state: String,
  status: String,
  educationalLevel: String,
  description: String,
  featured: String,
  link: String
});

let Scholarship = mongoose.model("Scholarship", ScholarshipSchema);

module.exports = Scholarship;
