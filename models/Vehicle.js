const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
  {
    dealership: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A vehicle must belong to a dealership!"],
    },
    year: {
      type: String,
      required: [true, "A vehicle must have a model year!"],
    },
    make: {
      type: String,
      required: [true, "A vehicle must have a make!"],
    },
    model: {
      type: String,
      required: [true, "A vehicle must have a model!"],
    },
    stock: {
      type: String,
      required: [true, "A vehicle must have a stock number!"],
      lowercase: true,
    },
    bodyShop: {
      type: String,
      default: "not-needed",
    },
    service: {
      type: String,
      default: "not-done",
    },
    tech: {
      type: String,
      default: "select",
    },
    detail: {
      type: String,
      default: "not-done",
    },
    photos: {
      type: String,
      default: "not-done",
    },
    description: {
      type: String,
      default: "not-done",
    },
    gas: {
      type: Date,
      default: null,
    },
    stickers: {
      type: String,
      default: "not-done",
    },
    priceTag: {
      type: String,
      default: "not-done",
    },
    severity: {
      type: String,
      default: "danger",
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: Array,
      default: [
        {
          name: "Michael Camara",
          createdAt: new Date(),
          body: "this note was only created to prevent an Error...",
          user: mongoose.Schema.Types.ObjectId,
        },
      ],
    },
    lastAccessed: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

// need a middleware here that will populate the correct users on save

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
