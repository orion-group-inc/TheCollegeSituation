const Helpers = require('./../helpers/helper');
const fs = require('fs');

const {extractErrors} = Helpers;

const isBase64 = require('is-base64');

let extension = 'jpg';

const dest = "public/schools/";


/**
 * Defines methods for validating school Register functions
 *
 * @class HousingValidator
 */
class HousingValidator {
    /**
   * validates house registration
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validateHousing(req, res, next) {
    let photos = []; 
    let mainPhoto = null;
    const filename = Math.random().toString(36).substring(7)+ Date.now();
    req.check('type', 'Type of house is required').notEmpty().trim();
    req.check('bedrooms', 'Bedroom is required').notEmpty().trim()
        .isNumeric().withMessage('Bedroom must be a number');

    req.check('bathrooms', 'Bathroom is required').notEmpty().trim()
        .isNumeric().withMessage('Bathroom must be a number');

    req.check('price', 'Price is required').notEmpty().trim()
        .isNumeric().withMessage('Price must be a number');

    req.check('size', 'Size is required').notEmpty().trim(); 

    req.check('briefDescription', 'A brief description is required').notEmpty().trim()
        .isLength({ min: 20 })
        .withMessage('Description must be at least 20 characters');
        
    req.check('availability', 'Availability is required').notEmpty().trim();

    req.check('catFriendly', 'Cat Friendly Field is required').notEmpty().trim();

    req.check('dogFriendly', 'Dog Friendly Field is required').notEmpty().trim();

    req.check('laundryType', 'Laundry type Field is required').notEmpty().trim();

    req.check('parkingType', 'Parking Type Field is required').notEmpty().trim();

    req.check('heatingType', 'Heating Type Field is required').notEmpty().trim();

    req.check('acType', 'AC Type Field is required').notEmpty().trim();

    req.check('address', 'address is required').notEmpty().trim()
    req.check('state', 'state is required').notEmpty().trim()
    req.check('city', 'city is required').notEmpty().trim()
    req.check('zip', 'zip code is required').notEmpty().trim()
    req.checkBody('mainPhoto', 'Main Photo is required')
    .custom((value) => {
        if(!isBase64(value,{ mime: true })){
            return false;
        }
        let status = false;
        let base64Data = req.body.mainPhoto;
        extension = '.'+base64Data.substring("data:image/".length, base64Data.indexOf(";base64"));
        base64Data = base64Data.replace(/^data:image\/.*;base64,/,"");
        fs.writeFileSync(dest+filename+extension, base64Data, 'base64', function(err) {
            if (err) console.log(err);           
        });
        
        try{
            fs.readFileSync(dest+filename+extension);
            mainPhoto = dest+filename+extension;
            status = true;
        }catch(err){
            console.log(err.response);
        }
        return status;
    });


    req.checkBody('photos', 'Photos is required and must be at least 6')
      .custom((value) => {
        
          if(req.body.photos){ 
             
              req.body.photos.map((photo, index) => {             
                let base64Data = photo;
                if(!isBase64(photo,{ mime: true })){
                    return;
                }
                let filename = Math.random().toString(36).substring(7)+ Date.now();
                let extension = '.'+base64Data.substring("data:image/".length, base64Data.indexOf(";base64"));
                base64Data = base64Data.replace(/^data:image\/.*;base64,/,"");
                fs.writeFileSync(dest+filename+extension, base64Data, 'base64', function(err) {
                    if (err) console.log(err);           
                });
                
                try{
                    fs.readFileSync(dest+filename+extension);
                    photos.push(dest+filename+extension);
                    
                }catch(err){
                    console.log(err.response);
                }
              });
              return photos.length >= 6;
          }else{
              return false;
          }
        })


    const errors = req.validationErrors();

    if (errors) { 
        photos.map((item, index) => {             
            fs.unlink(item, () => {
                console.log('deleted ' + item);
            });
        });

        if(mainPhoto){
            fs.unlink(mainPhoto, () => {
                console.log('deleted ' + mainPhoto);
            });
        }
        
      return res.status(422).json({
        errors: extractErrors(errors),
        status: 422,
        message: 'Unprocessable Entity'
      });
    }

    photos = photos.map((item) => {
        return item.replace('public/','');
    });
    
    req.body.photos = photos;

    req.body.mainPhoto = mainPhoto.replace('public/', '');
    return next();
  }

//    /**
//    * validates house registration
//    * @param {object} req
//    * @param {object} res
//    * @param {callback} next
//    */
//   static validateHousing(req, res, next) {
//     req.check('type', 'Type of house is required').notEmpty().trim();
//     req.check('bedrooms', 'Bedroom is required').notEmpty().trim()
//         .isNumeric().withMessage('Bedroom must be a number');

//     req.check('bathrooms', 'Bathroom is required').notEmpty().trim()
//         .isNumeric().withMessage('Bathroom must be a number');

//     req.check('price', 'Price is required').notEmpty().trim()
//         .isNumeric().withMessage('Price must be a number');

//     req.check('size', 'Size is required').notEmpty().trim(); 

//     req.check('briefDescription', 'A brief description is required').notEmpty().trim()
//         .isLength({ min: 20 })
//         .withMessage('Description must be at least 20 characters');
        
//     req.check('availability', 'Availability is required').notEmpty().trim();

//     req.check('catFriendly', 'Cat Friendly Field is required').notEmpty().trim();

//     req.check('dogFriendly', 'Dog Friendly Field is required').notEmpty().trim();

//     req.check('laundryType', 'Laundry type Field is required').notEmpty().trim();

//     req.check('parkingType', 'Parking Type Field is required').notEmpty().trim();

//     req.check('heatingType', 'Heating Type Field is required').notEmpty().trim();

//     req.check('acType', 'AC Type Field is required').notEmpty().trim();

//     req.check('address', 'address is required').notEmpty().trim()
//     req.check('state', 'state is required').notEmpty().trim()
//     req.check('city', 'city is required').notEmpty().trim()
//     req.check('zip', 'zip code is required').notEmpty().trim()
//     req.checkBody('mainPhoto', 'Main Photo is required')
//     .custom((value) => {
//         let isFound = false;
//         if(req.files){ 
//             req.files.map((item, index) => {             
//               if(item.fieldname == 'mainPhoto'){
//                   isFound = true;
//               }
//             });
//              if(!isFound){
//                 return false;
//              }else{
//                  return true;
//              }
//         }else{
//             return false;
//         }
//       });

//     req.checkBody('photos', 'Photos is required and must be at least 6')
//       .custom((value) => {
//           let count = 0;
//           if(req.files){ 
//               req.files.map((item, index) => {             
//                 if(item.fieldname == 'photos'){
//                     count++;
//                 }
//               });
//                if(count < 6){
//                   return false;
//                }else{
//                    return true;
//                }
//           }else{
//               return false;
//           }
//         })


//     const errors = req.validationErrors();

//     if (errors) {
//         if(req.files){ 
//             req.files.map((item, index) => {             
//                 fs.unlink(item.path, () => {
//                     console.log('deleted ' + item.path);
//               });
//             }) 
//         }
        
//       return res.status(422).json({
//         errors: extractErrors(errors),
//         status: 422,
//         message: 'Unprocessable Entity'
//       });
//     }
//     let photos = []; 
//     req.files.map((item, index) => {            
//         if(item.fieldname == 'photos'){
//             photos.push(savedDestination + item.filename);
//         }
//         if(item.fieldname == 'mainPhoto'){
          
//             req.body.mainPhoto = savedDestination + item.filename;
//         }
//       });
//     req.body.photos = photos;
//     return next();
//   }


  }
  module.exports = HousingValidator;