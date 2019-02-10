let express = require("express");
let bodyParser = require("body-parser");

let app = express();
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<center> <br/><br/><h1>Welcome to the College Situation</h1> <br/> <small>© Favour Ori 2019</small></center>"
    );
});

app.get("/api/2019/landing", (req, res) => {
  res
    .status(200)
    .send(
      "<br/><center><h3>TCS 2019</h3> <p>The College Situation API Version 1.0</p></center>"
    );
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
