import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: "anonymous",
    accessToken: "",
    refreshToken: ""
  }),
  getters: {
    //   doubleCount: (state) => state.count * 2,
  },
  actions: {
    //   increment() {
    //     this.count++
    //   },
    login(payload) {
      console.log(payload);
      this.username = payload.username;
      this.accessToken = payload.accessToken;
      this.refreshToken = payload.refreshToken;
    }
  }
});
