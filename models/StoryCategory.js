const mongoose = require("mongoose");
//The Story Schema

let StoryCategorySchema = mongoose.Schema({
  name: String,
  stories: [ {type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
  dateOfCreation: { type: Date, default: Date.now }
});

let StoryCategory = mongoose.model("StoryCategory", StoryCategorySchema);

module.exports = StoryCategory;
