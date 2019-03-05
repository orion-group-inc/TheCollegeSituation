const mongoose = require("mongoose");

//The Housing data

let HousingSchema = mongoose.Schema({
  mainPhoto: String,
  type: "String",
  address: String,
  bedrooms: String,
  bathrooms: String,
  price: String,
  size: String,
  briefDescription: String,
  availability: String,
  catFriendly: { type: String },
  dogFriendly: { type: String },
  laundryType: String,
  parkingType: String,
  heatingType: String,
  acType: String,
 
  dateOfCreation: { type: Date, default: Date.now },
  city: String,
  state: String,
  zip: String,
  photos: [],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Student" } // Creates relationships btw user profie and listing
});

//Model the Housing Schema
let House = mongoose.model("House", HousingSchema);

module.exports = House;
