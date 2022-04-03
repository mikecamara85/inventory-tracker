import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import myRoutes from "./components/routing/myRoutes";
import "./App.scss";
import Landing from "./components/Landing";

function App() {
  //
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route exact path="/public-contact" component={PublicContact} /> */}
          <Route component={myRoutes} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
