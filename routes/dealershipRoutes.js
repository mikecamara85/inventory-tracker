const express = require("express");
const router = express.Router();
const dealershipController = require("../controllers/dealershipController");

console.log("dealership routes reached");

router.post("/create-dealership", dealershipController.createDealership);

module.exports = router;
