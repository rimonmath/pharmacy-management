import axios from "axios";

const API_BAE_URL = "https://api.rimoned.com/api/pharmacy-management/v1";

export const axiosPublic = axios.create({
  baseURL: API_BAE_URL,
  timeout: 60000
});

export const axiosPrivate = axios.create({
  baseURL: API_BAE_URL,
  timeout: 60000
});

export const setPrivateHeaders = () => {
  axiosPrivate.defaults.headers.common["authorization"] =
    localStorage.getItem("accessToken");
};
