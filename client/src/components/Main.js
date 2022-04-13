import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";
import { checkAuthenticated } from "../functions/authFunctions";
import { format } from "date-fns";

function Main() {
  const navigate = useNavigate();

  const bodyShopInput = useRef();
  const descriptionInput = useRef();
  const detailInput = useRef();
  const gasInput = useRef();
  const isSoldInput = useRef();
  const mainGridParent = useRef();
  const mainGridRef = useRef();
  const makeInput = useRef();
  const needsDescriptionFilter = useRef();
  const needsPhotosFilter = useRef();
  const needsServiceFilter = useRef();
  const noteComposer = useRef();
  const serviceInput = useRef();
  const modelInput = useRef();
  const photosInput = useRef();
  const priceTagInput = useRef();
  const selectedModule = useRef();
  const stickersInput = useRef();
  const stockInput = useRef();
  const techInput = useRef();
  const viewAllFilter = useRef();
  const yearInput = useRef();
  //
  const [authenticated, setAuthenticated] = useState(false);
  const [currentVehicleData, setCurrentVehicleData] = useState([]);
  const [enteredBodyShop, setEnteredBodyShop] = useState("not-needed");
  const [enteredDescription, setEnteredDescription] = useState("not-done");
  const [enteredDetail, setEnteredDetail] = useState("not-done");
  const [enteredGas, setEnteredGas] = useState("not-done");
  const [enteredIsSold, setEnteredIsSold] = useState(false);
  const [enteredService, setEnteredService] = useState("not-done");
  const [enteredTech, setEnteredTech] = useState("select");
  const [enteredMake, setEnteredMake] = useState("");
  const [enteredModel, setEnteredModel] = useState("");
  const [enteredPhotos, setEnteredPhotos] = useState("not-done");
  const [enteredPriceTag, setEnteredPriceTag] = useState("not-done");
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
      loadInventory();
    }
    // eslint-disable-next-line
  }, [inventoryLoaded]);
  //
  const deselector = (e) => {
    setCurrentVehicle(null);
    selectedModule.current.classList.add("hidden");
    mainGridRef.current.classList.remove("hidden");
    (async function () {
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

      localVehicleData.forEach((v, index) => {
        if (v.bodyShop === "not-done" || v.service === "not-done") {
          v["severity"] = "danger";
        } else if (
          v.detail === "not-done" ||
          v.photos === "not-done" ||
          v.description === "not-done" ||
          v.gas === "not-done" ||
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
            v.detail === "not-done" ||
            v.gas === "not-done"
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

      const sortedVehicleData = [
        ...defcons,
        ...dangers,
        ...warnings,
        ...readys,
      ];

      const updatedVehicles = [];

      sortedVehicleData.forEach((sV) => {
        currentVehicleData.forEach((cV) => {
          if (sV._id === cV._id) {
            updatedVehicles.push(sV);
          }
        });
      });

      setCurrentVehicleData([...updatedVehicles]);
    })();
  };
  //
  const loadInventory = async () => {
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
          v.gas === "not-done" ||
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
            v.detail === "not-done" ||
            v.gas === "not-done"
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
      if (!currentVehicleData[0]) {
        setCurrentVehicleData([...defcons, ...dangers, ...warnings, ...readys]);
      }

      [...defcons, ...dangers, ...warnings, ...readys].forEach((v) => {
        if (v.photos === "done" && v.description === "not-done") {
          photosNoDescr.push(v);
        }
      });

      const currentStocks = [
        "1554",
        "2037",
        "2093",
        "2100",
        "2105",
        "2106",
        "2109",
        "2110",
        "2111",
        "2112",
        "2113",
        "2114",
        "2116",
        "f1159",
        "f1261",
        "f1274",
        "f1286",
        "f1292",
        "f1297",
        "f1299",
        "f1304",
        "f1307",
        "f1308",
        "f1312m",
        "f1313",
        "f1314",
        "f1320",
        "f1323",
        "f1324",
        "f1326",
        "f1328",
        "f1330",
        "f1333",
        "f1340",
        "f1341",
        "f1342",
        "f1343",
        "f1344",
        "f1347m",
        "f1348j",
        "f1349",
        "f1353",
        "f1354",
        "f1355",
        "f1356",
        "f1357",
        "f1358",
        "f1360",
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
        "f1374",
      ];

      const notFounds = [];

      [...defcons, ...dangers, ...warnings, ...readys].forEach((v, idx) => {
        if (!currentStocks.includes(v.stock)) {
          notFounds.push(v);
        }
      });

      console.log("to delete from inventory:", notFounds);

      const currentStocksNoVehicle = [];

      currentStocks.forEach((s, idx) => {
        let matchFound = false;
        [...defcons, ...dangers, ...warnings, ...readys].forEach((v) => {
          if (!matchFound && v.stock === s) {
            matchFound = true;
          }
        });
        if (!matchFound) {
          currentStocksNoVehicle.push(s);
        }
      });

      console.log("must add to inventory: ", currentStocksNoVehicle);

      // console.log(photosNoDescr);
      //
      setInventoryLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  //
  const selector = (e) => {
    selectedModule.current.classList.remove("hidden");
    mainGridRef.current.classList.add("hidden");
    window.location.href = "#selected-module-top";
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
      case "entered-service":
        setEnteredService(e.currentTarget.value);
        break;
      //
      case "entered-tech":
        setEnteredTech(e.currentTarget.value);
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
        <div className="row d-flex justify-content-center mb-5 small-text">
          v1.0.0 <span>&nbsp;by&nbsp;</span>
          <a href="https://www.bayhawk.cc">Bayhawk Software</a>
        </div>
        <div className="d-flex justify-content-center">
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
                      console.log(
                        "about to set current vehicle to one with updated tech"
                      );
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
              ref={needsServiceFilter}
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
          <p className="mr-5">Service:</p>
          <select
            className="field-input bg-light"
            ref={serviceInput}
            id="entered-service"
            value={enteredService}
            onChange={updateEntered}
          >
            <option value="not-needed">Not Needed</option>
            <option value="not-done">Not Done</option>
            <option value="done">Done!</option>
          </select>
        </div>

        <div className="small-text d-flex align-items-center justify-content-between mt-3 bg-light">
          <p className="mr-5">Tech:</p>
          <select
            className="field-input bg-light"
            ref={techInput}
            id="entered-tech"
            value={enteredTech}
            onChange={updateEntered}
          >
            <option value="select">select...</option>
            <option value="manny">Manny</option>
            <option value="art">Art</option>
            <option value="tommy">Tommy</option>
            <option value="other">other</option>
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
          <p className="mr-5">Deposit:</p>
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
                  enteredService,
                  enteredTech,
                  enteredDetail,
                  enteredPhotos,
                  enteredDescription,
                  enteredGas,
                  enteredStickers,
                  enteredPriceTag,
                  enteredIsSold,
                };

                (async function () {
                  const res = await axios.post(
                    "/api/v1/vehicle/enter-vehicle",
                    { vehicleToEnter, userId: localStorage.getItem("userId") },
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
