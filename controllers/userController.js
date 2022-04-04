const User = require("../models/User");
const Dealership = require("../models/Dealership");
const authController = require("./authController");

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    // console.log("New User Created: ", newUser);
    newUser.password = null;

    const dealership = await Dealership.findOne({ _id: req.body.dealership });
    dealership.users.push(newUser);
    await dealership.save();
    authController.createSendToken(newUser, 201, req, res);
  } catch (error) {
    console.log("NEW USER ERROR", error);
    res.status(400).send({
      success: false,
    });
  }
};
