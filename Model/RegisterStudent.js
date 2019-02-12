let mongoose = require("mongoose");

let registerStudentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  birthday: String,
  password: String,
  dateOfCreation: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

let Student = mongoose.model("Student", registerStudentSchema);

module.exports = Student;
