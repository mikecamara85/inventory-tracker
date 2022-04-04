import setAuthToken from "../util/setAuthToken";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";

export const checkAuthenticated = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    let { data } = await axios.post("/api/v1/user/checkJWT", axiosConfig);
    if (data.success) {
      localStorage.token = data.token;
      localStorage.userId = data.userId;
      return true;
    } else {
      localStorage.token = "";
      localStorage.userId = "";
      return false;
    }
  } catch (error) {
    console.log("AuthFunctions.checkAuthenticated: ", error);

    return false;
  }
};
