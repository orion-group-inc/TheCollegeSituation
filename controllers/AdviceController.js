//Importing Advice Model
const Advice = require("../models/Advice");

class AdviceController {
  /**
   * @api {get} /advice/allAdvices Get students information
   * @apiName GetAdvices
   * @apiGroup Advices
   */

  //getting all advices
  static async getAdvices(req, res) {
    Advice.find().then(allAdvices => {
      res.status(200).send({
        success: true,
        data: allAdvices
      });
    });
  }

  //creating a new advice

  static async createAdvice(req, res) {
    let advice = new Advice({
      adviceBody: req.body.adviceBody
    });

    advice.save().then(newAdvice => {
      res
        .status(200)
        .send({
          success: true,
          data: newAdvice
        })
        .catch(err => {
          res.status(400).send("Could not create advice", err.message);
        });
    });
  }
}

module.exports = AdviceController;
