<template>
  <h2>Overview</h2>
  {{ projectName }} <br />
  VisitCount: {{ visitCount }}
  <button @click="increase">Count +</button>
  <br />
  logged is as {{ username }}
</template>

<script>
import { infoStore } from "../../data/info";
import { mapState } from "pinia";
import { useAuthStore } from "../../store/authStore";

export default {
  data: () => ({
    projectName: infoStore.projectName,
    visitCount: infoStore.visitCount
  }),
  computed: {
    ...mapState(useAuthStore, {
      username: "username"
    })
  },
  methods: {
    increase() {
      infoStore.visitCount += 1;
      console.log(infoStore);
    }
  }
};
</script>
