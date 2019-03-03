const mongoose = require("mongoose");

//The Housing data

let HousingSchema = mongoose.Schema({
  photos: { type: Array, default: undefined },
  type: "String",
  address: String,
  bedrooms: String,
  bathrooms: String,
  price: String,
  size: String,
  briefDescription: String,
  availability: String,
  catFriendly: { type: String },
  dogFriendly: { tyle: String },
  laundryType: String,
  parkingType: String,
  acType: String,
  HeatingType: String,
  dateOfCreation: { type: Date, default: Date.now },
  city: String,
  state: String,
  zip: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Creates relationships btw user profie and listing
});

//Model the Housing Schema
let House = mongoose.model("House", HousingSchema);

module.exports = House;
