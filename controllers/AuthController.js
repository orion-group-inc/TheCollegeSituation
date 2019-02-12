
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require("./../models/Student");

class AuthController{

    static async registerStudent(req, res) {
        //Create New Student (Work on the Mongo Db stuff here..)
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        let student = new Student({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthday: req.body.birthday,
            password: hashedPassword
        });

        student
            .save()
            .then(newStudent => {
            let token = jwt.sign({ id: newStudent._id, email: newStudent.email }, process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                success: true,
                token
            });
            })
            .catch(err => {
            res.status(400).send("Could not create new student :(", err.message);
            });
    }

    static async loginStudent(req, res) {
        const {email, password} = req.body;
            Student.findOne({email})
                .then(user => {
                    let isPasswordValid = bcrypt.compareSync(password, user.password);
                    if(isPasswordValid){
                        res.send(user);
                    }else{
                        res.status(401).send({auth: false, token: null});
                    } 
                })
                .catch(err =>{
                    res.send(err);
                })
    }
  
}

module.exports = AuthController;