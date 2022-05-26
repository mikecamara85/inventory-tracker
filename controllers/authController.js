const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const add = require("date-fns/add");
const Dealership = require("../models/Dealership");
const User = require("../models/User");

const signToken = (id) => {
  // console.log("authController.signToken: ", typeof id);

  const newJWT = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: add(new Date(), {
      days: 2,
    }).getTime(),
  });

  return newJWT;
};

exports.createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: add(new Date(), {
      days: `${process.env.JWT_COOKIE_EXPIRES_IN}`,
    }),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // remove the password from the output going to the browser
  // Revisit this and remove more of the browser output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // console.log("received: ", username);

    // 2: Check if email and password exist

    if (!username || !password) {
      throw new Error("username and/or password not found");
    }

    // 3: Check if the user exists, password is correct, and get user phone number
    // come back to this and implement security for consecutive failed login attempts

    const user = await User.findOne({ username: username })
      .select("password")
      .select("username")
      .select("dealership")
      .catch((err, result) => {
        if (err) {
          throw new Error(`could not find username ${username} in database`);
        } else {
          return result;
        }
      });

    if (!user) {
      throw new Error(`could not find username ${username} in database`);
    }

    const correctPassword = await user.correctPassword(password, user.password);

    if (!correctPassword) {
      throw new Error(`password ${password} is incorrect...`);
    } else {
      // console.log(user);

      const dealership = await Dealership.findById(user.dealership);

      if (!dealership) {
        throw new Error("dealership of this user does not exist");
      }

      if (!dealership.users.includes(user._id)) {
        throw new Error("this user does not belong to this dealership");
      }

      this.createSendToken(user, 200, req, res);
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      success: false,
    });
  }
};

exports.checkJWT = async (req, res, next) => {
  try {
    // 1 - Get token if it exists
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // console.log("found in auth headers");
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      // console.log("found in cookies");
      token = req.cookies.jwt;
    }

    if (token) {
      // 2 - Verify token

      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      if (!decoded) {
        throw new Error("could not decode jwt");
      }

      // 3 - Check if user still exists
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        throw new Error("could not get user from decoded jwt");
      }

      // 4 - Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        throw new Error(
          "authController.checkJWT: User recently changed password..."
        );
      }

      res.status(200).json({
        success: true,
        token,
        userId: currentUser._id,
      });
    } else {
      throw new Error("token not found...");
    }
  } catch (error) {
    console.log("authController.checkJWT: ", error.message);
    res.status(401).json({
      success: false,
    });
  }
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  res.status(200).json({ success: true });
};

exports.protect = async (req, res, next) => {
  try {
    // 1: Get token if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      // console.log("authController.protect: User not logged in...");
    }

    // 2: Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3: Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      // console.log("authController.protect: User not found...");
    }

    // // 4: Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   // console.log("authController.protect: User recently changed password...");
    // }

    // 5: ACCESS GRANTED: Attach user to request
    req.user = currentUser;
    res.locals.user = currentUser;

    return next();
  } catch (error) {
    console.log("authController.protect: ", error.message);
    res.status(401).send({
      success: false,
    });
  }
};
