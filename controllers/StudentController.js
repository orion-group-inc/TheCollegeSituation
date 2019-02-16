//Importing student Model
const Student = require("./../models/Student");

class StudentController{
    /**
     * @api {get} /student/registeredStudents Get students information
     * @apiName GetStudents
     * @apiGroup Student
     */
    static async getRegisteredStudents(req, res) {
        Student.find().then(allRegisteredStudents => {
            res.status(200).send({
              success: true,
              data: allRegisteredStudents
            });
          });
    }
}

module.exports = StudentController;