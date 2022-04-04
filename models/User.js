const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    dealership: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A User must belong to a dealership!"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) {
    return next();
  }
  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT));
  this.password = await bcrypt.hash(this.password, salt);
  // Delete passwordConfirm field
  next();
});

userSchema.methods.correctPassword = async function (
  candidatepassword,
  userpassword
) {
  return await bcrypt.compare(candidatepassword, userpassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // false means NOT changed
  return false;
};

// need a middleware here that will populate the correct users on save

const User = mongoose.model("User", userSchema);

module.exports = User;
