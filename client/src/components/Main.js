import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";
import { checkAuthenticated } from "../functions/authFunctions";

function Main() {
  const navigate = useNavigate();

  const bodyShopInput = useRef();
  const descriptionInput = useRef();
  const detailInput = useRef();
  const gasInput = useRef();
  const isSoldInput = useRef();
  const mainGridParent = useRef();
  const makeInput = useRef();
  const majorServiceInput = useRef();
  const modelInput = useRef();
  const photosInput = useRef();
  const priceTagInput = useRef();
  const safetyCheckInput = useRef();
  const selectedModule = useRef();
  const stickersInput = useRef();
  const stockInput = useRef();
  const yearInput = useRef();
  //
  const [authenticated, setAuthenticated] = useState(false);
  const [enteredBodyShop, setEnteredBodyShop] = useState("not-needed");
  const [enteredDescription, setEnteredDescription] = useState("not-done");
  const [enteredDetail, setEnteredDetail] = useState("not-done");
  const [enteredGas, setEnteredGas] = useState("not-done");
  const [enteredIsSold, setEnteredIsSold] = useState(false);
  const [enteredMajorService, setEnteredMajorService] = useState("not-needed");
  const [enteredMake, setEnteredMake] = useState("");
  const [enteredModel, setEnteredModel] = useState("");
  const [enteredPhotos, setEnteredPhotos] = useState("not-done");
  const [enteredPriceTag, setEnteredPriceTag] = useState("not-done");
  const [enteredSafetyCheck, setEnteredSafetyCheck] = useState("not-done");
  const [enteredStickers, setEnteredStickers] = useState("not-done");
  const [enteredStock, setEnteredStock] = useState("");
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [enteredYear, setEnteredYear] = useState("");
  const [inventoryLoaded, setInventoryLoaded] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  //

  //
  useEffect(() => {
    if (!authenticated) {
      console.log("not authenticated, run async");
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
      loadInventory();
    }
    // eslint-disable-next-line
  }, [inventoryLoaded]);
  //
  const deselector = (e) => {
    setCurrentVehicle(null);
    selectedModule.current.classList.add("hidden");
  };
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

      console.log(localVehicleData);

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
  //
  const selector = (e) => {
    selectedModule.current.classList.remove("hidden");
  };
  //
  const updateEntered = (e) => {
    switch (e.currentTarget.id) {
      case "entered-year":
        setEnteredYear(e.currentTarget.value);
        break;
      //
      case "entered-make":
        setEnteredMake(e.currentTarget.value);
        break;
      //
      case "entered-model":
        setEnteredModel(e.currentTarget.value);
        break;
      //
      case "entered-stock":
        setEnteredStock(e.currentTarget.value);
        break;
      //
      case "entered-body-shop":
        setEnteredBodyShop(e.currentTarget.value);
        break;
      //
      case "entered-major-service":
        setEnteredMajorService(e.currentTarget.value);
        break;
      //
      case "entered-detail":
        setEnteredDetail(e.currentTarget.value);
        break;
      //
      case "entered-photos":
        setEnteredPhotos(e.currentTarget.value);
        break;
      //
      case "entered-description":
        setEnteredDescription(e.currentTarget.value);
        break;
      //
      case "entered-gas":
        setEnteredGas(e.currentTarget.value);
        break;
      //
      case "entered-safety-check":
        setEnteredSafetyCheck(e.currentTarget.value);
        break;
      //
      case "entered-stickers":
        setEnteredStickers(e.currentTarget.value);
        break;
      //
      case "entered-price-tag":
        setEnteredPriceTag(e.currentTarget.value);
        break;
      //
      case "entered-is-sold":
        setEnteredIsSold(e.currentTarget.value);
        break;
      //
      default:
        break;
    }
  };
  //
  return (
    <div className="container-fluid mb-5">
      <div ref={mainGridParent}>
        <div className="row d-flex justify-content-center m-5 large-text">
          Inventory Tracker
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="medium-text m-3"
            onClick={() => {
              const answer = prompt(
                "enter stock number to delete"
              ).toLowerCase();

              (async function () {
                try {
                  const res = await axios
                    .post(
                      "/api/v1/vehicle/delete-vehicle",
                      { answer },
                      axiosConfig
                    )
                    .catch((err) => {
                      alert("could not delete vehicle");
                    });

                  // console.log(res.data);

                  if (res.data.success) {
                    alert("success!");
                  }

                  window.location.reload();
                } catch (error) {
                  console.log("could not delete vehicle");
                }
              })();
            }}
          >
            Delete Vehicle
          </button>
          <button
            className="medium-text m-3"
            onClick={() => {
              const popup = document.querySelector(".popup");
              popup.classList.remove("hidden");
              mainGridParent.current.classList.add("disabled");
            }}
          >
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
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
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
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
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
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
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
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
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
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
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
                <option value="not-needed">Not Needed</option>
                <option value="not-done">Not Done</option>
                <option value="done">Done!</option>
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
      </div>

      <div className="popup hidden">
        <div className="large-text d-flex justify-content-between align-items-center">
          <p>Add Inventory</p>
          <p
            onMouseOver={(e) => {
              e.currentTarget.style.color = "red";
              e.currentTarget.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "black";
            }}
            onClick={(e) => {
              const popup = document.querySelector(".popup");
              popup.classList.add("hidden");
              mainGridParent.current.classList.remove("disabled");
            }}
          >
            X
          </p>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3">
          <p className="mr-5">Year:</p>
          <input
            type="text"
            className="field-input bg-white"
            ref={yearInput}
            id="entered-year"
            value={enteredYear}
            onChange={updateEntered}
          ></input>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3 bg-light">
          <p className="mr-5">Make:</p>
          <input
            type="text"
            className="field-input bg-light"
            ref={makeInput}
            id="entered-make"
            value={enteredMake}
            onChange={updateEntered}
          ></input>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3">
          <p className="mr-5">Model:</p>
          <input
            type="text"
            className="field-input bg-white"
            ref={modelInput}
            id="entered-model"
            value={enteredModel}
            onChange={updateEntered}
          ></input>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3 bg-light">
          <p className="mr-5">Stock:</p>
          <input
            type="text"
            className="field-input bg-light"
            ref={stockInput}
            id="entered-stock"
            value={enteredStock}
            onChange={updateEntered}
          ></input>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3">
          <p className="mr-5">Body Shop:</p>
          <select
            className="field-input"
            ref={bodyShopInput}
            id="entered-body-shop"
            value={enteredBodyShop}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3 bg-light">
          <p className="mr-5">Major Service:</p>
          <select
            className="field-input bg-light"
            ref={majorServiceInput}
            id="entered-major-service"
            value={enteredMajorService}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3">
          <p className="mr-5">Detail:</p>
          <select
            className="field-input"
            ref={detailInput}
            id="entered-detail"
            value={enteredDetail}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3 bg-light">
          <p className="mr-5">Photos:</p>
          <select
            className="field-input bg-light"
            ref={photosInput}
            id="entered-photos"
            value={enteredPhotos}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3">
          <p className="mr-5">Description:</p>
          <select
            className="field-input"
            ref={descriptionInput}
            id="entered-description"
            value={enteredDescription}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3 bg-light">
          <p className="mr-5">Gas:</p>
          <select
            className="field-input bg-light"
            ref={gasInput}
            id="entered-gas"
            value={enteredGas}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3">
          <p className="mr-5">Safety Check:</p>
          <select
            className="field-input"
            ref={safetyCheckInput}
            id="entered-safety-check"
            value={enteredSafetyCheck}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3 bg-light">
          <p className="mr-5">Stickers:</p>
          <select
            className="field-input bg-light"
            ref={stickersInput}
            id="entered-stickers"
            value={enteredStickers}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3">
          <p className="mr-5">Price Tag:</p>
          <select
            className="field-input"
            ref={priceTagInput}
            id="entered-price-tag"
            value={enteredPriceTag}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>
        <div className="small-text d-flex align-items-center justify-content-between mt-3 bg-light">
          <p className="mr-5">Is Sold:</p>
          <select
            className="field-input bg-light"
            ref={isSoldInput}
            id="entered-is-sold"
            value={enteredIsSold}
            onChange={updateEntered}
          >
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>
        </div>
        <div className="d-flex justify-content-center align-items-center m-3">
          <button
            className="large-text"
            onClick={(e) => {
              if (
                !enteredYear ||
                !enteredMake ||
                !enteredModel ||
                !enteredStock
              ) {
                alert("missing required information!");
              } else {
                const vehicleToEnter = {
                  enteredYear,
                  enteredMake,
                  enteredModel,
                  enteredStock,
                  enteredBodyShop,
                  enteredMajorService,
                  enteredDetail,
                  enteredPhotos,
                  enteredDescription,
                  enteredGas,
                  enteredSafetyCheck,
                  enteredStickers,
                  enteredPriceTag,
                  enteredIsSold,
                  notes: {
                    date: "04/03/2022",
                    user: "Michael Camara",
                    body: "this is hard coded",
                  },
                };

                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/enter-vehicle",
                    { vehicleToEnter, userId: localStorage.userId },
                    axiosConfig
                  );

                  if (res.data.success) {
                    alert("Success!");
                  } else {
                    alert("could not add vehicle...");
                  }

                  window.location.reload();
                })();
              }
            }}
          >
            Enter Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
