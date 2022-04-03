import axios from "axios";

//  SET AUTH TOKEN FOR AXIOS REQUESTS
//
//  INPUT:
//
//  token: String
//
//

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    axios.defaults.headers.common["x-auth-token"] = "";
  }
};

export default setAuthToken;
