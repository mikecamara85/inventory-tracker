import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";

const AddInventory = ({
  yearInput,
  enteredYear,
  updateEntered,
  makeInput,
  enteredMake,
  modelInput,
  enteredModel,
  stockInput,
  enteredStock,
  bodyShopInput,
  enteredBodyShop,
  serviceInput,
  enteredService,
  techInput,
  enteredTech,
  detailInput,
  enteredDetail,
  photosInput,
  enteredPhotos,
  descriptionInput,
  enteredDescription,
  gasInput,
  enteredGas,
  stickersInput,
  enteredStickers,
  priceTagInput,
  enteredPriceTag,
  isSoldInput,
  enteredIsSold,
  mainGridParent,
}) => {
  return (
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
          <option value="has-gas">Has Gas Already</option>
          <option value="needs-gas">Needs Gas</option>
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
  );
};

AddInventory.propTypes = {
  enteredYear: PropTypes.string.isRequired,
  enteredMake: PropTypes.string.isRequired,
  enteredModel: PropTypes.string.isRequired,
  enteredStock: PropTypes.string.isRequired,
  enteredBodyShop: PropTypes.string.isRequired,
  enteredService: PropTypes.string.isRequired,
  enteredTech: PropTypes.string.isRequired,
  enteredDetail: PropTypes.string.isRequired,
  enteredPhotos: PropTypes.string.isRequired,
  enteredDescription: PropTypes.string.isRequired,
  enteredGas: PropTypes.string.isRequired,
  enteredStickers: PropTypes.string.isRequired,
  enteredPriceTag: PropTypes.string.isRequired,
  enteredIsSold: PropTypes.bool.isRequired,
  mainGridParent: PropTypes.object.isRequired,
};

export default AddInventory;
