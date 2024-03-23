const Employee = require("../models/SignupModel");
// Controller function for creating a person
exports.createEmployee = (req, res) => {
    // Save the image path or unique name to the database
    let id = req.body.id;
    console.log("id=",id);
    const employee = new Employee({
        name: req.body.name,
        userID: req.body.userID,
        password: req.body.password,
        employeeID: req.body.employeeID,
        userID: req.body.userID,
        phoneNO: req.body.phoneNO,
        designation: req.body.designation,
      });
    
      employee.save()
        .then((savedEmployee) => {
          res.json({ id: savedEmployee._id, status: true, message: "Employee Registered Successfully" });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error in Registration');
        });
  };