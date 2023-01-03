<template>
  <h2>Overview</h2>
  {{ projectName }} <br />
  VisitCount: {{ visitCount }}
  <button @click="increase">Count +</button>
</template>

<script>
import { infoStore } from "../../data/info";

export default {
  data: () => ({
    projectName: infoStore.projectName,
    visitCount: infoStore.visitCount
  }),
  methods: {
    increase() {
      infoStore.visitCount += 1;
      console.log(infoStore);
    }
  }
};
</script>
