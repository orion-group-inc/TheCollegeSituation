let express = require('express')
let routes = express.Router();

routes.get('/registeredStudents', (req, res)=>{
    res.status(200).send("<h3>All Registered Students:</h3>")
})



routes.post('/register', (req, res)=>{
res.status(200).send("<h3>New students will signup here!</h3>")
})


//exporting Route
module.exports = routes;