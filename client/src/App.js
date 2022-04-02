import React, { useState, useEffect, useRef } from "react";
// import vehicleData from "./dataFormat";
import axios from "axios";
import "./App.scss";

function App() {
  const selectedModule = useRef();

  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [inventoryLoaded, setInventoryLoaded] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (!inventoryLoaded) {
      loadInventory();
    }
    // eslint-disable-next-line
  }, [inventoryLoaded]);
  //

  const loadInventory = async () => {
    try {
      const res = await axios.post(
        "/api/v1/vehicle/get-vehicle-data",
        {},
        axiosConfig
      );

      if (!res || !res.data || !res.data.success) {
        throw new Error("could not get vehicle data from database");
      }

      const localVehicleData = res.data.vehicleData;

      localVehicleData.forEach((v, index) => {
        if (v.bodyShop === "not-done" || v.majorService === "not-done") {
          v["severity"] = "danger";
        } else if (
          v.detail === "not-done" ||
          v.photos === "not-done" ||
          v.description === "not-done" ||
          v.gas === "not-done" ||
          v.safetyCheck === "not-done" ||
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
            v.majorService === "not-done" ||
            v.detail === "not-done" ||
            v.gas === "not-done" ||
            v.safetyCheck === "not-done"
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
      <div className="d-flex justify-content-center">
        <button
          className="medium-text m-3"
          onClick={() => {
            const answer = prompt("enter stock number to delete").toLowerCase();

            (async function () {
              const res = await axios.post(
                "/api/v1/vehicle/delete-vehicle",
                { answer },
                axiosConfig
              );

              console.log(res);

              window.location.reload();
            })();
          }}
        >
          Delete Vehicle
        </button>
        <button className="medium-text m-3" onClick={() => {}}>
          Add Vehicle
        </button>
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
                const bodyShop = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      bodyShop,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      bodyShop,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
                const majorService = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      majorService,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      majorService,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
                const detail = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      detail,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      detail,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
                const photos = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      photos,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      photos,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
                const description = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      description,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      description,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
                const gas = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      gas,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      gas,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
                const safetyCheck = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      safetyCheck,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      safetyCheck,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
                const stickers = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      stickers,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      stickers,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
                const priceTag = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      priceTag,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      priceTag,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
                const isSold = e.currentTarget.value;
                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/update-vehicle",
                    {
                      currentVehicle: currentVehicle ? currentVehicle : null,
                      isSold,
                    },
                    axiosConfig
                  );

                  if (res.data.success) {
                    setCurrentVehicle({
                      ...currentVehicle,
                      isSold,
                    });
                    setInventoryLoaded(false);
                  } else {
                    alert("could not update database...");
                    window.location.reload();
                  }
                })();
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
      <div className="popup">
        <div>this is one row</div>
        <div>this is another row</div>
      </div>
    </div>
  );
}

export default App;
