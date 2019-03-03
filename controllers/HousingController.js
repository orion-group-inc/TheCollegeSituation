//Importing Advice Model
const House = require("../models/Housing");

class HousingController {
  /**
   * @api {get} /housing/allHouses Get all houses
   * @apiName GetAdvices
   * @apiGroup Housing
   */

  //getting all Houses
  static async getHouses(req, res) {
    House.find().then(allHouses => {
      res.status(200).send({
        success: true,
        data: allHouses
      });
    });
  }

  //creating a new House
  /**
   * @api {post} /housing/createHouse Create new House
   * @apiName CreateHouses
   * @apiGroup Housing
   * @apiParam {String} _id Unique ID of each House
   
   */

  static async createHouse(req, res) {
    let house = new House({
      //Body of the house data
      photos: req.body.photos,
      type: req.body.type,
      address: req.body.address,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      price: req.body.price,
      size: req.body.size,
      briefDescription: req.body.briefDescription,
      availability: req.body.availability,
      catFriendly: req.body.catFriendly,
      dogFriendly: req.body.dogFriendly,
      laundryType: req.body.laundryType,
      parkingType: req.body.parkingType,
      acType: req.body.acType,
      HeatingType: req.body.HeatingType,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    });

    house.save().then(newHouse => {
      res
        .status(200)
        .send({
          success: true,
          data: newHouse
        })
        .catch(err => {
          res.status(400).send("Could not create house", err.message);
        });
    });
  }
}

module.exports = HousingController;
