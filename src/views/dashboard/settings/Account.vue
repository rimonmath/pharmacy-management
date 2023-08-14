<script>
import TheButton from "../../../components/TheButton.vue";
import privateService from "../../../service/privateService";
import { showErrorMessage, showSuccessMessage } from "../../../utils/functions";

export default {
  data: () => ({
    getting: true,
    saving: false,
    accountSettings: {
      fullName: "",
      email: "",
      phone: ""
    }
  }),

  methods: {
    getAccountSettings() {
      this.getting = true;
      privateService
        .getAccountSettings()
        .then((res) => {
          if (res.data.fullName) {
            this.accountSettings = res.data;
          }
        })
        .catch((e) => {})
        .finally(() => {
          this.getting = false;
        });
    },

    saveData() {
      this.saving = true;
      privateService
        .updateAccountSettings(this.accountSettings)
        .then((res) => {
          showSuccessMessage(res);
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          this.saving = false;
        });
    }
  },
  components: {
    TheButton
  },

  mounted() {
    setTimeout(this.getAccountSettings, 333);
  }
};
</script>

<template>
  <div class="pt-3">
    <div class="text-center" v-if="getting">Loading...</div>
    <div v-else>
      <label class="block">Full Name</label>
      <input type="text" v-model="accountSettings.fullName" />
      <label class="mt-3 block">Email</label>
      <input type="text" v-model="accountSettings.email" />
      <label class="mt-3 block">Phone</label>
      <input type="text" v-model="accountSettings.phone" />
      <br />
      <TheButton class="inline-block mt-4" :loading="saving" @click="saveData">
        Save
      </TheButton>
    </div>
  </div>
</template>

<style scoped></style>
