const Helpers = require('./../helpers/helper');
const fs = require('fs');

const {extractErrors} = Helpers;

const savedDestination = 'stories/';

const isBase64 = require('is-base64');

const dest = "public/stories/";

const filename = Math.random().toString(36).substring(7)+ Date.now();
/**
 * Defines methods for validating school Register functions
 *
 * @class StoryValidator
 */
class StoryValidator {
    /**
   * validates storyregistration
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validateStory(req, res, next) {
    let extension = 'jpg';
    let photo = null;
    req.check('title', 'Title of story is required').notEmpty().trim();
    req.check('category', 'category is required').notEmpty().trim();
    req.check('description', 'Descripton is required').notEmpty().trim(); 
    req.checkBody('photo', 'Photo is required')
        .custom((value) => {
            if(!isBase64(value,{ mime: true })){
                return false;
            }
            let status = false;
            let base64Data = req.body.photo;
            extension = '.'+base64Data.substring("data:image/".length, base64Data.indexOf(";base64"));
            base64Data = base64Data.replace(/^data:image\/.*;base64,/,"");
            fs.writeFileSync(dest+filename+extension, base64Data, 'base64', function(err) {
                if (err) console.log(err);           
            });
            
            try{
                fs.readFileSync(dest+filename+extension);
                photo = dest+filename+extension;
                status = true;
            }catch(err){
                console.log(err.response);
            }
            return status;
        }); 

    
        const errors = req.validationErrors();

    if (errors) {
        if(photo){
            fs.unlink(dest+filename+extension, () => {
                console.log('deleted ' + dest+filename+extension);
            });
        }
        
        
      return res.status(422).json({
        errors: extractErrors(errors),
        status: 422,
        message: 'Unprocessable Entity'
      });
    }
    
    req.body.photo = savedDestination+filename+extension;
    return next();
  }

  }
  module.exports = StoryValidator;