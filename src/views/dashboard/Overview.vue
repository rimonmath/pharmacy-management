<template>
  <h2>Overview</h2>
  <p>Project Name: {{ projectName }}</p>
  <p>Visit Count: {{ visitCount }}</p>
  <hr />
  <p>Username: {{ username }}</p>
  <p>Access Token: {{ accessToken }}</p>
  <p>Refresh Token: {{ refreshToken }}</p>
</template>

<script>
import { infoStore } from "../../store/info";
import { useAuthStore } from "../../store/authStore";
import { mapState } from "pinia";

export default {
  data: () => ({
    projectName: infoStore.projectName,
    visitCount: infoStore.visitCount
  }),
  computed: {
    ...mapState(useAuthStore, {
      username: "username",
      accessToken: "accessToken",
      refreshToken: "refreshToken"
    })
  }
};
</script>
