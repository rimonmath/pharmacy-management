<template>
  <div>
    <h2>Selling History</h2>
    <div class="text-center" v-if="gettingHistory">Loading...</div>
    <table class="mt-4" v-else>
      <tr>
        <th>Order ID</th>
        <th>Customer Name</th>
        <th>Customer Phone</th>
        <th>Total Items</th>
        <th>Action</th>
      </tr>

      <tr v-for="(orderHistory, i) in history" :key="orderHistory._id">
        <td>{{ orderHistory._id }}</td>
        <td>{{ orderHistory.customer }}</td>
        <td>{{ orderHistory.phone }}</td>
        <td>{{ Object.keys(orderHistory.cartItems).length }}</td>
        <td>
          <img
            src="/img/eye.png"
            class="action-icon action-icon--delete ml-3"
            alt=""
            @click="
              selectedOrderHistoryIndex = i;
              detailsModal = true;
            "
          />
          <img
            src="/img/trash.png"
            class="action-icon action-icon--delete ml-3"
            alt=""
            @click="
              selectedOrderHistoryIndex = i;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </table>

    <TheModal v-model="detailsModal" heading="Order Details" size="lg">
      <div class="d-flex jc-between">
        <div>
          <strong>Customer: </strong>{{ selectedOrderHistory.customer }}
        </div>
        <div><strong>Phone:</strong> {{ selectedOrderHistory.phone }}</div>
      </div>
      <h3 class="mt-4 mb-2">Cart Items</h3>
      <div class="mt-2">
        <table>
          <tr>
            <th>Item</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Qty</th>
            <th class="text-right">Total</th>
          </tr>
          <tr v-for="item in selectedOrderHistory.cartItems" :key="item.name">
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.weight }}
            </td>
            <td>
              {{ item.price }}
            </td>

            <td>
              {{ item.quantity }}
            </td>

            <td class="text-right">
              {{ item.quantity * item.price }}
            </td>
          </tr>

          <tr>
            <td colspan="6">
              <div class="text-right">
                <hr />
                <strong>Grand Total : {{ totalPrice }}</strong>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </TheModal>

    <TheModal v-model="deleteModal" heading="Are you sure?">
      <p>Do you really want to delete "{{ selectedOrderHistory.customer }}"?</p>
      <div class="mt-3">
        <TheButton @click="deleteHistory" :loading="deleting">Yes</TheButton>
        <TheButton color="gray" class="ml-4" @click="deleteModal = false">
          No
        </TheButton>
      </div>
    </TheModal>
  </div>
</template>

<script>
import privateService from "../../service/privateService";
import TheModal from "../../components/TheModal.vue";
import TheButton from "../../components/TheButton.vue";
import { showErrorMessage, showSuccessMessage } from "../../utils/functions";

export default {
  components: {
    TheModal,
    TheButton
  },
  data: () => ({
    history: [],
    gettingHistory: true,
    deleting: false,
    deleteModal: false,
    detailsModal: false,
    selectedOrderHistoryIndex: -1
  }),
  computed: {
    selectedOrderHistory() {
      return this.history[this.selectedOrderHistoryIndex] || { cartItems: {} };
    },

    totalPrice() {
      // return 0;
      let tp = 0;

      for (let key in this.selectedOrderHistory.cartItems) {
        tp +=
          this.selectedOrderHistory.cartItems[key].price *
          this.selectedOrderHistory.cartItems[key].quantity;
      }

      return tp;
    }
  },
  methods: {
    getHistory() {
      this.gettingHistory = true;
      privateService
        .getHistory()
        .then((res) => {
          this.history = res.data;
        })
        .catch((e) => {})
        .finally(() => {
          this.gettingHistory = false;
        });
    },
    deleteHistory() {
      this.deleting = true;
      privateService
        .deleteHistory(this.selectedOrderHistory._id)
        .then((res) => {
          showSuccessMessage(res);
          this.deleteModal = false;
          this.getHistory();
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          this.deleting = false;
        });
    }
  },

  mounted() {
    setTimeout(this.getHistory, 333);
  }
};
</script>
