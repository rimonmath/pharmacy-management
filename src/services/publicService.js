import { axiosPublic } from "./axiosInstances";

export default {
  login(payload) {
    return axiosPublic.post("/login", payload);
  }
};
