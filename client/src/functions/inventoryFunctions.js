import axios from "axios";
import { axiosConfig } from "../util/axiosConfig";

export const loadInventory = async (setInventoryLoaded, setVehicleData) => {
  try {
    const res = await axios.post(
      "/api/v1/vehicle/get-vehicle-data",
      {},
      axiosConfig
    );

    if (res && res.data && res.data.success && res.data.vehicleData) {
      setVehicleData(res.data.vehicleData);

      //   console.log(res.data.vehicleData);

      setInventoryLoaded(true);
      return true;
    } else {
      alert("could not get vehicle data from database...");
      return false;
    }
  } catch (error) {
    console.log("inventoryFunctions.loadInventory: ", error.message);
  }
};
