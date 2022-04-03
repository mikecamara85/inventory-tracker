import React, { Fragment } from "react";
import { Routes } from "react-router-dom";
import Main from "../Main";
import PrivateRoute from "./PrivateRoute";

export const myRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <PrivateRoute path="/main" element={<Main />} />
      </Routes>
    </Fragment>
  );
};

export default myRoutes;
