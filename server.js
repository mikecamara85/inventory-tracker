const path = require("path");
const express = require("express");
require("dotenv").config({
  path: path.resolve(process.cwd(), "config.env"),
});
require("./util/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const vehicleRoutes = require("./routes/vehicleRoutes");
// const emailRoutes = require("./routes/emailRoutes");

// Init Middleware
app.use(express.json({ inflate: false, limit: "5mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// come back to this to check configuration
app.use(cors());

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500, // limit each IP to 100 requests per windowMs
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/api/v1/vehicle", vehicleRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
