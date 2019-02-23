const Helpers = require('./../helpers/helper');
const {extractErrors} = Helpers;

/**
 * Defines methods for validating student Register functions
 *
 * @class RegisterValidator
 */
class StudentValidator {
    /**
   * validates student signup
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validateStudent(req, res, next) {
    req.check('firstName', 'First Name is required').notEmpty().trim();
    req.check('lastName', 'Last Name is required').notEmpty().trim();
    req.check('email', 'Email field is required').notEmpty().trim().isEmail().withMessage('Invalid email');
    req.check('password', 'Password is required').notEmpty().trim().isLength({ min: 6 })
      .withMessage('password cannot be less then 6 characters');
    req.check('birthday', 'Birthday is required');
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

   /**
   * validates user sign up inputs
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validateStudentLogin(req, res, next) {
    req.check('email', 'Email field is required')
      .notEmpty().trim()
      .isEmail().withMessage('Invalid email');
    req.check('password', 'Password is required')
    const errors = req.validationErrors();

    if (errors) {
      return res.status(422).json({
        errors: extractErrors(errors),
        status: 422,
        message: 'Bad request 😈'
      });
    }
    return next();
  }

  }
  module.exports = StudentValidator;