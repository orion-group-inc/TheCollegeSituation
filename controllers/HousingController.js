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
    House.find()
      .populate("owner")
      .then(allHouses => {
        res.status(200).send({
          success: true,
          data: allHouses
        });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }

  //getting single house wih ID
  /**
   * @api {post} /housing/getSingleHouse/:id Get single house
   * @apiName CreateHouses
   * @apiGroup Housing
   * */
  static async getSingleHouse(req, res) {
    let id = req.params.id;
    House.findOne({ _id: id })
      .populate("owner")
      .then(singleHouse => {
        res.status(200).send({
          success: true,
          data: singleHouse
        });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }

  //creating a new House
  /**
   * @api {post} /housing/createHouse Create new House
   * @apiName CreateHouses
   * @apiGroup Housing
   * @apiParam {String} type Type of house
   * @apiParam {Int} bedrooms Number of bedrooms in the house
   * @apiParam {Int} bathrooms Number of bathrooms in the house
   * @apiParam {Number} price Number of price in the house
   * @apiParam {String} availability  is the house availabile?
   * @apiParam {String} catFriendly 
   * @apiParam {String} dogFriendly
   * @apiParam {String} laundryType
   * @apiParam {String} parkingType
   * @apiParam {String} heatingType
   * @apiParam {String} acType
   * @apiParam {String} city
   * @apiParam {String} state
   * @apiParam {String} zip
   * @apiParam {String} mainPhoto a main photo of the house in base64
   * @apiParam {String} photos an array of base64 photos of different views of the house
   * @apiParam {String} owner id of the owner
   * @apiParam {String} address
   */

  static async createHouse(req, res) {
    let house = new House({
      //Body of the house data

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
      heatingType: req.body.heatingType,
      acType: req.body.acType,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      mainPhoto: req.body.mainPhoto,
      photos: req.body.photos,
      owner: req.body.owner
    });

    house
      .save()

      .then(newHouse => {
        if (newHouse) {
          res.status(200).send({
            success: true,
            data: newHouse
          });
        } else {
          res.status(400).send({
            success: false,
            error: "Unable not add listing"
          });
        }
      })
      .catch(err => {
        res.status(400).send("Oops, an error has occoured", err.message);
      });
  }
}

module.exports = HousingController;
