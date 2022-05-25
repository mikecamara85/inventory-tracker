import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";
import { checkAuthenticated } from "../functions/authFunctions";
import { format } from "date-fns";
import AddInventory from "./AddInventory";
import { loadInventory } from "../functions/loadInventory";

function Main() {
  const navigate = useNavigate();

  const checkTodayFilter = useRef();
  const mainGridParent = useRef();
  const mainGridRef = useRef();
  const needsDescriptionFilter = useRef();
  const needsPhotosFilter = useRef();
  const needsServiceFilter = useRef();
  const noteComposer = useRef();
  const selectedModule = useRef();
  const viewAllFilter = useRef();
  //
  const [authenticated, setAuthenticated] = useState(false);
  const [currentVehicleData, setCurrentVehicleData] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [inventoryLoaded, setInventoryLoaded] = useState(false);
  const [todayInventory, setTodayInventory] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  //

  //
  useEffect(() => {
    if (!authenticated) {
      // console.log("not authenticated, run async");
      (async function () {
        const success = await checkAuthenticated();

        if (!success) {
          navigate("/");
        } else {
          setAuthenticated(true);
        }
      })();
    }

    if (!inventoryLoaded) {
      loadInventory(
        setTodayInventory,
        setCurrentVehicleData,
        setInventoryLoaded,
        setVehicleData,
        vehicleData
      );
    }
    // eslint-disable-next-line
  }, [inventoryLoaded]);
  //
  const deselector = (e) => {
    setCurrentVehicle(null);
    selectedModule.current.classList.add("hidden");
    mainGridRef.current.classList.remove("hidden");

    loadInventory(
      setTodayInventory,
      setCurrentVehicleData,
      setInventoryLoaded,
      setVehicleData,
      vehicleData
    );
  };
  //

<<<<<<< HEAD
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

      // GENERATE LIST OF CARS TO UPDATE
      // this list should contain 1/6 of the inventory
      // it should be the 1/6th with the longest period of time since last accessed
      // this means that every time an inventory unit is accessed, a note is made and a time is recorded
      // this list also needs to contain anything with high severity (defcon)

      setTodayInventory([...defcons, ...dangers, ...warnings, ...readys]);

      setCurrentVehicleData([...defcons, ...dangers, ...warnings, ...readys]);

      //
      setInventoryLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };
=======
>>>>>>> 3fe1de26c9b16ca3afab010ac21d3da0863159b3
  //
  const selector = (e) => {
    selectedModule.current.classList.remove("hidden");
    mainGridRef.current.classList.add("hidden");
    window.location.href = "#selected-module-top";
  };
  //

  //
  return (
    <div className="container-fluid mb-5">
      <div ref={mainGridParent}>
        <div className="row d-flex justify-content-center m-5 large-text">
          Inventory Tracker
        </div>
        <div className="row d-flex justify-content-center mb-5 small-text">
          v1.0.0 <span>&nbsp;by&nbsp;</span>
          <a href="https://www.bayhawk.cc">Bayhawk Software</a>
        </div>

        <div
          className="row d-flex justify-content-center mb-5 hidden"
          ref={selectedModule}
          id="selected-module-top"
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
              {/* {console.log(currentVehicle)} */}
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
                      setCurrentVehicle(res.data.vehicle);
                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }}
              >
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
              </select>
            </div>
            <div className="row d-flex justify-content-center full-width  selected-row service-special">
              <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
                Service
              </p>
              <select
                className="small-text half-width center-text "
                value={currentVehicle ? currentVehicle.service : ""}
                onChange={(e) => {
                  const service = e.currentTarget.value;
                  (async function () {
                    const res = await axios.post(
                      "/api/v1/vehicle/update-vehicle",
                      {
                        currentVehicle: currentVehicle ? currentVehicle : null,
                        service,
                      },
                      axiosConfig
                    );

                    if (res.data.success) {
                      setCurrentVehicle(res.data.vehicle);
                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }}
              >
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
              </select>
            </div>
            <div className="row d-flex justify-content-center full-width  selected-row">
              <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
                Tech
              </p>
              <select
                className="small-text half-width center-text"
                onChange={(e) => {
                  const tech = e.currentTarget.value;
                  (async function () {
                    const res = await axios.post(
                      "/api/v1/vehicle/update-vehicle",
                      {
                        currentVehicle: currentVehicle ? currentVehicle : null,
                        tech,
                      },
                      axiosConfig
                    );

                    if (res.data.success) {
                      // console.log(
                      //   "about to set current vehicle to one with updated tech"
                      // );
                      setCurrentVehicle(res.data.vehicle);

                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }}
                value={
                  currentVehicle && currentVehicle.tech
                    ? currentVehicle.tech
                    : "select"
                }
              >
                <option value="select">select...</option>
                <option value="manny">Manny</option>
                <option value="art">Art</option>
                <option value="tommy">Tommy</option>
                <option value="other">Other</option>
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
                      setCurrentVehicle(res.data.vehicle);
                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }}
              >
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
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
                      setCurrentVehicle(res.data.vehicle);
                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }}
              >
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
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
                      setCurrentVehicle(res.data.vehicle);
                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }}
              >
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
              </select>
            </div>
            <div className="row d-flex justify-content-between full-width  selected-row pl-5 pr-5">
              <p className="small-text mr-5 center-text">Gas</p>
              <p className="small-text">
                {currentVehicle &&
                  currentVehicle.gas &&
                  new Date(currentVehicle.gas) &&
                  format(new Date(), "P")}
              </p>

              <button
                className="small-text"
                onClick={(e) => {
                  (async function () {
                    const res = await axios.post(
                      "/api/v1/vehicle/update-vehicle",
                      {
                        currentVehicle: currentVehicle ? currentVehicle : null,
                        gas: true,
                      },
                      axiosConfig
                    );

                    if (res.data.success) {
                      setCurrentVehicle(res.data.vehicle);
                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }}
              >
                Refill
              </button>
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
                      setCurrentVehicle(res.data.vehicle);
                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }}
              >
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
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
                      setCurrentVehicle(res.data.vehicle);
                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }}
              >
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
              </select>
            </div>
            <div className="row d-flex justify-content-center full-width  selected-row">
              <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
                Deposit?
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
                      setCurrentVehicle(res.data.vehicle);
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
            <div className="row d-flex justify-content-center full-width  selected-row">
              <p className="small-text mr-5 half-width d-flex align-items-center justify-content-center">
                Delivered?
              </p>
              <select
                className="small-text half-width center-text "
                value={false}
                onChange={(e) => {
                  const confirmedDelivered = window.confirm(
                    "Delivering a vehicle deletes it from the database. Do you want to proceed?"
                  );

                  if (confirmedDelivered) {
                    (async function () {
                      const res = await axios.post(
                        "/api/v1/vehicle/delete-vehicle",
                        {
                          answer: currentVehicle ? currentVehicle.stock : "",
                        },
                        axiosConfig
                      );

                      if (res.data.success) {
                        window.location.reload();
                      } else {
                        alert("could not clear from database");
                      }
                    })();
                  }
                }}
              >
                <option value={true}>true</option>
                <option value={false}>false</option>
              </select>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center full-width selected-row">
              <p className="small-text m-3 d-flex align-items-center justify-content-center">
                Note Viewer
              </p>
              <div className="small-text ninety-width  note-viewer">
                {currentVehicle &&
                  currentVehicle.notes &&
                  currentVehicle.notes.length &&
                  currentVehicle.notes
                    .slice(0)
                    .reverse()
                    .map((n, idx) => (
                      <div
                        className="note d-flex m-3 justify-content-between"
                        key={idx}
                      >
                        <div className="note-info">
                          <p>{n.name && n.name.split(" ")[0]}</p>
                          <p className="tiny-text">
                            {format(new Date(n.createdAt), "P")}
                          </p>
                          <p className="tiny-text">
                            {format(new Date(n.createdAt), "p")}
                          </p>
                        </div>
                        <p className="note-body p-3 ml-3">{n.body}</p>
                      </div>
                    ))}
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center full-width  selected-row">
              <p className="small-text m-3 d-flex align-items-center justify-content-center">
                Note Composer
              </p>
              <textarea
                className="small-text ninety-width  note-composer"
                ref={noteComposer}
              ></textarea>
            </div>
            <button
              className="m-3 medium-text"
              onClick={(e) => {
                if (
                  noteComposer.current.value &&
                  noteComposer.current.value !== "" &&
                  noteComposer.current.value !== " "
                ) {
                  (async function () {
                    const res = await axios.post(
                      "/api/v1/vehicle/update-vehicle",
                      {
                        currentVehicle: currentVehicle ? currentVehicle : null,
                        noteBody: noteComposer.current.value,
                      },
                      axiosConfig
                    );

                    if (res.data.success) {
                      noteComposer.current.value = "";
                      setCurrentVehicle(res.data.vehicle);
                      setInventoryLoaded(false);
                    } else {
                      alert("could not update database...");
                      window.location.reload();
                    }
                  })();
                }
              }}
            >
              Save
            </button>
          </div>
        </div>

        <div className="row d-flex flex-column bg-light justify-content-center align-items-center medium-text pb-3">
          <p className="m-3">Filters:</p>
          <div className=" d-flex flex-row justify-content-center align-items-center flex-wrap">
            <button
              className="m-3 current-filter"
              id="view-all-filter"
              ref={viewAllFilter}
              onClick={() => {
                const cur = document.querySelector(".current-filter");
                cur.classList.remove("current-filter");
                viewAllFilter.current.classList.add("current-filter");

                setCurrentVehicleData([...vehicleData]);
              }}
            >
              View All
            </button>

            <button
              className="m-3"
              ref={checkTodayFilter}
              id="check-today-filter"
              onClick={() => {
                const cur = document.querySelector(".current-filter");
                cur.classList.remove("current-filter");
                checkTodayFilter.current.classList.add("current-filter");

                setCurrentVehicleData(todayInventory);
              }}
            >
              Check Today
            </button>

            <button
              className="m-3"
              ref={needsServiceFilter}
              id="needs-service-filter"
              onClick={() => {
                const cur = document.querySelector(".current-filter");
                cur.classList.remove("current-filter");
                needsServiceFilter.current.classList.add("current-filter");

                // vehicleData
                const needsServiceVehicles = [];

                vehicleData.forEach((v) => {
                  if (v.service === "not-done") {
                    needsServiceVehicles.push(v);
                  }
                });

                setCurrentVehicleData([...needsServiceVehicles]);
              }}
            >
              Needs Service
            </button>
            <button
              className="m-3"
              ref={needsPhotosFilter}
              id="needs-photos-filter"
              onClick={() => {
                const cur = document.querySelector(".current-filter");
                cur.classList.remove("current-filter");
                needsPhotosFilter.current.classList.add("current-filter");

                // vehicleData
                const needsPhotosVehicles = [];

                vehicleData.forEach((v) => {
                  if (v.photos === "not-done") {
                    needsPhotosVehicles.push(v);
                  }
                });

                setCurrentVehicleData([...needsPhotosVehicles]);
              }}
            >
              Needs Photos
            </button>
            <button
              className="m-3"
              ref={needsDescriptionFilter}
              id="needs-description-filter"
              onClick={() => {
                const cur = document.querySelector(".current-filter");
                cur.classList.remove("current-filter");
                needsDescriptionFilter.current.classList.add("current-filter");

                // vehicleData
                const needsDescriptionVehicles = [];

                vehicleData.forEach((v) => {
                  if (v.description === "not-done") {
                    needsDescriptionVehicles.push(v);
                  }
                });

                setCurrentVehicleData([...needsDescriptionVehicles]);
              }}
            >
              Needs Description
            </button>
          </div>
        </div>
        <div
          className="container main-grid d-flex flex-wrap justify-content-around p-5"
          ref={mainGridRef}
        >
          <div className="full-width d-flex justify-content-center align-items-center medium-text">
            <p>Count:&nbsp;</p>
            <p>{currentVehicleData && currentVehicleData.length}</p>
          </div>

          {currentVehicleData &&
          currentVehicleData.length &&
          checkTodayFilter &&
          checkTodayFilter.current &&
          Array.from(checkTodayFilter.current.classList).includes(
            "current-filter"
          ) ? (
            <div className="full-width d-flex justify-content-center align-items-center medium-text">
              <p>Suggested:</p>
            </div>
          ) : (
            <div className="full-width d-flex justify-content-center align-items-center medium-text">
              <p>&nbsp;</p>
            </div>
          )}

          {currentVehicleData.map((v, idx) => {
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
        <div className="d-flex justify-content-center align-items-center small-text m-3">
          <button
            onClick={() => {
              window.location.href = "https://www.leadzen.cc/";
            }}
          >
            Do <span className="text-danger">NOT</span> click here unless you
            want to sell more cars and make more{" "}
            <span style={{ color: "green" }}>$$$</span>!
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center small-text m-3">
          <button
            className="medium-text"
            onClick={() => {
              (async function () {
                const res = await axios.post(
                  "/api/v1/user/logout",
                  { userId: localStorage.getItem("userId") },
                  axiosConfig
                );

                if (res.data.success) {
                  localStorage.setItem("token", "");
                  localStorage.setItem("userId", "");
                  window.location.reload();
                }
              })();
            }}
          >
            Logout
          </button>
        </div>
      </div>
<<<<<<< HEAD
=======

      <AddInventory
        yearInput={yearInput}
        enteredYear={enteredYear}
        updateEntered={updateEntered}
        makeInput={makeInput}
        enteredMake={enteredMake}
        modelInput={modelInput}
        enteredModel={enteredModel}
        stockInput={stockInput}
        enteredStock={enteredStock}
        bodyShopInput={bodyShopInput}
        enteredBodyShop={enteredBodyShop}
        serviceInput={serviceInput}
        enteredService={enteredService}
        techInput={techInput}
        enteredTech={enteredTech}
        detailInput={detailInput}
        enteredDetail={enteredDetail}
        photosInput={photosInput}
        enteredPhotos={enteredPhotos}
        descriptionInput={descriptionInput}
        enteredDescription={enteredDescription}
        gasInput={gasInput}
        enteredGas={enteredGas}
        stickersInput={stickersInput}
        enteredStickers={enteredStickers}
        priceTagInput={priceTagInput}
        enteredPriceTag={enteredPriceTag}
        isSoldInput={isSoldInput}
        enteredIsSold={enteredIsSold}
        mainGridParent={mainGridParent}
      ></AddInventory>
>>>>>>> 3fe1de26c9b16ca3afab010ac21d3da0863159b3
    </div>
  );
}

export default Main;
