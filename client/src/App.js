import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
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
          <Route path="/main" element={<Main />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
