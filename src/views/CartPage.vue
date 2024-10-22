<template>
  <div class="cart-page">
    <v-container fluid>
      <div
        class="empty-cart d-flex justify-center align-center flex-column w-100"
        style="height: 65vh; gap: 20px"
        v-if="!cartItems.length"
      >
        <h2>Your Cart Is Empty😢</h2>
        <v-btn
          style="border-color: black; text-transform: none"
          class="w-25"
          density="compact"
          variant="outlined"
          elevation="0"
          height="45"
          @click="$router.push({ name: 'home' })"
          >Continue Shopping</v-btn
        >
      </div>

      <v-row v-if="cartItems.length">
        <v-col cols="12" class="pb-0">
          <v-breadcrumbs :items="['Home', 'Your Cart']" style="font-size: 14px">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
        <v-col cols="12" class="pt-0">
          <v-card-title
            class="d-flex justify-space-between align-center w-100 pl-0 pr-2"
            style="font-size: 35px; font-weight: bold"
            >Your Cart</v-card-title
          >
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
        </v-col>
        <v-col cols="12" lg="8">
          <v-table class="w-100">
            <thead style="background-color: #ededed">
              <tr>
                <th style="font-size: 12px; font-weight: bold">PRODUCT</th>
                <th style="font-size: 12px; font-weight: bold">PRICE</th>
                <th style="font-size: 12px; font-weight: bold">QUANTITY</th>
                <th style="font-size: 12px; font-weight: bold">TOTAL</th>
                <th style="font-size: 12px; font-weight: bold"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItems" :key="item.id">
                <td style="width: 55%">
                  <v-row class="align-center" style="margin: 0 !important">
                    <v-col cols="12" lg="5" sm="4">
                      <img :src="item.thumbnail" class="w-100" alt="" />
                    </v-col>
                    <v-col cols="12" lg="7" sm="8">
                      <v-card-title
                        style="white-space: pre-wrap; font-size: 14px"
                        >{{ item.title }}
                      </v-card-title>
                      <v-card-text>Category: {{ item.category }}</v-card-text>
                    </v-col>
                  </v-row>
                </td>
                <td style="width: 15%">
                  <v-card-text>
                    ${{
                      Math.ceil(
                        item.price -
                          item.price * (item.discountPercentage / 100)
                      )
                    }}</v-card-text
                  >
                </td>
                <td style="width: 15%">
                  <div
                    class="counter-parent d-flex align-center justify-start"
                    style="gap: 10px"
                  >
                    <div
                      class="counter px-1"
                      style="
                        border-radius: 30px;
                        border: 1px solid rgb(201, 201, 201);
                        width: max-content;
                        display: flex;
                        align-items: center;
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
                          width: 30px;
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
                  </div>
                </td>
                <td style="width: 15%; font-weight: 900">
                  ${{
                    Math.ceil(
                      item.price - item.price * (item.discountPercentage / 100)
                    ) * item.quantity
                  }}
                </td>
                <td>
                  <v-icon style="cursor: pointer" @click="showAlert(item.id)"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-col cols="12">
            <v-card-text class="d-flex" style="gap: 10px">
              <span>
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 179.94 179.96"
                  class="icon icon-shield-check"
                  width="20"
                >
                  <path
                    d="M90,0,5,42.78C13.73,105.26,38.14,154.32,90,180c51.83-25.64,76.25-74.7,85-137.18Z"
                  ></path>
                  <polygon
                    fill="white"
                    class="cls-1"
                    points="149.83 67.57 134.81 52.55 79.31 108.05 49.74 78.48 34.72 93.5 79.15 137.94 79.31 137.78 79.47 137.94 149.83 67.57"
                  ></polygon>
                </svg>
              </span>
              <span>Secure Shopping Guarantee</span>
            </v-card-text>
            <img
              src="@/assets/images/cart-page-cards.webp"
              alt=""
              srcset=""
              width="270"
            />
          </v-col>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card elevation="0">
            <v-card-title>ORDER SUMMARY</v-card-title>
            <v-divider lenght="100%" color="black"></v-divider>
            <v-divider lenght="100%" color="black"></v-divider>
            <v-divider lenght="100%" color="black"></v-divider>
            <v-divider lenght="100%" color="black"></v-divider>
            <v-card-text class="d-flex justify-space-between align-center">
              <span>Sub-Total</span>
              <span class="font-weight-bold">${{ calcTotalPrice }}</span>
            </v-card-text>
            <v-divider lenght="100%" color="black"></v-divider>
            <v-divider lenght="100%" color="black"></v-divider>
            <v-card-text>Get Shipping Estimate :</v-card-text>
            <div class="drop-down">
              <select
                v-model="selectedCountry"
                name=""
                id=""
                class="w-100 pa-2"
                style="
                  border: 1px solid rgb(184, 184, 184);
                  border-radius: 30px;
                  font-size: 14px;
                "
              >
                <option
                  v-for="country in countries"
                  :key="country.name"
                  :value="country"
                >
                  {{ country.name }}
                </option>
                <option value="" disabled>Please Select Country</option>
              </select>
            </div>
            <div
              class="states-info d-flex justify-space-around align-center mt-4"
            >
              <div class="states" style="width: 55%">
                <select
                  :disabled="!selectedCountry"
                  name=""
                  id=""
                  class="pa-2"
                  style="
                    border: 1px solid rgb(184, 184, 184);
                    border-radius: 30px;
                    font-size: 14px;
                    width: 100%;
                  "
                >
                  <option
                    v-for="option in selectedCountry.district"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                  <option value="" v-if="!countryDistrict.length == 0">
                    No Option Available
                  </option>
                </select>
              </div>
              <input
                type="text"
                class="pa-2"
                placeholder="Postal Code"
                style="
                  border: 1px solid rgb(184, 184, 184);
                  border-radius: 30px;
                  font-size: 14px;
                  width: 40%;
                "
              />
            </div>
            <v-card-actions style="" class="mt-5">
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
                >Calculate Shipping</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-card-text class="d-flex justify-space-between align-center">
            <span style="font-size: 18px">Total</span>
            <span class="font-weight-bold" style="font-size: 20px"
              >${{ calcTotalPrice }}</span
            >
          </v-card-text>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-card-text class="">
            <span style="font-size: 13px; color: rgb(184, 184, 184)"
              >Tax included and shipping calculated checkedout</span
            >
            <div class="agree-terms mt-3" style="gap: 15px">
              <label class="custom-checkbox">
                <input type="checkbox" v-model="isChecked" />
                <span class="checkmark"></span>
                <span
                  >I agree with
                  <a href="" style="color: black">Terms & Conditions</a></span
                >
              </label>
            </div>
          </v-card-text>
          <v-card-actions
            style=""
            class="mt-1 d-flex flex-column justify-center align-center"
          >
            <v-btn
              style="border-color: rgb(199, 199, 199); text-transform: none"
              class="w-100"
              density="compact"
              variant="elevated"
              elevation="0"
              height="45"
              color="blue"
              @click="toCheckOut"
              >Processed To Check Out</v-btn
            >
            <v-btn
              style="border-color: black; text-transform: none"
              class="w-100"
              density="compact"
              variant="outlined"
              elevation="0"
              height="45"
              @click="$router.push({ name: 'home' })"
              >Continue Shopping</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { cartModule } from "@/stores/cart";
import { mapActions, mapState } from "pinia";

export default {
  data: () => ({
    countries: [
      { name: "EGYPT", district: ["Nasr City", "Giza", "Beni Suef"] },
      { name: "United States", district: ["Califonia", "Vegas", "Los Angles"] },
    ],
    selectedCountry: "",
    isChecked: false,
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
    countryDistrict() {
      const district = this.countries.find(
        (district) => district.name == this.selectedCountry
      );
      return district ? district.district : [];
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
    this.showCartItems();
  },
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.drop-down,
.states {
  position: relative;
  &:after {
    border-color: black transparent transparent transparent;
    border-style: solid;
    border-width: 5px;
    content: "";
    position: absolute;
    pointer-events: none;
    top: 50%;
    transform: translate(-50%, -50%);
    right: 8px;
    z-index: 1000;
  }
}
.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  user-select: none;

  // Hide the default checkbox
  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
  }

  // Custom checkmark box with white background
  .checkmark {
    width: 15px;
    height: 15px;
    background-color: white; // White background by default
    border: 1px solid black; // Black border to indicate the checkbox
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-right: 10px;

    // Checkmark symbol (hidden by default)
    &::after {
      content: "";
      position: absolute;
      display: none;
      left: 5px;
      top: 0;
      width: 7px;
      height: 12px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  // When the checkbox is checked
  input:checked + .checkmark {
    background-color: black; // Change background to black
    border-color: black; // Border color changes to black

    // Show white checkmark when checked
    &::after {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
