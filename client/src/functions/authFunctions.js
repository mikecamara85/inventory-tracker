import setAuthToken from "../util/setAuthToken";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";

export const checkAuthenticated = async () => {
  try {
    const localToken = localStorage.getItem("token");
    // localToken && console.log("it is truthy");
    // !localToken && console.log("it is falsy");
    if (localToken) {
      setAuthToken(localStorage.getItem("token"));
    }
    // console.log("about to checkJWT on server");
    let { data } = await axios.post("/api/v1/user/checkJWT", axiosConfig);
    // console.log(data);
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
