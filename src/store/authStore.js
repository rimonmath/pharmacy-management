import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: "",
    accessToken: "",
    refreshToken: ""
  }),
  getters: {
    isLoggedIn(state) {
      return state.username && state.accessToken ? true : false;
    }
  },
  actions: {
    login(payload) {
      this.username = payload.username;
      this.accessToken = payload.accessToken;
      this.refreshToken = payload.refreshToken;
    }
  }
});
