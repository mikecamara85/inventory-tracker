import setAuthToken from "../util/setAuthToken";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";

export const checkAuthenticated = async () => {
  if (localStorage.getItem("token")) {
    // console.log(localStorage.getItem("token"));
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    let { data } = await axios.post("/api/v1/user/checkJWT", axiosConfig);
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      return true;
    } else {
      localStorage.setItem("token", "");
      localStorage.setItem("userId", "");
      return false;
    }
  } catch (error) {
    console.log("AuthFunctions.checkAuthenticated: ", error);

    return false;
  }
};
