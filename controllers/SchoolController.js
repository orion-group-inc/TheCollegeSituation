//Importing School Model
const School = require("./../models/School");

class SchoolController {
  /**
   * @api {get} /school/allSchools Get school information
   * @apiName GetSchools
   * @apiGroup School
   * @apiParam {String} name name of school
   * @apiParam {String} desc description of school
   * @apiParam {String} population total school enrollment
   
   */
  static async getSchools(req, res) {
    School.find().then(allSchools => {
      res.status(200).send({
        success: true,
        data: allSchools
      });
    });
  }

  /**
   * @api {post} /school/createSchool Create a new school
   * @apiName CreateSchool
   * @apiGroup School
   */
  static async createSchool(req, res) {
    let school = new School({
      name: req.body.name,
      desc: req.body.desc,
      population: req.body.population,
      avgTuitionInternational: req.body.avgTuitionInternational,
      avgTuitionLocal: req.body.avgTuitionLocal,
      website: req.body.website,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      graduationRate: req.body.graduationRate,
      acceptanceRate: req.body.acceptanceRate,
      generalPhone: req.body.generalPhone,
      intlAdmissionPhone: req.body.intlAdmissionPhone
    });

    school.save().then(newSchool => {
      res.status(200).send({ success: true, data: newSchool });
    });
  }
}

module.exports = SchoolController;
