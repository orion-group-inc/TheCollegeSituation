const Helpers = require('./../helpers/helper');
const fs = require('fs');
const {extractErrors} = Helpers;

const savedDestination = 'scholarships/';

/**
 * Defines methods for validating school Register functions
 *
 * @class ScholarshipValidator
 */
class ScholarshipValidator {
    /**
   * validates house registration
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validateScholarship(req, res, next) {
    req.check('title', 'Title of house is required').notEmpty().trim();
    req.check('dueDate', 'dueDate is required').notEmpty().trim();

    req.check('amount', 'amount is required').notEmpty().trim()
        .isNumeric().withMessage('amount must be a numeric');

    req.check('state', 'state is required').notEmpty().trim();

    req.check('description', 'Descripton is required').notEmpty().trim(); 

    req.check('link', 'link is required').notEmpty().trim()
        .custom((url) => {
            return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url);
        }).withMessage('Link is invalid');

    req.check('status', 'status is required').notEmpty().trim();
    req.check('educationalLevel', 'educationLevel is required').notEmpty().trim();

    req.checkBody('photo', 'Photo is required')
        .custom((value) => {
            if(req.file){
                if(req.file.fieldname == 'photo'){
                    return true;
                }
            }
            return false;
        }); 


    const errors = req.validationErrors();

    if (errors) {
        if(req.file){ 
                       
                fs.unlink(req.file.path, () => {
                    console.log('deleted ' + req.file.path);
            });
        }
        
      return res.status(422).json({
        errors: extractErrors(errors),
        status: 422,
        message: 'Unprocessable Entity'
      });
    }
    
    req.body.photo = savedDestination + req.file.filename;
    return next();
  }

  }
  module.exports = ScholarshipValidator;