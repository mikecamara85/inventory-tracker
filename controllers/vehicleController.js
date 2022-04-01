const Vehicle = require("../models/Vehicle");

exports.getVehicleData = async (req, res, next) => {
  try {
    const vehicleData = await Vehicle.find();

    res.status(200).send({
      success: true,
      vehicleData,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};
