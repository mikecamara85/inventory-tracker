const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

exports.deleteVehicle = async (req, res, next) => {
  try {
    console.log("hello from the server");
    if (!req.body.answer) {
      throw new Error("did not receive answer from front end");
    }

    // here, the req is also going to have to contain the dealership and the user
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

    const user = await User.findById(req.body.userId);

    await Vehicle.create({
      year: receivedVehicle.enteredYear,
      make: receivedVehicle.enteredMake,
      model: receivedVehicle.enteredModel,
      stock: receivedVehicle.enteredStock,
      bodyShop: receivedVehicle.enteredBodyShop,
      service: receivedVehicle.enteredService,
      tech: receivedVehicle.enteredTech,
      detail: receivedVehicle.enteredDetail,
      photos: receivedVehicle.enteredPhotos,
      description: receivedVehicle.enteredDescription,
      gas: receivedVehicle.enteredGas === "has-gas" ? new Date() : null,
      stickers: receivedVehicle.enteredStickers,
      priceTag: receivedVehicle.enteredPriceTag,
      isSold: receivedVehicle.enteredIsSold,
      notes: receivedVehicle.notes,
      dealership: user.dealership,
      notes: [
        {
          name: user.name,
          createdAt: new Date(),
          user: user._id,
          body: "Vehicle Created!",
        },
      ],
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

    let user = null;

    if (!req.user) {
      throw new Error("auth failed");
    } else {
      user = await User.findById(req.user._id).catch((err) => {
        console.log("could not find user");
      });
    }

    if (req.body.bodyShop) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        bodyShop: req.body.bodyShop,
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Updated body shop status: ${req.body.bodyShop}`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.service) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        service: req.body.service,
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Updated service status: ${req.body.service}`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.tech) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        tech: req.body.tech,
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Updated tech status: ${req.body.tech}`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.detail) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        detail: req.body.detail,
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Updated detail status: ${req.body.detail}`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.photos) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        photos: req.body.photos,
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Updated photos status: ${req.body.photos}`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.description) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        description: req.body.description,
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Updated description status: ${req.body.description}`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.gas) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        gas: new Date(),
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Refilled gas`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.stickers) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        stickers: req.body.stickers,
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Updated stickers status: ${req.body.stickers}`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.priceTag) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        priceTag: req.body.priceTag,
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Updated price tag status: ${req.body.priceTag}`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.isSold) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        isSold: req.body.isSold,
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: `Updated deposit status: ${req.body.isSold}`,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    } else if (req.body.noteBody) {
      await Vehicle.findByIdAndUpdate(req.body.currentVehicle._id, {
        lastAccessed: new Date(),
        notes: [
          ...req.body.currentVehicle.notes,
          {
            name: user.name,
            body: req.body.noteBody,
            user: user._id,
            createdAt: new Date(),
          },
        ],
      });
    }

    const updatedVehicle = await Vehicle.findById(req.body.currentVehicle._id);

    res.status(200).send({
      success: true,
      vehicle: updatedVehicle,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};
