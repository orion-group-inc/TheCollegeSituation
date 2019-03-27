//Importing Key Model
const Key = require("./../models/Key");

class KeyController {
  /**
   * @api {get} /Key/allKeys Get a list of Keys
   * @apiName GetKeys
   * @apiGroup Keys
   */
  static async getAllKeys(req, res) {
    Key.findOne().then(allKeys => {
      res.status(200).send({
        success: true,
        data: allKeys
      });
    });
  }

  
  /**
   * @api {post} /key/createKey Create a new key
   * @apiName Createkey
   * @apiGroup Keys
   * @apiParam {Boolean} live indicates if payment is live or on test
   * @apiParam {String} PaystackTestSecretKey Paystack test secret key
   * @apiParam {String} PaystackTestPublicKey Paystack test public key
   * @apiParam {String} PaystackLiveSecretKey Paystack live secret key
   * @apiParam {String} PaystackLivePublicKey Paystack live public key
   *
   */
  static async createKey(req, res) {
     
    let key = new Key({
        paystackTestSecretKey: req.body.paystackTestSecretKey,
        paystackTestPublicKey: req.body.paystackTestPublicKey,
        paystackLiveSecretKey: req.body.paystackLiveSecretKey,
        paystackLivePublicKey: req.body.paystackLivePublicKey,
    });
    Key.find()
        .then(keys => {
            if(keys.length <= 0){
                key
                    .save()
                    .then(newKey => {
                        res.status(200).send({ success: true, data: newKey });
                    })
                    .catch(err => {
                        res.status(400).send("An error occoured", err.message);
                    });
            }else{
                res.status(422).send({message: 'key exists'});
            }
            
            
        })
    
  }

  static async deleteSingleKey(req, res) {
    let id = req.params.id;
   
    Key.findByIdAndDelete(id)

      .then(() => {
        res.status(200).send({
          success: true,
          message: "Key removed"
        });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }

  //getting single Key with ID

  static async getSingleKey(req, res) {
    let id = req.params.id;
    Key.findOne({ _id: id })

      .then(singleKey => {
        res.status(200).send({
          success: true,
          data: singleKey
        });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }
}

module.exports = KeyController;
