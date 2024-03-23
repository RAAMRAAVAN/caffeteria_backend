// get schema instance
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create schema
// Create a Mongoose schema and model for persons
// Create a Mongoose schema and model for persons
const signupSchema = new Schema({
  name: String,
  userID: String,
  password: String,
  employeeID: String,
  userID: String,
  phoneNO: String,
  designation: String,
});

const Employee = mongoose.model('Employee', signupSchema);
// export model
module.exports = Employee