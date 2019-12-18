//Importing School Model
const School = require("./../models/School");
const TempSchool = require("./../models/test/TempSchool");
const base = 'https://collegesituation.firebrains.xyz/';

class SchoolController {
  /**
   * @api {get} /school/allSchools Get school information
   * @apiName GetSchools
   * @apiGroup School
   */
  static async getSchools(req, res) {
    School.find().then(allSchools => {
      allSchools = allSchools.map((item, index) => {
        item.photo = base+item.photo;
        return item;
      });
      res.status(200).send({
        success: true,
        count: allSchools.length,
        data: allSchools
      });
    });
  }

  /**
   * @api {get} /school/allTempSchools Get Temp school information
   * @apiName GetTempSchools
   * @apiGroup TempSchool
   */

  static async getTempSchools(req, res) {
    TempSchool.find().then(allTempSchools => {
      res.status(200).send({
        success: true,
        data: allTempSchools
      });
    });
  }

  /**
   * @api {post} /school/createSchool Create a new school
   * @apiName CreateSchool
   * @apiGroup School
   * @apiParam {String} _id Unique ID of school
   * @apiParam {String} isActive status of school in app
   * @apiParam {String} name name of school
   * @apiParam {String} desc description of school
   * @apiParam {String} population total school enrollment
   * @apiParam {String} avgTuitionInternational tuition for international students
   * @apiParam {String} avgTuitionLocal tuition for American students
   * @apiParam {String} website official school website
   * @apiParam {String} address school address
   * @apiParam {String} state state where school is located
   * @apiParam {String} city city where school is located
   * @apiParam {String} zip zip code of  where school is located
   * @apiParam {String} graduationRate graduation rate
   * @apiParam {String} acceptanceRate acceptance rate
   * @apiParam {String} generalPhone General admission Phone
   * @apiParam {String} intlAdmissionPhone International admission Phone
   * @apiParam {String} generalPhone General admission Phone
   * @apiParam {String} dateOfCreation date of creation
   * @apiParam {Array} photo Photo of school
   *
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
      zip: req.body.zip,
      graduationRate: req.body.graduationRate,
      acceptanceRate: req.body.acceptanceRate,
      generalPhone: req.body.generalPhone,
      intlAdmissionPhone: req.body.intlAdmissionPhone,
      photo: req.body.photo,
      courses: req.body.courses,
      scholarships: req.body.scholarships,
      category: req.body.category,
      avgSAT: req.body.avgSAT,
      avgACT: req.body.avgACT,
      type: req.body.type,
      aboutLocation: req.body.aboutLocation,
      admissions: req.body.admissions,
      academics: req.body.academics,
      fastFacts: req.body.fastFacts,
      email: req.body.email,
      applicationFee: req.body.applicationFee
    });

    school.save().then(newSchool => {
      res.status(200).send({ success: true, data: newSchool });
    });
  }

  /**
   * @api {post} /school/createTempSchool Create a temporary school until approved
   * @apiName CreateTestSchool
   * @apiGroup TempSchool
   * @apiParam {String} _id Unique ID of school
   * @apiParam {String} isActive status of school in app
   * @apiParam {String} name name of school
   * @apiParam {String} desc description of school
   * @apiParam {String} population total school enrollment
   * @apiParam {String} avgTuitionInternational tuition for international students
   * @apiParam {String} avgTuitionLocal tuition for American students
   * @apiParam {String} website official school website
   * @apiParam {String} address school address
   * @apiParam {String} state state where school is located
   * @apiParam {String} city city where school is located
   * @apiParam {String} zip zip code of  where school is located
   * @apiParam {String} graduationRate graduation rate
   * @apiParam {String} acceptanceRate acceptance rate
   * @apiParam {String} generalPhone General admission Phone
   * @apiParam {String} intlAdmissionPhone International admission Phone
   * @apiParam {String} generalPhone General admission Phone
   * @apiParam {String} dateOfCreation date of creation
   * @apiParam {Array} photos Array of school photos
   *
   */
  static async createTempSchool(req, res) {
    let school = new TempSchool({
      name: req.body.name,
      desc: req.body.desc,
      population: req.body.population,
      avgTuitionInternational: req.body.avgTuitionInternational,
      avgTuitionLocal: req.body.avgTuitionLocal,
      website: req.body.website,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      zip: req.body.zip,
      graduationRate: req.body.graduationRate,
      acceptanceRate: req.body.acceptanceRate,
      generalPhone: req.body.generalPhone,
      intlAdmissionPhone: req.body.intlAdmissionPhone,
      photo: req.body.photo,
      courses: req.body.courses,
      scholarships: req.body.scholarships,
      category: req.body.category,
      avgSAT: req.body.avgSAT,
      avgACT: req.body.avgACT,
      type: req.body.type,
      aboutLocation: req.body.aboutLocation,
      admissions: req.body.admissions,
      academics: req.body.academics,
      fastFacts: req.body.fastFacts,
      email: req.body.email
    });

    school
      .save()
      .then(newSchool => {
        newSchool = newSchool.map((item, index) => {
          item.photo = base+item.photo;
          return item;
        })
        res.status(200).send({ success: true, data: newSchool });
      })
      .catch(err => {
        res.status(400).send("Could not save school", err.message);
      });
  }

  static async migrateSchool(req, res) {
    TempSchool.findOne({ _id: req.params.id })
      .then(currentSchool => {
        let current = currentSchool.toObject();
        delete current["_id"];
        delete current["migrated"];
        delete current["dateOfCreation"];
        delete current["__v"];

        console.log(current);
        new School(current)
          .save()
          .then(mainSchool => {
            res.status(200).send({
              success: true,
              data: mainSchool,
              message: "Migration Successful"
            });
          })
          .catch(error => {
            console.log(error.message);
          });
      })
      .catch(err => {
        res.status(400).send("Could not save school", err.message);
      });
  }

  //Endpoint to search for a single school by name

  /**
   * @api {get} /school/searchSchoolByName Search for schools by their names
   * @apiName searchSchoolByName
   * @apiGroup School
   */
  static async searchSchoolByName(req, res) {
    let schoolName = req.body.schoolName
    School.findOne({ name: schoolName})
      .then(result => {
        res.status(200).send({
          success: true,
          data: result
        });
      })
      .catch(err => {
        res.status(400).send("School not found", err.message);
      });
  }



//Endpoint to search for schools by city

  /**
     * @api {get} /school/searchSchoolByCity Search for schools by city
     * @apiName searchSchoolByCity
     * @apiGroup School
     */
  static async searchSchoolByCity(req, res) {
    let cityName = req.body.cityName
    School.find({ city: cityName })
      .then(result => {
       
        if(result!=null){
          res.status(200).send({
            success: true,
            data: result
          });
        }else{
          res.status(200).send({
            success: false,
            message: "School / city not found!"
            
          });
        }
      })
      .catch(err => {
        res.status(400).send("Schools / City not found", err.message);
      });
  }








}

module.exports = SchoolController;
