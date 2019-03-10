const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Student = require("./../models/Student");
const StudentProfile = require("./../models/StudentProfile");

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

    //Create New Student (Work on the Mongo Db stuff here..)
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    let student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    });

    let user = await Student.findOne({ email: req.body.email });
        if (user && user.email == req.body.email) {

          res.status(400).send({ success: false, message: 'A user with this email already exists'});
        } else {

            //proceed to create account here
          let newStudent = await student.save();
              
          let profile = new StudentProfile({
            authInfo: newStudent._id
          });
          
          let newProfile = await profile.save();
          student.profile = newProfile;
          await student.save();
          
          let token = jwt.sign(
            { profile: newProfile, user: newStudent },process.env.JWT_SECRET,{expiresIn: 86400}
          );
          res.status(200).send({success: true, token, user: newStudent});
    }
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
    let user = await Student.findOne({ email }).populate('userSubscription').populate('profile').exec();
    
    if(user){
      let isPasswordValid = bcrypt.compareSync(password, user.password);
        if (isPasswordValid) {
          let token = jwt.sign(
            { user },
            process.env.JWT_SECRET,
            {
              expiresIn: 86400 // expires in 24 hours
            }
          );
          
          res.status(200).send({ auth: true, token, user, loggedIn: true });

        } else {
          res.status(401).send({ auth: false, token: null, loggedIn: false });
        }
    }else{
      res.status(400).send({message: 'User not found'})
    }
  }

  //Get User Profile

  static async getStudentProfile(req, res) {
    
  }
}

module.exports = AuthController;
