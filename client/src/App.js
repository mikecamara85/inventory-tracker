import React, { useState, useEffect, useRef } from "react";
import "./App.scss";

function App() {
  const selectedModule = useRef();
  //

  const deselector = (e) => {
    selectedModule.current.classList.add("hidden");
  };

  const selector = (e) => {
    console.log("hello Jilly");
    selectedModule.current.classList.remove("hidden");
  };

  const safeStateSetter = (fn, refName) => {
    if (refName.current) {
      fn();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center m-5 large-text">
        Inventory Tracker
      </div>
      <div
        className="row d-flex justify-content-center mb-5 hidden"
        ref={selectedModule}
      >
        <div className="expanding-module expanding-module-expanded d-flex flex-column justify-content-around">
          <div className="large-text" onClick={deselector}>
            X
          </div>
          <p className="center-text medium-text">2017 Buick Regal F1261</p>
          <div className="row d-flex justify-content-center full-width m-0">
            <p className="small-text mr-5 half-width center-text">Body Shop</p>
            <select className="small-text half-width">
              <option>done</option>
              <option>not done</option>
              <option>not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width m-0">
            <p className="small-text mr-5 half-width center-text">
              Major Service
            </p>
            <select className="small-text half-width">
              <option>done</option>
              <option>not done</option>
              <option>not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width m-0">
            <p className="small-text mr-5 half-width center-text">Detail</p>
            <select className="small-text half-width">
              <option>done</option>
              <option>not done</option>
              <option>not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width m-0">
            <p className="small-text mr-5 half-width center-text">Photos</p>
            <select className="small-text half-width">
              <option>done</option>
              <option>not done</option>
              <option>not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width m-0">
            <p className="small-text mr-5 half-width center-text">
              Description
            </p>
            <select className="small-text half-width">
              <option>done</option>
              <option>not done</option>
              <option>not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width m-0">
            <p className="small-text mr-5 half-width center-text">Gas</p>
            <select className="small-text half-width">
              <option>done</option>
              <option>not done</option>
              <option>not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width m-0">
            <p className="small-text mr-5 half-width center-text">
              Safety Check
            </p>
            <select className="small-text half-width">
              <option>done</option>
              <option>not done</option>
              <option>not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width m-0">
            <p className="small-text mr-5 half-width center-text">Stickers</p>
            <select className="small-text half-width">
              <option>done</option>
              <option>not done</option>
              <option>not needed</option>
            </select>
          </div>
          <div className="row d-flex justify-content-center full-width m-0">
            <p className="small-text mr-5 half-width center-text">Price Tag</p>
            <select className="small-text half-width">
              <option>done</option>
              <option>not done</option>
              <option>not needed</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container main-grid d-flex flex-wrap justify-content-around p-5">
        <div
          className="medium-text bg-white expanding-module mt-3 mb-3 center-text d-flex align-items-center justify-content-center"
          onClick={selector}
        >
          2017 Buick Regal F1261
        </div>
        <div className="large-text bg-white expanding-module mt-3 mb-3">
          selectable
        </div>
        <div className="large-text bg-white expanding-module mt-3 mb-3">
          selectable
        </div>
        <div className="large-text bg-white expanding-module mt-3 mb-3">
          selectable
        </div>
        <div className="large-text bg-white expanding-module mt-3 mb-3">
          selectable
        </div>
        <div className="large-text bg-white expanding-module mt-3 mb-3">
          selectable
        </div>
      </div>
    </div>
  );
}

export default App;
