//Importing School Model
const School = require("./../models/School");

class SchoolController {
  /**
   * @api {get} /school/allSchools Get school information
   * @apiName GetSchools
   * @apiGroup School
   */
  static async getSchools(req, res) {
    Student.find().then(allSchools => {
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
    school = new School({
      name: req.body.name,
      desc: req.body.desc,
      population: req.body.population,
      avgTuitionInternational: req.body.avgTuitionInternational,
      avgTuitionLocal: req.body.avgTuitionLocal,
      website: req.body.website,
      address: req.body.address,
      graduationRate: req.body.graduationRate,
      acceptanceRate: req.body.acceptanceRate,
      generalPhone: req.body.generalPhone,
      intlAdmissionPhone: req.body.intlAdmissionPhone
    });

    school.save().then(newSchool => {
      res
        .status(200)
        .send({ success: true, data: newSchool })
        .catch(err => {
          res.status(400).send("Could not create school", err);
        });
    });
  }
}

module.exports = SchoolController;
