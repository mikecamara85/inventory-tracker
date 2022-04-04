import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";

const Landing = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="large-text d-flex flex-column m-5">
      <p>Login</p>
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.currentTarget.value);
        }}
        style={{ maxWidth: "300px" }}
      ></input>
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        style={{ maxWidth: "300px" }}
      ></input>
      <button
        onClick={() => {
          (async function () {
            const res = await axios.post(
              "/api/v1/user/login",
              { username, password },
              axiosConfig
            );

            if (res.data.success) {
              console.log("success!");
              localStorage.setItem("token", res.data.token);
              navigate("/main");
            }
          })();
        }}
        style={{ maxWidth: "300px" }}
        className="mt-5"
      >
        Enter
      </button>
    </div>
  );
};

export default Landing;
