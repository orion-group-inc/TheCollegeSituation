//Importing scholarship Model
const Scholarship = require("./../models/Scholarship");

class ScholarshipController {
  /**
   * @api {get} /scholarship/allScholarships Get a list of scholarships
   * @apiName GetScholarships
   * @apiGroup Scholarships
   */
  static async getAllScholarships(req, res) {
    Scholarship.find().then(allScholarships => {
      res.status(200).send({
        success: true,
        data: allScholarships
      });
    });
  }

  //creating scholarship

  static async createScholarship(req, res) {
    let scholarship = new Scholarship({
      title: req.body.title,
      photo: req.body.photo,
      dueDate: req.body.dueDate,
      amount: req.body.amount,
      state: req.body.state,
      status: req.body.status,
      educationalLevel: req.body.educationalLevel,
      description: req.body.description,
      featured: req.body.featured,
      link: req.body.link
    });

    scholarship
      .save()
      .then(newScholarship => {
        res.status(200).send({ success: true, data: newScholarship });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }
}

module.exports = ScholarshipController;