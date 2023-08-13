<script>
import privateService from "../../../service/privateService";
import { showErrorMessage, showSuccessMessage } from "../../../utils/functions";
import TheButton from "../../../components/TheButton.vue";

export default {
  data: () => ({
    getting: true,
    saving: false,
    websiteSettings: {
      shopName: "",
      address: ""
    }
  }),
  components: {
    TheButton
  },
  methods: {
    getWebsiteSettings() {
      this.getting = true;
      privateService
        .getWebsiteSettings()
        .then((res) => {
          if (res.data.shopName) {
            this.websiteSettings = res.data;
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
        .updateWebsiteSettings(this.websiteSettings)
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
  mounted() {
    setTimeout(this.getWebsiteSettings, 333);
  }
};
</script>

<template>
  <div class="pt-3">
    <div class="text-center" v-if="getting">Loading...</div>
    <div v-else>
      <label class="block">Shop Name</label>
      <input type="text" v-model="websiteSettings.shopName" class="w-333" />
      <label class="mt-3 block">Address</label>
      <input type="text" v-model="websiteSettings.address" class="w-333" />
      <br />
      <TheButton class="inline-block mt-4" :loading="saving" @click="saveData">
        Save
      </TheButton>
    </div>
  </div>
</template>

<style scoped></style>
