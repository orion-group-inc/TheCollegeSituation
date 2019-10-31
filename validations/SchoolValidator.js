const Helpers = require('./../helpers/helper');
const fs = require('fs');
const path = require("path");
const base = path.resolve(__dirname, '..');
const {extractErrors} = Helpers;

const isBase64 = require('is-base64');

let extension = 'jpg';

const dest = "/public/schools/";

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
    let photo = null;
  
    req.check('name', 'School Name is required').notEmpty().trim();
    req.check('desc', 'School Description is required').notEmpty().trim();
    req.check('population', 'Population is required').notEmpty().trim()
        .isNumeric().withMessage('Population must be a number');
    req.check('avgTuitionInternational', 'avgTuitionInternational Field is required').notEmpty().trim()
        
    
    req.check('avgTuitionLocal', 'avgTuitionLocal is required').notEmpty().trim()
    

    req.check('graduationRate', 'graduationRate is required').notEmpty().trim()
       

    req.check('acceptanceRate', 'acceptanceRate is required').notEmpty().trim()
  

    req.check('generalPhone', 'generalPhone is required').notEmpty().trim()
    req.check('intlAdmissionPhone', 'intlAdmissionPhone is required').notEmpty().trim()
    req.check('category', 'category is required').notEmpty().trim()
    
    req.check('address', 'address is required').notEmpty().trim()
    req.check('state', 'state is required').notEmpty().trim()
    req.check('city', 'city is required').notEmpty().trim()
    req.check('zip', 'zip code is required').notEmpty().trim()
    req.check('website', 'School website is required').notEmpty().trim();   
    req.check('photo', 'School Photo is required')
    .custom((value) => {
        if(!isBase64(value,{ mime: true })){
            return false;
        }
        let filename = Math.random().toString(36).substring(7)+ Date.now();
        let status = false;
        let base64Data = req.body.photo;
        extension = '.'+base64Data.substring("data:image/".length, base64Data.indexOf(";base64"));
        base64Data = base64Data.replace(/^data:image\/.*;base64,/,"");
        fs.writeFileSync(base+dest+filename+extension, base64Data, 'base64', function(err) {
            if (err) console.log(err);           
        });
        
        try{
            fs.readFileSync(base+dest+filename+extension);
            photo = base+dest+filename+extension;
            status = true;
        }catch(err){
            console.log(err.response);
        }
        return status;
    });
  
    const errors = req.validationErrors();

    if (errors) {
        if(photo){
            fs.unlink(photo, () => {
                console.log('deleted ' + photo);
            });
        }
        
      return res.status(422).json({
        errors: extractErrors(errors),
        status: 422,
        message: 'Unprocessable Entity'
      });
    }
    
    req.body.photo = photo.replace(base+'/public/', '');
    return next();
  }

  }
  module.exports = SchoolValidator;