//Importing School Model
const Student = require("./../models/School");

class SchoolController {
    /**
     * @api {get} /school/allSchools Get students information
     * @apiName GetSchools
     * @apiGroup Sschool
     */
    static async getSchools(req, res) {
        Student.find().then(allSchools => {
            res.status(200).send({
                success: true,
                data: allSchools
            });
        });
    }
}

module.exports = SchoolController;