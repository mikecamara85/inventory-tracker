const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const authController = require("../controllers/authController");

console.log("vehicle routes reached");

router.post(
  "/delete-vehicle",
  authController.protect,
  vehicleController.deleteVehicle
);
router.post(
  "/enter-vehicle",
  authController.protect,
  vehicleController.enterVehicle
);
router.post(
  "/get-vehicle-data",
  authController.protect,
  vehicleController.getVehicleData
);
router.post(
  "/update-vehicle",
  authController.protect,
  vehicleController.updateVehicle
);

module.exports = router;
