
const Student = require("./../models/Student");

class StudentController{

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