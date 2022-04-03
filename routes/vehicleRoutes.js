const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

console.log("vehicle routes reached");

router.post("/delete-vehicle", vehicleController.deleteVehicle);
router.post("/enter-vehicle", vehicleController.enterVehicle);
router.post("/get-vehicle-data", vehicleController.getVehicleData);
router.post("/update-vehicle", vehicleController.updateVehicle);

module.exports = router;
