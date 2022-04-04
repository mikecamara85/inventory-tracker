const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

console.log("user routes reached");

router.post("/create-user", userController.createUser);
router.post("/login", authController.login);
router.post("/checkJWT", authController.checkJWT);

module.exports = router;
