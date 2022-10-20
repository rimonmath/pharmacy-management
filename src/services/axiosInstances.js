import axios from "axios";

let apiBaseUrl = "https://api.rimoned.com/api/pharmacy-management/v1/";

export const axiosPublic = axios.create({
  baseURL: apiBaseUrl,
  timeout: 60000
  // headers: {'X-Custom-Header': 'foobar'}
});

export const axiosPrivate = axios.create({
  baseURL: apiBaseUrl,
  timeout: 60000
  // headers: {'X-Custom-Header': 'foobar'}
});

export const updatePrivateHeaders = () => {
  setTimeout(() => {
    axiosPrivate.defaults.headers.common["authorization"] =
      localStorage.getItem("accessToken");
  }, 100);
};

// Add a response interceptor
axiosPrivate.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);
    // Do something with response error
    if (error.response && error.response.status == 401) {
      if (window.location.href.indexOf("force-logout") === -1) {
        setTimeout(() => {
          window.location.href = "/force-logout";
        }, 111);
      }
    }
    return Promise.reject(error);
  }
);
