const mongoose = require("mongoose");

let SchoolSchema = mongoose.Schema({
  
    dateOfCreation: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false }
});

let School = mongoose.model("School", SchoolSchema);

module.exports = School;
