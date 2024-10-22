<template>
  <div class="app-drawer">
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      width="350"
    >
      <v-container>
        <v-card class="px-0" elevation="0">
          <v-card-title class="px-0 d-flex justify-space-between align-center"
            >Shopping Cart
            <span @click="drawer = false" style="cursor: pointer"
              ><v-icon>mdi-close</v-icon></span
            ></v-card-title
          >

          <v-card-text style="color: #6f6f6f" class="px-0 py-0"
            >{{ cartItems.length }} Items</v-card-text
          >
          <v-card-text
            style="color: #6f6f6f"
            class="px-0"
            v-if="!cartItems.length"
            >Free shipping for all orders over $1000.00</v-card-text
          >
          <v-card-text
            style="color: #6f6f6f"
            class="px-0 text-center"
            v-if="!cartItems.length"
            >Your Cart is empty</v-card-text
          >
          <v-card-actions v-if="!cartItems.length">
            <v-btn
              style="
                text-transform: none;
                border-radius: 30px;
                border-color: #b8b2b2;
              "
              class="w-100"
              variant="outlined"
              density="compact"
              height="45"
              @click="drawer = false"
            >
              Continue Shopping
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="px-0" elevation="0" v-if="cartItems.length">
          <div class="progress mt-3 position-relative">
            <svg
              class="icon-shipping-truck"
              viewBox="0 0 40.55 24"
              width="30"
              :style="`
                position: absolute;
                bottom: 50%;
                z-index: 1;
                left: calc(${
                  parseInt((calcTotalPrice / 10000) * 100) <= 100
                    ? parseInt((calcTotalPrice / 10000) * 100)
                    : 100
                }% - 30px);
                transition: 0.15s all ease-in-out;
              `"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    class="truck-body"
                    fill="#F44336"
                    d="M40.43,11a3.86,3.86,0,0,0-3.68-2.65H28a1.25,1.25,0,0,1-1.43-1.43c0-2.18,0-4.35,0-6.53,0-.31-.08-.36-.37-.36H5.11a1.18,1.18,0,0,0-1.3,1.32c0,.74,0,1.48,0,2.22,0,.21-.06.27-.26.26-.36,0-.71,0-1.07,0a1.19,1.19,0,1,0,0,2.37H7.19c.43,0,.85,0,1.27,0a1,1,0,0,1,1.07,1A1.19,1.19,0,0,1,8.24,8.48H1.35a1.83,1.83,0,0,0-.47,0A1.19,1.19,0,0,0,0,9.85a1.18,1.18,0,0,0,1.19,1h9.66c.34,0,.68,0,1,0A1.19,1.19,0,0,1,13,12.47a1.26,1.26,0,0,1-1.26.76H1.24a1.19,1.19,0,1,0,0,2.38c.76,0,1.51,0,2.26,0,.26,0,.33.07.32.32,0,1,0,2.09,0,3.13A1.18,1.18,0,0,0,5.1,20.36c.63,0,1.26,0,1.9,0,.27,0,.39.06.47.36a4.55,4.55,0,0,0,8.78-.11.29.29,0,0,1,.32-.25H28.09a.3.3,0,0,1,.34.27,4.55,4.55,0,0,0,8.8,0,.31.31,0,0,1,.35-.26c.49,0,1,0,1.47,0a1.37,1.37,0,0,0,1.5-.87V11.41C40.41,11.29,40.47,11.12,40.43,11ZM32.84,21.62A2.18,2.18,0,1,1,35,19.45,2.21,2.21,0,0,1,32.84,21.62Zm-21,0A2.18,2.18,0,1,1,14,19.45,2.2,2.2,0,0,1,11.86,21.62Z"
                  ></path>
                  <path
                    class="truck-body"
                    fill="#F44336"
                    d="M29.27,6h5.85c.1,0,.2,0,.29,0C33.64,2.72,32,.91,28.91.26V.57c0,1.68,0,3.35,0,5C28.9,5.9,29,6,29.27,6Z"
                  ></path>
                  <path
                    class="wheel"
                    fill="white"
                    d="M11.87,17.27A2.18,2.18,0,1,0,14,19.45,2.2,2.2,0,0,0,11.87,17.27Z"
                  ></path>
                  <path
                    class="wheel"
                    fill="white"
                    d="M32.85,17.27A2.18,2.18,0,1,0,35,19.45,2.22,2.22,0,0,0,32.85,17.27Z"
                  ></path>
                </g>
              </g>
            </svg>
            <v-progress-linear
              :color="10000 - calcTotalPrice > 0 ? 'red' : 'green'"
              height="10"
              :model-value="
                parseInt((calcTotalPrice / 10000) * 100) <= 100
                  ? parseInt((calcTotalPrice / 10000) * 100)
                  : 100
              "
              striped
            ></v-progress-linear>
          </div>
          <v-card-text v-if="10000 - calcTotalPrice > 0"
            >Only ${{ 10000 - calcTotalPrice }} away from Free
            Shipping</v-card-text
          >
          <v-card-text v-if="10000 - calcTotalPrice <= 0"
            >You Got A Free Shipping</v-card-text
          >
          <v-row v-for="item in cartItems" :key="item.id">
            <v-col cols="5">
              <img :src="item.thumbnail" class="w-100" alt="" />
            </v-col>
            <v-col cols="7">
              <v-card-title style="white-space: pre-wrap; font-size: 14px"
                >{{ item.title }}
              </v-card-title>
              <v-card-text>Category: {{ item.category }}</v-card-text>
              <v-card-text
                >Price:
                {{
                  Math.ceil(
                    item.price - item.price * (item.discountPercentage / 100)
                  ) * item.quantity
                }}</v-card-text
              >
              <div
                class="counter-parent d-flex align-center justify-start"
                style="gap: 10px"
              >
                <div
                  class="counter px-1"
                  style="
                    border-radius: 30px;
                    border: 1px solid rgb(201, 201, 201);
                    width: fit-content;
                  "
                >
                  <v-icon
                    size="20"
                    @click="item.quantity > 1 ? item.quantity-- : false"
                    >mdi-minus</v-icon
                  >
                  <input
                    type="number"
                    style="
                      border: none;
                      outline: none;
                      width: 35px;
                      font-size: 12px;
                    "
                    class="text-center py-3"
                    min="1"
                    v-model="item.quantity"
                  />
                  <v-icon
                    size="20"
                    @click="
                      item.quantity < item.stock ? item.quantity++ : false
                    "
                    >mdi-plus</v-icon
                  >
                </div>
                <span style="color: red">{{
                  item.quantity == item.stock ? "MAX" : ""
                }}</span>
                <!-- item.id -->
                <v-icon style="cursor: pointer" @click="showAlert(item.id)"
                  >mdi-close</v-icon
                >
              </div>
            </v-col>
          </v-row>
          <v-card-text class="d-flex justify-space-between align-center mt-4"
            ><span style="font-size: 16px; font-weight: 900">Total</span
            ><span style="font-size: 20px; font-weight: 900"
              >${{ calcTotalPrice }}</span
            ></v-card-text
          >
          <v-card-actions
            style="
              display: flex;
              justify-items: center;
              align-items: center;
              flex-direction: column;
            "
          >
            <v-btn
              style="
                border-radius: 30px;
                border-color: rgb(199, 199, 199);
                text-transform: none;
              "
              class="w-100"
              density="compact"
              variant="elevated"
              elevation="0"
              height="45"
              color="blue"
              @click="toCheckOut"
              >Check Out</v-btn
            >
            <v-btn
              style="
                border-radius: 30px;
                border-color: rgb(199, 199, 199);
                text-transform: none;
              "
              class="w-100"
              density="compact"
              variant="outlined"
              height="45"
              @click="$router.push({ name: 'Cart Page' })"
              >View Cart</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-container>

      <!-- <v-btn @click="deleteAllCartItems">Delete All</v-btn> -->
    </v-navigation-drawer>
  </div>
</template>
<script>
import { cartModule } from "@/stores/cart";
import { mapActions, mapState } from "pinia";

export default {
  inject: ["Emitter"],
  data: () => ({
    drawer: false,
  }),

  computed: {
    ...mapState(cartModule, ["cartItems"]),
    calcTotalPrice() {
      let total = 0;
      this.cartItems.map((cartItem) => {
        total +=
          Math.ceil(
            cartItem.price -
              cartItem.price * (cartItem.discountPercentage / 100)
          ) * cartItem.quantity;
      });
      return total;
    },
  },
  methods: {
    ...mapActions(cartModule, [
      "showCartItems",
      "deleteAllCartItems",
      "deleteCartItem",
      "setToLocalStorage",
    ]),
    toCheckOut() {
      this.setToLocalStorage();
      this.$router.push({ name: "CheckOut" });
    },
    showAlert(item) {
      const id = item;
      this.$swal({
        title: "Delete thie Produce?",
        text: "Sure Delete this product",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#f44336",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value) {
          this.deleteCartItem(id);
        } else {
          this.$swal("Cancelled", "Your file has been saved", "info");
        }
      });
    },
  },
  mounted() {
    this.Emitter.on("openCart", () => {
      this.drawer = !this.drawer;
    });
    this.showCartItems();
  },
};
</script>
<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
