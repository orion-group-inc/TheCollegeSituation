const mongoose = require("mongoose");

let StudentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userSubscription: { type: mongoose.Schema.Types.ObjectId, ref: "UserSubscription" },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "StudentProfile" },
  dateOfCreation: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

let Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
