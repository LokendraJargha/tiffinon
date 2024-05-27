import axios from "axios";
import { message } from "antd";
import { local } from "brownies";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_VERSION}`,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

instance.interceptors.request.use(
  (config) => {
    let token = local.access_token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * response handlar
 * Mostly intended to handle 401 error
 */

message.loading({ content: "Loading..." });
instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      if (typeof response.data.message !== "undefined")
        message.success({ content: response.data.message });
    }
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      const msg = error.response.data
        ? error.response.data.message
        : "Unauthorised access level";
      message.error({ content: msg });
    } else if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("isAuthenticate");
      let url = error.response.config.url.split("/");
      if (url[url.length - 1] !== "check") {
        message.error({ content: "Oops..! Session has expired!" });
        window.location.pathname = "/login";
      }
    } else if (error.response.status === 404) {
      message.error({
        content: "The requested api is not found in server. 404 error!",
      });
    } else if (error.response.status === 500) {
      let ermgs = error.response.data
        ? error.response.data.message
        : "500 internal error!";
      message.error({ content: ermgs });
      // message.error([ermgs]);
    }
    return Promise.reject(error);
  }
);
export default instance;
