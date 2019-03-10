//Importing Subscription Model
const Subscription = require("./../models/Subscription");

class SubscriptionController {
  /**
   * @api {get} /Subscription/allSubscriptions Get a list of Subscriptions
   * @apiName Get List of Subscriptions
   * @apiGroup Subscription
   */
  static async getAllSubscriptions(req, res) {
    Subscription.find().then(allSubscriptions => {
      res.status(200).send({
        success: true,
        data: allSubscriptions
      });
    });
  }

  /**
   * @api {post} /subscription/createSubscription Create a new subscripton
   * @apiName Create Subscripton
   * @apiGroup Subscripton
   * @apiParam {String} name name of the subscription
   * @apiParam {Number} Price of the subscription
   * @apiParam {Number} duration of the subscription in days
   *
   */
  static async createSubscription(req, res) {
    let subscription = new Subscription({
      name: req.body.name,
      price: req.body.price,
      duration: req.body.duration,

    });

    subscription
      .save()
      .then(newSubscription => {
        res.status(200).send({ success: true, data: newSubscription });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }

  /**
   * @api {post} /subscription/getSingleSubscription/:id get a single subscripton
   * @apiName Get Single Subscripton
   * @apiGroup Subscripton
   * @apiParam {String} id unique id of the subscription
   *
   */
  static async getSingleSubscription(req, res) {
    let id = req.params.id;
    Subscription.findOne({ _id: id })

      .then(singleSubscription => {
        res.status(200).send({
          success: true,
          data: singleSubscription
        });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }
}

module.exports = SubscriptionController;
