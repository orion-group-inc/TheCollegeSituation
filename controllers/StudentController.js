//Importing student Model
const Student = require("./../models/Student");
const UserSubscription = require("./../models/UserSubscription");
const moment = require("moment");

class StudentController {
  /**
   * @api {get} /student/registeredStudents Get students information
   * @apiName GetStudents
   * @apiGroup Student
   */
  static async getRegisteredStudents(req, res) {
    Student.find().then(allRegisteredStudents => {
      res.status(200).send({
        success: true,
        data: allRegisteredStudents,
        count: allRegisteredStudents.length
      });
    });
  }

  /**
   * @api {get} /student/subscription/:id Get student Subscription Detail
   * @apiName GetStudentSubscription
   * @apiGroup Student
   */
  static async getStudentSubscription(req, res) {
    Student.findOne({ _id: req.params.id })
      .populate("userSubscription")
      .then(student => {
        if (student) {
          if (student.userSubscription) {
            let remainingDays = moment(student.userSubscription.endDate).diff(
              moment(),
              "days"
            );
            let data = {
              user: req.params.id,
              expired: remainingDays < 1,
              remainingDays,
              startDate: student.userSubscription.startDate,
              endDate: student.userSubscription.endDate,
              hasAppliedFreeSubscription: student.hasAppliedFreeSubscription
            };
            res.status(200).send({
              success: true,
              data
            });
          } else {
            res.status(400).send({
              success: false,
              message: "user has no subscription yet"
            });
          }
        } else {
          res.status(400).send({
            success: false,
            message: "student does not exist"
          });
        }
      })
      .catch(err => {
        res.status(400).send(err);
        console.log(err);
      });
  }
}

module.exports = StudentController;
