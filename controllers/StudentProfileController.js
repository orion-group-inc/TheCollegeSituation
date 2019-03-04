//Importing Advice Model
const StudentProfile = require("../models/StudentProfile");

class StudentProfileController {
  /**
   * @api {get} /studentProfile/allProfiles Get all houses
   * @apiName StudentProfiles
   * @apiGroup Student
   */

  //getting all Profiles
  static async getProfiles(req, res) {
    StudentProfile.find()
      .populate("authInfo")
      .then(allProfiles => {
        res.status(200).send({
          success: true,
          data: allProfiles
        });
      })
      .catch(err => {
        res.status(400).send("An error has occoured", err.message);
      });
  }

  //getting a single profile
  static async getSingleProfile(req, res) {
    let id = req.params.id;
    StudentProfile.findOne({ _id: id })
      .populate("authInfo")
      .then(profileResult => {
        if (profileResult) {
          res.status(200).send({
            success: true,
            data: profileResult
          });
        } else {
          res.status(200).send({
            success: false
          });
        }
      })
      .catch(err => {
        res.status(400).send("An error has occoured", err.message);
      });
  }

  static async createProfile(req, res) {
    let studentprofile = new StudentProfile({
      dob: req.body.dob,
      authInfo: req.body.authInfo,
      gender: req.body.gender,
      academicLevel: req.body.academicLevel,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country
    });

    studentprofile
      .save()
      .then(newProfile => {
        if (newProfile) {
          res.status(200).send({
            success: true,
            data: newProfile
          });
        } else {
          res.status(400).send({
            success: false,
            error: "Unable to create profile"
          });
        }
      })
      .catch(err => {
        res.status(400).send("Oops, an error has occoured", err.message);
      });
  }
}

module.exports = StudentProfileController;
