const Helpers = require('./../helpers/helper');
const fs = require('fs');
const path = require("path");
const base = path.resolve(__dirname, '..');
const {extractErrors} = Helpers;

const isBase64 = require('is-base64');

let extension = 'jpg';

const dest = "/public/scholarships/";


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
    let photo = null;
    
    req.check('photo', 'Scholarship Photo is required')
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
  module.exports = ScholarshipValidator;