<template>
  <div class="d-flex jc-between ai-center">
    <h2>All vendors</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>

  <div class="text-center" v-if="gettingVendors">Loading...</div>
  <table class="mt-4" v-else>
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
          <img
            src="/img/edit.png"
            alt=""
            class="action-icon"
            @click="
              selectedVendor = vendor;
              editModal = true;
            "
          />
          <img
            src="/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
            @click="
              selectedVendor = vendor;
              deleteModal = true;
            "
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
        required
        v-model="newVendor.name"
      />

      <label class="block mt-3">Description</label>
      <input
        type="text"
        placeholder="Write short description"
        class="mt-1 w-100"
        required
        v-model="newVendor.description"
      />

      <the-button :loading="adding" class="w-100 mt-4"> Add </the-button>
    </form>
  </TheModal>

  <TheModal v-model="editModal" heading="Edit vendor">
    <form @submit.prevent="editVendor">
      <label class="block">Vendor Name</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        class="mt-1 w-100"
        required
        v-model="selectedVendor.name"
      />

      <label class="block mt-3">Description</label>
      <input
        type="text"
        placeholder="Write short description"
        class="mt-1 w-100"
        required
        v-model="selectedVendor.description"
      />

      <the-button :loading="editing" class="w-100 mt-4">
        Save Changes
      </the-button>
    </form>
  </TheModal>

  <TheModal v-model="deleteModal" heading="Are you sure?">
    <p>
      Do you really want to delete
      <strong>{{ selectedVendor.name }}</strong>
    </p>

    <TheButton class="mt-4" @click="deleteVendor" :loading="deleting">
      Yes
    </TheButton>
    <TheButton class="ml-4" color="gray" @click="deleteModal = false">
      No
    </TheButton>
  </TheModal>
</template>

<script>
import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";

export default {
  data: () => ({
    addModal: false,
    deleteModal: false,
    editModal: false,

    newVendor: {
      name: "",
      description: ""
    },
    selectedVendor: {},
    deleting: false,
    editing: false,
    adding: false,
    vendors: [],
    gettingVendors: false
  }),
  components: {
    TheButton,
    TheModal
  },

  mounted() {
    this.getAllVendors();
  },
  methods: {
    resetForm() {
      this.newVendor = { name: "", description: "" };
    },
    getAllVendors() {
      this.gettingVendors = true;
      axios
        .get(
          "https://api.rimoned.com/api/pharmacy-management/v1/private/vendor",

          {
            headers: {
              authorization: localStorage.getItem("accessToken")
            }
          }
        )
        .then((res) => {
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
        })
        .finally(() => {
          this.gettingVendors = false;
        });
    },
    addNew() {
      // console.log(localStorage.getItem("accessToken"));
      this.adding = true;
      axios
        .post(
          "https://api.rimoned.com/api/pharmacy-management/v1/private/vendor",
          this.newVendor,
          {
            headers: {
              authorization: localStorage.getItem("accessToken")
            }
          }
        )
        .then((res) => {
          console.log(res.data);
          this.$eventBus.emit("toast", {
            type: "Success",
            message: res.data.message
          });

          this.addModal = false;
          this.resetForm();
          this.getAllVendors();
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
    },
    deleteVendor() {
      this.deleting = true;
      axios
        .delete(
          "https://api.rimoned.com/api/pharmacy-management/v1/private/vendor/" +
            this.selectedVendor._id,

          {
            headers: {
              authorization: localStorage.getItem("accessToken")
            }
          }
        )
        .then((res) => {
          console.log(res.data);
          this.$eventBus.emit("toast", {
            type: "Success",
            message: res.data.message
          });

          this.deleteModal = false;
          this.getAllVendors();
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
          this.deleting = false;
        });
    },
    editVendor() {
      this.editing = true;
      axios
        .put(
          "https://api.rimoned.com/api/pharmacy-management/v1/private/vendor/" +
            this.selectedVendor._id,
          this.selectedVendor,

          {
            headers: {
              authorization: localStorage.getItem("accessToken")
            }
          }
        )
        .then((res) => {
          console.log(res.data);
          this.$eventBus.emit("toast", {
            type: "Success",
            message: res.data.message
          });

          this.editModal = false;
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
          this.editing = false;
        });
    }
  }
};
</script>
