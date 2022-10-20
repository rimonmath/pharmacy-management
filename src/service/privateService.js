import { axiosPrivate } from "./axiosInstance";

export default {
  getVendors() {
    return axiosPrivate.get("/private/vendor");
  },

  addVendor(payload) {
    return axiosPrivate.post("/private/vendor", payload);
  },

  editVendor(payload) {
    return axiosPrivate.put("/private/vendor/" + payload._id, payload);
  },

  deleteVendor(id) {
    return axiosPrivate.delete("/private/vendor/" + id);
  }
};
