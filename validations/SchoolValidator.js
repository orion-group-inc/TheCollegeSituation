const Helpers = require('./../helpers/helper');
const fs = require('fs');

const {extractErrors} = Helpers;

/**
 * Defines methods for validating school Register functions
 *
 * @class RegisterSchoolValidator
 */
class SchoolValidator {
    /**
   * validates school registration
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validateSchool(req, res, next) {
    req.check('name', 'School Name is required').notEmpty().trim();
    req.check('desc', 'School Name is required').notEmpty().trim();
    req.check('population', 'Population is required').notEmpty().trim()
        .isNumeric().withMessage('Population must be a number');
    req.check('avgTuitionInternational', 'avgTuitionInternational Field is required').notEmpty().trim()
        .isNumeric().withMessage('avgTuitionInternational must be a number');
    
    req.check('avgTuitionLocal', 'avgTuitionLocal is required').notEmpty().trim()
        .isNumeric().withMessage('avgTuitionLocal must be a number');

    req.check('graduationRate', 'graduationRate is required').notEmpty().trim()
        .isNumeric().withMessage('graduationRate must be a number');

    req.check('acceptanceRate', 'acceptanceRate is required').notEmpty().trim()
        .isNumeric().withMessage('acceptanceRate must be a number');

    req.check('generalPhone', 'generalPhone is required').notEmpty().trim()
    req.check('intlAdmissionPhone', 'intlAdmissionPhone is required').notEmpty().trim()
    req.check('category', 'category is required').notEmpty().trim()
    
    req.check('address', 'address is required').notEmpty().trim()
    req.check('state', 'state is required').notEmpty().trim()
    req.check('city', 'city is required').notEmpty().trim()
    req.check('zip', 'zip code is required').notEmpty().trim()

    req.check('website', 'School website is required').notEmpty().trim();
            

    const errors = req.validationErrors();

    if (errors) {
        if(req.files){
            req.files.map((item, index) => {
                fs.unlink(item.path, () => {
                  console.log('deleted ' + item.path);
              });
            });
        }
        
      return res.status(422).json({
        errors: extractErrors(errors),
        status: 422,
        message: 'Unprocessable Entity'
      });
    }
    req.body.photos = req.files;
    console.log(req.body.photos);
    return next();
  }

  }
  module.exports = SchoolValidator;