const mongoose = require("mongoose");

let StudentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  birthday: String,
  password: String,
  dateOfCreation: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false }
});

let Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
