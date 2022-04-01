import React, { useState, useEffect, useRef } from "react";
import dataFormat from "./dataFormat";
import "./App.scss";

function App() {
  const selectedModule = useRef();

  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [inventoryLoaded, setInventoryLoaded] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    if (!inventoryLoaded) {
      loadInventory();
    }
  }, [inventoryLoaded]);
  //

  const loadInventory = async () => {
    try {
      const localVehicleData = dataFormat;

      localVehicleData.forEach((v, index) => {
        let stepsNeeded = 0;

        for (let key in v) {
          if (
            key !== "year" &&
            key !== "make" &&
            key !== "model" &&
            key !== "stock"
          ) {
            if (typeof v[key] === "string" && v[key] !== "not-needed") {
              // if (index === 0) {
              //   console.log("step needed: ", key, v[key]);
              // }

              stepsNeeded++;
            }
          }
        }

        let stepsCompleted = 0;

        for (let key in v) {
          if (
            key !== "year" &&
            key !== "make" &&
            key !== "model" &&
            key !== "stock"
          ) {
            if (
              typeof v[key] === "string" &&
              v[key] !== "not-done" &&
              v[key] !== "not-needed"
            ) {
              // if (index === 0) {
              //   console.log("step completed:", key, v[key]);
              // }

              stepsCompleted++;
            }
          }
        }

        if (stepsCompleted > stepsNeeded) {
          throw new Error("steps completed is greater than steps needed...");
        } else {
          if (stepsCompleted / stepsNeeded < 0.5) {
            v["severity"] = "danger";
          } else if (
            stepsCompleted / stepsNeeded < 0.9 &&
            stepsCompleted / stepsNeeded >= 0.5
          ) {
            v["severity"] = "warning";
          } else {
            v["severity"] = "ready";
          }

          if (v["severity"] !== "ready" && v["isSold"] === true) {
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

      setVehicleData([...defcons, ...dangers, ...warnings, ...readys]);
      setInventoryLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deselector = (e) => {
    setCurrentVehicle(null);
    selectedModule.current.classList.add("hidden");
  };

  const selector = (e) => {
    selectedModule.current.classList.remove("hidden");
  };

  return (
    <div className="container-fluid mb-5">
      <div className="row d-flex justify-content-center m-5 large-text">
        Inventory Tracker
      </div>
      <div
        className="row d-flex justify-content-center mb-5 hidden"
        ref={selectedModule}
      >
        <div className="expanding-module expanding-module-ready expanding-module-expanded d-flex flex-column justify-content-around">
          <div className="large-text text-danger" onClick={deselector}>
            Close
          </div>
          <p className="center-text medium-text">
            {currentVehicle ? currentVehicle.year : ""}{" "}
            {currentVehicle ? currentVehicle.make : ""}{" "}
            {currentVehicle ? currentVehicle.model : ""}{" "}
            {currentVehicle ? currentVehicle.stock : ""}
          </p>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Body Shop
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.bodyShop : ""}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  bodyShop: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value="done">done</option>
              <option value="not-done">not done</option>
              <option value="not-needed">not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Major Service
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.majorService : ""}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  majorService: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value="done">done</option>
              <option value="not-done">not done</option>
              <option value="not-needed">not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Detail
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.detail : ""}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  detail: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value="done">done</option>
              <option value="not-done">not done</option>
              <option value="not-needed">not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Photos
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.photos : ""}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  photos: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value="done">done</option>
              <option value="not-done">not done</option>
              <option value="not-needed">not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Description
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.description : ""}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  description: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value="done">done</option>
              <option value="not-done">not done</option>
              <option value="not-needed">not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Gas
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.gas : ""}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  gas: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value="done">done</option>
              <option value="not-done">not done</option>
              <option value="not-needed">not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Safety Check
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.safetyCheck : ""}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  safetyCheck: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value="done">done</option>
              <option value="not-done">not done</option>
              <option value="not-needed">not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Stickers
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.stickers : ""}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  stickers: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value="done">done</option>
              <option value="not-done">not done</option>
              <option value="not-needed">not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Price Tag
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.priceTag : ""}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  priceTag: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value="done">done</option>
              <option value="not-done">not done</option>
              <option value="not-needed">not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width  selected-row">
            <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
              Sold?
            </p>
            <select
              className="small-text half-width center-text "
              value={currentVehicle ? currentVehicle.isSold : false}
              onChange={(e) => {
                setCurrentVehicle({
                  ...currentVehicle,
                  isSold: e.currentTarget.value,
                });
                setInventoryLoaded(false);
              }}
            >
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center full-width  selected-row">
            <p className="small-text m-3 d-flex align-items-center justify-content-center">
              Note Viewer
            </p>
            <div className="small-text ninety-width  note-viewer"></div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center full-width  selected-row">
            <p className="small-text m-3 d-flex align-items-center justify-content-center">
              Note Composer
            </p>
            <textarea className="small-text ninety-width  note-composer"></textarea>
          </div>
        </div>
      </div>
      <div className="container main-grid d-flex flex-wrap justify-content-around p-5">
        {vehicleData.map((v, idx) => {
          return (
            <div key={idx}>
              {v.severity === "defcon" && (
                <div
                  key={idx}
                  className="small-medium-text expanding-module expanding-module-defcon  d-flex align-items-center justify-content-center"
                  onClick={() => {
                    setCurrentVehicle(v);

                    selector();
                  }}
                >
                  {v.year} {v.make} {v.model} {v.stock}
                </div>
              )}

              {v.severity === "danger" && (
                <div
                  key={idx}
                  className="small-medium-text expanding-module expanding-module-danger  d-flex align-items-center justify-content-center"
                  onClick={() => {
                    setCurrentVehicle(v);
                    selector();
                  }}
                >
                  {v.year} {v.make} {v.model} {v.stock}
                </div>
              )}

              {v.severity === "warning" && (
                <div
                  key={idx}
                  className="small-medium-text expanding-module expanding-module-warning  d-flex align-items-center justify-content-center"
                  onClick={() => {
                    setCurrentVehicle(v);
                    selector();
                  }}
                >
                  {v.year} {v.make} {v.model} {v.stock}
                </div>
              )}

              {v.severity === "ready" && (
                <div
                  key={idx}
                  className="small-medium-text expanding-module expanding-module-ready  d-flex align-items-center justify-content-center"
                  onClick={() => {
                    setCurrentVehicle(v);
                    selector();
                  }}
                >
                  {v.year} {v.make} {v.model} {v.stock}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
