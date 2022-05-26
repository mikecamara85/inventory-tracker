import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";
import { format } from "date-fns";
import { checkAuthenticated } from "../functions/authFunctions";
import { loadInventory } from "../functions/inventoryFunctions";

function Main() {
  const navigate = useNavigate();
  //
  const mainGridParent = useRef();
  const viewAllFilter = useRef();
  const checkTodayFilter = useRef();
  const needsServiceFilter = useRef();
  const needsPhotosFilter = useRef();
  const mainGridRef = useRef();
  const needsDescriptionFilter = useRef();
  //
  const [inventoryLoaded, setInventoryLoaded] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [currentVehicleData, setCurrentVehicleData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});
  //
  useEffect(() => {
    //
    (async () => {
      try {
        const authSuccess = await checkAuthenticated();

        // console.log(authSuccess);

        if (!authSuccess) {
        }
      } catch (error) {
        console.log(error.message);
        navigate("/");
      }
    })();
    if (!inventoryLoaded) {
      // showtime...
      loadInventory(setInventoryLoaded, setVehicleData);
    }

    // eslint-disable-next-line
  }, [inventoryLoaded]);
  //
  const showSelectedVehicle = (e) => {
    // some function
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
                    onClick={(e) => {
                      setSelectedVehicle(v);

                      showSelectedVehicle(e);
                    }}
                  >
                    {v.year} {v.make} {v.model} {v.stock}
                  </div>
                )}

                {v.severity === "danger" && (
                  <div
                    key={idx}
                    className="small-medium-text expanding-module expanding-module-danger  d-flex align-items-center justify-content-center"
                    onClick={(e) => {
                      setSelectedVehicle(v);
                      showSelectedVehicle(e);
                    }}
                  >
                    {v.year} {v.make} {v.model} {v.stock}
                  </div>
                )}

                {v.severity === "warning" && (
                  <div
                    key={idx}
                    className="small-medium-text expanding-module expanding-module-warning  d-flex align-items-center justify-content-center"
                    onClick={(e) => {
                      setSelectedVehicle(v);
                      showSelectedVehicle(e);
                    }}
                  >
                    {v.year} {v.make} {v.model} {v.stock}
                  </div>
                )}

                {v.severity === "ready" && (
                  <div
                    key={idx}
                    className="small-medium-text expanding-module expanding-module-ready  d-flex align-items-center justify-content-center"
                    onClick={(e) => {
                      setSelectedVehicle(v);
                      showSelectedVehicle(e);
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
    </div>
  );
}

export default Main;
