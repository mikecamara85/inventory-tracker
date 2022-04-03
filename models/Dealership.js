const mongoose = require("mongoose");

const dealershipSchema = mongoose.Schema(
  {
    name: String,
    users: [mongoose.Schema.Types.ObjectId],
    vehicles: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
);

// need a middleware here that will populate the correct users on save

const Dealership = mongoose.model("Dealership", dealershipSchema);

module.exports = Dealership;
