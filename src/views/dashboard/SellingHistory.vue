<template>
  <div>
    <h2>Selling History</h2>
    {{ history }}
  </div>
</template>

<script>
import privateService from "../../service/privateService";
export default {
  data: () => ({
    gettingHistory: false,
    history: []
  }),
  mounted() {
    setTimeout(this.getAllHistory, 100);
  },
  methods: {
    getAllHistory() {
      this.gettingHistory = true;
      privateService
        .getHistory()
        .then((res) => {
          this.history = res.data;
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          this.gettingHistory = false;
        });
    }
  }
};
</script>
