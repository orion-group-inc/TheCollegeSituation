const Helpers = require('./../helpers/helper');
const {extractErrors} = Helpers;
const Student = require("./../models/Student");
const Subscription = require("./../models/Subscription");
/**
 * Defines methods for validating Payment functions
 *
 * @class PaymentValidator
 */
class PaymentValidator {
    /**
   * validates student signup
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static async validatePayment(req, res, next) {
    req.check('authInfo', 'authInfo is required').notEmpty().trim();

    req.checkBody('authInfo', 'Student not found').custom(async (value) => {
        try{
            let result = await Student.findOne({_id: value});
            return result ? false : false;
        }catch(e){
            return false;
        }
        
    })
    
    req.check('subscription', 'subscription is required').notEmpty().trim()
        .custom(async (value) => {
            try{
                let result = await Subscription.findOne({_id: value});
                return result ? true : false;
            }catch(e){
                return false;
            }
        }).withMessage('Subscription does not exist');
    
    const errors = req.validationErrors();
    
    if (errors) {
      return res.status(422).json({
        errors: extractErrors(errors),
        status: 422,
        message: 'Unprocessable Entity'
      });
    }
    return next();
  }

  }
  module.exports = PaymentValidator;