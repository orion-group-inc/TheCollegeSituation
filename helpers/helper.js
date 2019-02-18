/* istanbul ignore file */

class Helpers {
  static extractErrors(errors) {
    const validationErrors = {};
    errors.map(error => {
        if(validationErrors.hasOwnProperty(error.param)){
            validationErrors[error.param].push(error.msg)
        }else{
            validationErrors[error.param] = [error.msg];
        }
        return validationErrors;
    });
    return validationErrors;
  }

  static isANumber(num) {
    return Number.isInteger(Number(num));
  }


  static uploadImage(req) {
    let response;
    if (req.file) {
      const file = dataUri(req).content;
      response = uploader.upload(file).then(result => result.secure_url).catch((err) => {
        if (err) {
          return false;
        }
      });
      return response;
    } return false;
  }
}

module.exports = Helpers;