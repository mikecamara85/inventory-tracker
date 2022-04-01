const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zhs2r.mongodb.net/inventory-tracker?retryWrites=true&w=majority`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "database connection error:"));
//
db.once("open", () => {
  console.log("database connection successful...");
});

module.exports = db;
