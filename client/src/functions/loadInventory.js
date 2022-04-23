import axios from "axios";
import { axiosConfig } from "../util/axiosConfig";

export const loadInventory = async (
  setTodayInventory,
  setCurrentVehicleData,
  setInventoryLoaded,
  setVehicleData
) => {
  try {
    console.log("loading inventory");
    const res = await axios.post(
      "/api/v1/vehicle/get-vehicle-data",
      {},
      axiosConfig
    );

    if (!res || !res.data || !res.data.success) {
      throw new Error("could not get vehicle data from database");
    }

    const localVehicleData = res.data.vehicleData;

    // console.log(localVehicleData);

    localVehicleData.forEach((v, index) => {
      if (v.bodyShop === "not-done" || v.service === "not-done") {
        v["severity"] = "danger";
      } else if (
        v.detail === "not-done" ||
        v.photos === "not-done" ||
        v.description === "not-done" ||
        v.stickers === "not-done" ||
        v.priceTag === "not-done"
      ) {
        v["severity"] = "warning";
      } else {
        v["severity"] = "ready";
      }

      if (v.severity !== "ready" && v.isSold) {
        if (
          v.bodyShop === "not-done" ||
          v.service === "not-done" ||
          v.detail === "not-done"
        ) {
          v["severity"] = "defcon";
        }
      }
    });

    const defcons = [];
    const dangers = [];
    const warnings = [];
    const readys = [];

    localVehicleData.forEach((v) => {
      if (v.severity === "defcon") {
        defcons.push(v);
      }
    });

    localVehicleData.forEach((v) => {
      if (v.severity === "danger") {
        dangers.push(v);
      }
    });

    localVehicleData.forEach((v) => {
      if (v.severity === "warning") {
        warnings.push(v);
      }
    });

    localVehicleData.forEach((v) => {
      if (v.severity === "ready") {
        readys.push(v);
      }
    });

    const photosNoDescr = [];

    setVehicleData([...defcons, ...dangers, ...warnings, ...readys]);

    [...defcons, ...dangers, ...warnings, ...readys].forEach((v) => {
      if (v.photos === "done" && v.description === "not-done") {
        photosNoDescr.push(v);
      }
    });

    photosNoDescr.forEach((v) => console.log(v.stock));

    const currentStocks = [
      "1554",
      "2093",
      "2100",
      "2106",
      "2109",
      "2112",
      "2113",
      "2116",
      "f1159",
      "f1261",
      "f1286",
      "f1292",
      "f1299",
      "f1307",
      "f1308",
      "f1312m",
      "f1314",
      "f1320",
      "f1323",
      "f1328",
      "f1333",
      "f1340",
      "f1341",
      "f1343",
      "f1347m",
      "f1348j",
      "f1349",
      "f1353",
      "f1354",
      "f1355",
      "f1356",
      "f1357",
      "f1361",
      "f1362",
      "f1363",
      "f1364",
      "f1366",
      "f1367",
      "f1368",
      "f1370",
      "f1371",
      "f1372",
      "f1373",
      "f1375",
      "f1376",
      "f1377",
      "f1378",
      "f1379",
      "f1381",
      "f1382",
      "f1383",
      "f1384",
      "f1385",
    ];

    const fullInventory = [...defcons, ...dangers, ...warnings, ...readys];

    const notFounds = [];

    fullInventory.forEach((v, idx) => {
      if (!currentStocks.includes(v.stock)) {
        notFounds.push(v);
      }
    });

    console.log("to delete from inventory:", notFounds);

    const currentStocksNoVehicle = [];

    currentStocks.forEach((s, idx) => {
      let matchFound = false;
      fullInventory.forEach((v) => {
        if (!matchFound && v.stock === s) {
          matchFound = true;
        }
      });
      if (!matchFound) {
        currentStocksNoVehicle.push(s);
      }
    });

    console.log("must add to inventory: ", currentStocksNoVehicle);

    // GENERATE LIST OF CARS TO UPDATE
    // this list should contain 1/6 of the inventory
    // it should be the 1/6th with the longest period of time since last accessed
    // this means that every time an inventory unit is accessed, a note is made and a time is recorded
    // this list also needs to contain anything with high severity (defcon)

    const sixth = fullInventory.length / 6; // 10

    const today = [];

    fullInventory.forEach((v) => {
      if (v.model === "Explorer") {
        console.log(
          new Date(v.updatedAt).getTime(),
          new Date().getTime() - 43500000,
          new Date(v.updatedAt).getTime() > new Date().getTime() - 43500000
        );
      }
      if (new Date(v.updatedAt).getTime() > new Date().getTime() - 43500000) {
        today.push(v);
      }
    });

    // console.log(today.length);

    fullInventory.sort((a, b) => {
      if (new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime()) {
        // a was updated more recently than b
        // switch a and b
        return 1;
      } else {
        // b was updated more recently than a
        // keep the current order
        return -1;
      }
    });

    // console.log(fullInventory);

    const diff = sixth - today.length;

    const viewToday = [];

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        viewToday.push(fullInventory[i]);
      }
    }

    setTodayInventory(viewToday);

    const elementWithCurrentFilter = document.querySelector(".current-filter");

    switch (elementWithCurrentFilter.id) {
      case "view-all-filter":
        setCurrentVehicleData([...defcons, ...dangers, ...warnings, ...readys]);
        break;
      case "check-today-filter":
        setCurrentVehicleData(viewToday);
        break;
      case "needs-service-filter":
        // vehicleData
        const needsServiceVehicles = [];

        [...defcons, ...dangers, ...warnings, ...readys].forEach((v) => {
          if (v.service === "not-done") {
            needsServiceVehicles.push(v);
          }
        });

        setCurrentVehicleData([...needsServiceVehicles]);
        break;
      case "needs-photos-filter":
        // vehicleData
        const needsPhotosVehicles = [];

        [...defcons, ...dangers, ...warnings, ...readys].forEach((v) => {
          if (v.photos === "not-done") {
            needsPhotosVehicles.push(v);
          }
        });

        setCurrentVehicleData([...needsPhotosVehicles]);
        break;
      case "needs-description-filter":
        // vehicleData
        const needsDescriptionVehicles = [];

        [...defcons, ...dangers, ...warnings, ...readys].forEach((v) => {
          if (v.description === "not-done") {
            needsDescriptionVehicles.push(v);
          }
        });

        setCurrentVehicleData([...needsDescriptionVehicles]);
        break;

      default:
        break;
    }

    //
    setInventoryLoaded(true);
  } catch (error) {
    console.log(error.message);
  }
};
