const dbconfig = require('./dbconfig');
const mongoose = require('mongoose');
//===========================================
const DB_URL = dbconfig.dbEnv == 'development' ? dbconfig.development : dbconfig.production;

//===========================================
//connecting to the Mongo Db Server
//===========================================
mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Successfully connected to Mongo DB!");
  })
  .catch(err => {
    console.log("Could not connect to MongoDB " + err.message);
  });

  module.export = mongoose;