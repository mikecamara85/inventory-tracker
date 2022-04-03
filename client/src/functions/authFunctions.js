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
      return {
        authenticated: true,
      };
    } else {
      throw new Error("server unable to verify JWT...");
    }
  } catch (error) {
    console.log("AuthFunctions.checkAuthenticated: ", error);

    return false;
  }
};
