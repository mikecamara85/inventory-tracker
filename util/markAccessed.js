const mongoose = require("mongoose");
const dotenv = require('dotenv');
const Vehicle = require('../models/Vehicle');

dotenv.config({ path: "../config.env" });

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zhs2r.mongodb.net/inventory-tracker?retryWrites=true&w=majority`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "database connection error:"));
//
db.once("open", () => {
  console.log("database connection successful...");
});



(async function(){
    const allVehicles = await Vehicle.find();


    allVehicles.forEach(async (v, index) => {
        
        setTimeout(async () => {
            
            await Vehicle.findByIdAndUpdate(v._id, {
                lastAccessed: new Date()
            })
            
        }, 1000);


        console.log(`fixed ${index + 1} vehicles`);
    })

    
})();




