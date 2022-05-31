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
      // SEVERITY CALCULATIONS

      const localVehicleData = res.data.vehicleData;

      localVehicleData.forEach((v) => {
        if (v.service === "not-done") {
          if (!v.isSold) {
            v.severity = "danger";
          } else {
            v.severity = "defcon";
          }
        } else {
          v.severity = "warning";
        }

        if (
          v.service !== "not-done" &&
          v.bodyShop !== "not-done" &&
          v.detail !== "not-done" &&
          v.pictures.length > 1 &&
          v.description !== "not-done" &&
          v.stickers !== "not-done" &&
          v.priceTag !== "not-done"
        ) {
          v.severity = "ready";
        }
      });

      setVehicleData(res.data.vehicleData);

      // console.log(res.data.vehicleData);

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
