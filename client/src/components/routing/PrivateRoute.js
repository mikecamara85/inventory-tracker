import React, { Fragment, useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { checkAuthenticated } from "../../functions/authFunctions";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadPrivateRoute = async () => {
    const status = await checkAuthenticated();
    if (status.authenticated) {
      setAuthenticated(true);
      setLoading(false);
    } else {
      setAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrivateRoute();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {!authenticated && !loading && <Navigate to="/" />}
      {!authenticated && (
        <div className="full-page-center full-page-center-with-navbar">
          <div className="lds-dual-ring"></div>
        </div>
      )}
      {authenticated && <Route {...rest} component={Component} />}
    </Fragment>
  );
};

export default PrivateRoute;
