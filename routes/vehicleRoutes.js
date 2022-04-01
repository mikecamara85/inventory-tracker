const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

console.log("vehicle routes reached");

router.post("/get-vehicle-data", vehicleController.getVehicleData);

module.exports = router;
