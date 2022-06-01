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
  const vehicleViewer = useRef();
  //
  const [inventoryLoaded, setInventoryLoaded] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentVehicleData, setCurrentVehicleData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});
  //
  useEffect(() => {
    //
    (async () => {
      try {
        const authSuccess = await checkAuthenticated();

        console.log(authSuccess);

        if (!authSuccess) {
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
        navigate("/");
      }
    })();
    if (!inventoryLoaded) {
      // showtime...
      loadInventory(
        setInventoryLoaded,
        setVehicleData,
        currentVehicleData,
        setCurrentVehicleData
      );
    }

    // eslint-disable-next-line
  }, [inventoryLoaded]);
  //
  const showSelectedVehicle = (e) => {
    // console.log(e.currentTarget.id);
    vehicleData &&
      vehicleData.forEach((v) => {
        if (v._id.toString() === e.currentTarget.id) {
          console.log("selectedVehicle: ", v);
          mainGridParent.current.classList.add("hidden");

          (async function () {
            setSelectedVehicle(v);
          })().then(() => {
            vehicleViewer.current.classList.remove("hidden");
          });
        }
      });
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
              ref={needsPhotosFilter}
              id="needs-photos-filter"
              onClick={() => {
                const cur = document.querySelector(".current-filter");
                cur.classList.remove("current-filter");
                needsPhotosFilter.current.classList.add("current-filter");

                // vehicleData
                const needsPhotosVehicles = [];

                vehicleData.forEach((v) => {
                  if (v.pictures.length < 2) {
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
                  if (
                    v.description === "" &&
                    v.pictures &&
                    v.pictures.length > 1
                  ) {
                    // console.log(v);
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
                    id={v._id}
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
                    id={v._id}
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
                    id={v._id}
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
                    id={v._id}
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

      {selectedVehicle && (
        <div
          ref={vehicleViewer}
          className="d-flex flex-column justify-content-center align-items-center hidden"
        >
          <span
            className="large-text m-3 close-button"
            onClick={(e) => {
              setSelectedVehicle(null);
              mainGridParent.current.classList.remove("hidden");
              vehicleViewer.current.classList.add("hidden");
            }}
          >
            X
          </span>
          <h1 className="large-text mb-0">Hello World</h1>
        </div>
      )}
    </div>
  );
}

export default Main;
