const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("./../models/Student");

class AuthController {
  /**
   * @api {post} /student/register Register Student
   * @apiName Register Student
   * @apiGroup Student
   * @apiParam {String} firstName student's firstname
   * @apiParam {String} lastName student's last name
   * @apiParam {String} email student's email
   * @apiParam {String} password student's password
   * @apiParam {String} birthday student's birthday
   */
  static async registerStudent(req, res) {
    //declaring variables
    let email = req.body.email;
    //Create New Student (Work on the Mongo Db stuff here..)
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    let student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
      password: hashedPassword
    });

    // let email = req.body.email;
    Student.findOne({ email })
      .then(user => {
          console.log(user)
        if (user.email == email) {
          res.status(400).send("A user with this email already exists");
          console.log("A user already exit with this email");
        } else {
          //proceed to create account here
          student
            .save()
            .then(newStudent => {
              let token = jwt.sign(
                { id: newStudent._id },
                process.env.JWT_SECRET,
                {
                  expiresIn: 86400 // expires in 24 hours
                }
              );
              res.status(200).send({
                success: true,
                token,
                newStudent
              });
            })
            .catch(err => {
              res
                .status(400)
                .send("Could not create new student :(", err.message);
            });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("An error occoured", err.message);
      });
  }

  /**
   * @api {post} /student/login Login Student
   * @apiName Login Student
   * @apiGroup Student
   * @apiParam {String} email student's email
   * @apiParam {String} password student's password
   */
  static async loginStudent(req, res) {
    const { email, password } = req.body;
    Student.findOne({ email })
      .then(user => {
        let isPasswordValid = bcrypt.compareSync(password, user.password);
        if (isPasswordValid) {
          let token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: 86400 // expires in 24 hours
            }
          );
          res.send({ auth: true, token, user });
        } else {
          res.status(401).send({ auth: false, token: null });
        }
      })
      .catch(err => {
        res.send(err);
      });
  }
}

module.exports = AuthController;
