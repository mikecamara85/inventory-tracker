const Dealership = require("../models/Dealership");

exports.createDealership = async (req, res, next) => {
  try {
    const newDealership = await Dealership.create(req.body).catch((err) => {
      throw new Error(err);
    });

    // console.log(newDealership);

    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log("NEW DEALERSHIP ERROR", error);
    res.status(400).send({
      success: false,
    });
  }
};
