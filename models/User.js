const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A User must have a name!"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "A User must have a username"],
    },
    password: {
      type: String,
      required: [true, "a User must have a passWord"],
    },
    dealership: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A User must belong to a dealership!"],
    },
  },
  { timestamps: true }
);

// need a middleware here that will populate the correct users on save

const User = mongoose.model("User", userSchema);

module.exports = User;
