const Vehicle = require("../models/Vehicle");

exports.deleteVehicle = async (req, res, next) => {
  try {
    console.log("hello from the server");
    if (!req.body.answer) {
      throw new Error("did not receive answer from front end");
    }

    const vehicle = await Vehicle.find({ stock: req.body.answer });

    if (!vehicle[0]) {
      console.log("not found in database");
      throw new Error("stock not found in database");
    } else if (vehicle[1]) {
      console.log(
        "this vehicle has a duplicate in the database - find out how this happened"
      );
    } else {
      console.log("found in database");
      const deleted = await Vehicle.findByIdAndDelete(vehicle[0]._id);

      if (deleted) {
        res.status(200).send({
          success: true,
        });
      } else {
        throw new Error("could not delete from database");
      }
    }
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};
//
exports.enterVehicle = async (req, res, next) => {
  try {
    if (!req.body.vehicleToEnter) {
      throw new Error("did not receive vehicle to enter from front end");
    }

    const receivedVehicle = req.body.vehicleToEnter;

    await Vehicle.create({
      year: receivedVehicle.enteredYear,
      make: receivedVehicle.enteredMake,
      model: receivedVehicle.enteredModel,
      stock: receivedVehicle.enteredStock,
      bodyShop: receivedVehicle.enteredBodyShop,
      majorService: receivedVehicle.enteredMajorService,
      detail: receivedVehicle.enteredDetail,
      photos: receivedVehicle.enteredPhotos,
      description: receivedVehicle.enteredDescription,
      gas: receivedVehicle.enteredGas,
      safetyCheck: receivedVehicle.enteredSafetyCheck,
      stickers: receivedVehicle.enteredStickers,
      priceTag: receivedVehicle.enteredPriceTag,
      isSold: receivedVehicle.enteredIsSold,
      notes: receivedVehicle.notes,
    }).catch((err) => {
      console.log(err);
    });

    res.status(200).send({
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};
//
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
//
exports.updateVehicle = async (req, res, next) => {
  try {
    if (!req.body.currentVehicle) {
      throw new Error("did not receive vehicle from front end");
    }

    if (req.body.bodyShop) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        bodyShop: req.body.bodyShop,
      });
    } else if (req.body.majorService) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        majorService: req.body.majorService,
      });
    } else if (req.body.detail) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        detail: req.body.detail,
      });
    } else if (req.body.photos) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        photos: req.body.photos,
      });
    } else if (req.body.description) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        description: req.body.description,
      });
    } else if (req.body.gas) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        gas: req.body.gas,
      });
    } else if (req.body.safetyCheck) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        safetyCheck: req.body.safetyCheck,
      });
    } else if (req.body.stickers) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        stickers: req.body.stickers,
      });
    } else if (req.body.priceTag) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        priceTag: req.body.priceTag,
      });
    } else if (req.body.isSold) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        isSold: req.body.isSold,
      });
    }

    res.status(200).send({
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};
