const mongoose = require("mongoose");

//The Housing data

let HousingSchema = mongoose.Schema({
  photos: { type: Array },
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
  zip: String
});

//Model the Housing Schema
let House = mongoose.model("House", HousingSchema);

module.exports = House;
