const mongoose = require("mongoose");

let SchoolSchema = mongoose.Schema({
  
    dateOfCreation: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false }
});

let Student = mongoose.model("School", SschoolSchema);

module.exports = School;
