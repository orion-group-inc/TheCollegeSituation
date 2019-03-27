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
  /**
   * @api {post} /scholarship/createScholarship Create new Scholarship
   * @apiName CreateScholarship
   * @apiGroup Scholarships
   * @apiParam {String} title title of the scholarship
   * @apiParam {String} photo image of the scholarship
   * @apiParam {String} dueDate 
   * @apiParam {Number} amount
   * @apiParam {String} state
   * @apiParam {String} status
   * @apiParam {String} educationalLevel
   * @apiParam {String} description
   * @apiParam {String} featured
   * @apiParam {String} link
   */
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

  //getting single scholarshipwih ID
  /**
   * @api {get} /scholarship/getSingleScholarship/:id Get a single scholarship with id
   * @apiName GetSingleScholarship
   * @apiGroup Scholarships
   */
  static async getSingleScholarship(req, res) {
    let id = req.params.id;
    Scholarship.findOne({ _id: id })

      .then(singleScholarship => {
        res.status(200).send({
          success: true,
          data: singleScholarship
        });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }
}

module.exports = ScholarshipController;
