//Importing Payment Model
const Payment = require("./../models/Payment");
const Key = require("./../models/Key");
const UserSubscription = require("./../models/UserSubscription");
const Subscription = require("./../models/Subscription");
const Student = require("./../models/Student");
const Helper = require("./../helpers/helper");
const axios = require("axios");
const moment = require("moment");

const { generateInvoice } = Helper;

class PaymentController {
  /**
   * @api {get} /Payment/allPayments Get a list of Payments
   * @apiName GetPayments
   * @apiGroup Payment
   */
  static async getAllPayments(req, res) {
    Payment.find()
      .populate("subscription")
      .populate("authInfo", "-password")
      .exec()
      .then(allPayments => {
        res.status(200).send({
          success: true,
          data: allPayments
        });
      })
      .catch(err => {
        console.log("Error finding invoice", err.message);
      });
  }

  /**
   * @api {post} /payment/createPayment Create a new Payment
   * @apiName CreatePayment
   * @apiGroup Payment
   * @apiParam {String} authInfo id of the student logged in
   * @apiParam {String} subscription id of the subscription to pay for
   *
   */
  static async createPayment(req, res) {
    try{
      let subscription = await Subscription.findOne({_id: req.body.subscription});
      if(!subscription) res.status(400).send({status: 'failed', message: "Subscription does not exist"});
      let student = await Student.findOne({_id: req.body.authInfo});
      if(!student) res.status(400).send({status: 'failed', message: "Student does not exist"});
      UserSubscription.findOne({authInfo: req.body.authInfo})
      .then(async (userSubscription) => {
        
        if(subscription.tag == 'free'){
          if(userSubscription){
             // adds days to end Date of subscription
             userSubscription.endDate = moment(userSubscription.endDate).add(subscription.duration, 'days');
             student.userSubscription = userSubscription;
             await student.save();
             await userSubscription.save();
             res.send({message: 'Subscription successully updated', data: userSubscription});
          }else{
            // creates a new subscription for user
            let newUserSubscription = new UserSubscription({
              authInfo: req.body.authInfo,
              subscription: req.body.subscription,
              startDate: moment(),
              endDate: moment().add(subscription.duration, 'days')
          });
  
          
  
            let result = await newUserSubscription.save();
            student.userSubscription = result;
            await student.save();
            res.send({message: 'subscription successful', data: result})
          }
          
        }
      }).catch(err =>{
        res.status(400).send({status: 'failed', message: "Student or Subscription doesnt exists"});
      })
      
      let payment = new Payment({
        authInfo: req.body.authInfo,
        subscription: req.body.subscription,
        invoice: generateInvoice()
      });

      payment
        .save()
        .then(newPayment => {
          Payment.findOne({ _id: newPayment._id })
            .populate("authInfo", "-password")
            .populate("subscription")
            .exec()
            .then(refPayment => {
              res.status(200).send({ success: true, data: refPayment });
            });
        })
        .catch(err => {
          res.status(400).send("An error occoured", err.message);
        });
    }catch(e){
      res.status(400).send({status: 'failed', message: "Student or Subscription doesnt exists"});
    }
  
  }

  /**
   * @api {get} /payment/getSinglePayment/:invoice
   * @apiName Get Single Payment
   * @apiGroup Payment
   * @apiParam {String} invoice invoice number of the payment
   *
   */
  static async getSinglePayment(req, res) {
    let id = req.params.id;
    Payment.findOne({ _id: id })

      .then(singlePayment => {
        res.status(200).send({
          success: true,
          data: singlePayment
        });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }

  /**
   * @api {post} /payment/verifyPayment verify Payment
   * @apiName VerifyPayment
   * @apiGroup Payment
   * @apiParam {String} invoice invoice number of the payment
   * Add email sending after subscription
   */
  static async verifyPayment(req, res) {
    let key = await Key.findOne();
    
    if (key) {
      let secret =
        key.live === false
          ? key.paystackTestSecretKey
          : key.paystackLiveSecretKey;
      
      try {
        let invoice = await Payment.findOne({ invoice: req.body.invoice });
        if (invoice) {
          let response = await axios.get(
            "https://api.paystack.co/transaction/verify/" + req.body.invoice,
            {
              headers: {
                Authorization: "Bearer " + secret
              }
            })
            
            if(response.data.data.status === 'success'){
              // checks if payment is verified
              let userSubscription = await UserSubscription.findOne({authInfo: invoice.authInfo});
              let student = await Student.findOne({_id: invoice.authInfo});
              let subscription = await Subscription.findOne({_id: invoice.subscription});
              
              if(invoice.transactionStatus == 'pending'){
                if(userSubscription){
                  // adds days to end Date of subscription
                  userSubscription.endDate = moment(userSubscription.endDate).add(subscription.duration, 'days');
                  student.userSubscription = userSubscription;
                  await student.save();
                  invoice.transactionStatus = 'completed';
                  await invoice.save();
                  await userSubscription.save();
                  res.send({message: 'Subscription successully updated', data: userSubscription});
                }else{
  
                  // creates a new subscription for user
                  let newUserSubscription = new UserSubscription({
                      authInfo: invoice.authInfo,
                      subscription: invoice.subscription,
                      startDate: moment(),
                      endDate: moment().add(subscription.duration, 'days')
                  });
  
                 

                  let result = await newUserSubscription.save();
                  student.userSubscription = result;
                  await student.save();

                  if(result){
                    invoice.transactionStatus = 'completed';
                    await invoice.save();
                    res.send({message: 'subscription successful', data: result})
                  }else{
                    res.status(400).send({message: 'subscription failed'})
                  }
                }
              }else{
                res.status(400).send({ status: false, message: 'Transaction has been verified already'})
              }
            }
          
        } else {
          res.status(400).send({ message: "Couldnt find invoice" });
        }
      } catch (e) {
        // console.log(e);
        res.status(400).send(e.response.data);
      }
    }
  }
}

module.exports = PaymentController;
