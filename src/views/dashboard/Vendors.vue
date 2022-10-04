<template>
  <div class="d-flex jc-between ai-center">
    <h2>All vendors</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>

  <table class="mt-4">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vendor in vendors" :key="vendor.name">
        <td>
          {{ vendor.name }}
        </td>
        <td>{{ vendor.description }}</td>
        <td>
          <img src="/img/edit.png" alt="" class="action-icon" />
          <img
            src="/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <TheModal v-model="addModal" heading="Add new vendor">
    <form @submit.prevent="addNew">
      <label class="block">Vendor Name</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        class="mt-1 w-100"
        v-model="newVendor.name"
        required
      />

      <label class="block mt-3">Description</label>
      <input
        type="text"
        placeholder="Write vendor short description"
        class="mt-1 w-100"
        v-model="newVendor.description"
        required
      />

      <TheButton class="w-100 mt-4" :loading="adding"> Add </TheButton>
    </form>
  </TheModal>
</template>

<script>
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import axios from "axios";

export default {
  data: () => ({
    addModal: false,
    vendors: [],
    newVendor: {
      name: "",
      description: ""
    },
    adding: false
  }),
  components: {
    TheButton,
    TheModal
  },
  mounted() {
    this.getAllVendors();
  },
  methods: {
    getAllVendors() {
      axios
        .get(
          "http://localhost:3009/api/pharmacy-management/v1/private/vendor",
          {
            headers: {
              authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjQ4OTM0OTIsImRhdGEiOnsib3JkZXJJZCI6IjYyZmQ4NTQ1YmI4YWFkM2JlNDJhN2YzNSIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJzdGF0dXMiOiJBY3RpdmUifSwiaWF0IjoxNjY0ODg5ODkyfQ.gAjmeg_rHt5yhidMhcA2q4NbowfczfuDI5w-txPXKXo"
            }
          }
        )
        .then((res) => {
          console.log(res.data);
          this.vendors = res.data;
        })
        .catch((err) => {
          let errorMessage = "Something went wrong!";
          if (err.response) {
            errorMessage = err.response.data.message;
          }

          this.$eventBus.emit("toast", {
            type: "Error",
            message: errorMessage
          });
        });
    },
    addNew() {
      // console.log(this.newVendor);
      this.adding = true;
      axios
        .post(
          "http://localhost:3009/api/pharmacy-management/v1/private/vendor",
          this.newVendor,
          {
            headers: {
              authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjQ4OTM0OTIsImRhdGEiOnsib3JkZXJJZCI6IjYyZmQ4NTQ1YmI4YWFkM2JlNDJhN2YzNSIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJzdGF0dXMiOiJBY3RpdmUifSwiaWF0IjoxNjY0ODg5ODkyfQ.gAjmeg_rHt5yhidMhcA2q4NbowfczfuDI5w-txPXKXo"
            }
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          let errorMessage = "Something went wrong!";
          if (err.response) {
            errorMessage = err.response.data.message;
          }

          this.$eventBus.emit("toast", {
            type: "Error",
            message: errorMessage
          });
        })
        .finally(() => {
          this.adding = false;
        });
    }
  }
};
</script>
