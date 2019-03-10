const mongoose = require("mongoose");
//The Story Schema

let StorySchema = mongoose.Schema({
  title: String,
  photo: String,
  description: String,
  featured: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "StoryCategory" },
  dateOfCreation: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Student" } // Creates relationships btw user profie and listing
});

let Story = mongoose.model("Story", StorySchema);

module.exports = Story;
