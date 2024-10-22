<template>
  <div class="product-details">
    <v-dialog v-model="dialog" width="900">
      <v-icon
        style="
          position: absolute;
          right: -10px;
          top: -10px;
          background-color: black;
          color: white;
          cursor: pointer;
          z-index: 10;
        "
        @click="dialog = false"
        >mdi-close</v-icon
      >
      <v-container fluid class="bg-white" style="overflow: auto">
        <h1 class="mb-6 ml-5">{{ product.title }}</h1>
        <v-row>
          <v-col cols="12" sm="6" class="details">
            <v-skeleton-loader
              v-if="loading"
              type="image,image,image"
            ></v-skeleton-loader>
            <img
              v-if="!loading"
              :src="product.thumbnail"
              alt=""
              srcset=""
              class="w-100"
              style="height: 400px"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-skeleton-loader
              v-if="loading"
              type="article,article,article"
            ></v-skeleton-loader>
            <v-card elevation="0" v-if="!loading">
              <v-card-title
                style="font-size: 18px; font-weight: bold"
                class="px-0"
              >
                ({{ product.title }}) Sample - {{ product.category }} for sale
              </v-card-title>
              <div
                class="rating-parent d-flex justify-start align-center"
                style="gap: 15px"
              >
                <v-rating
                  v-model="product.rating"
                  half-increments
                  readonly
                  color="yellow-darken-3"
                  density="compact"
                  size="small"
                ></v-rating>
                <span style="font-size: 13px">Stock {{ product.stock }}</span>
              </div>
              <v-card-text style="font-size: 13px" class="px-0">{{
                product.description
              }}</v-card-text>
              <v-card-text style="font-size: 13px" class="px-0"
                >Brand : {{ product.brand }}</v-card-text
              >
              <v-card-text style="font-size: 13px" class="px-0">{{
                product.stock > 0 ? "In Stock" : "Out of stock"
              }}</v-card-text>
              <v-card-text class="pt-0 pl-0">
                <del>${{ product.price }}</del> From $
                <strong style="color: red; font-weight: 900">{{
                  Math.ceil(
                    product.price -
                      product.price * (product.discountPercentage / 100)
                  ) * quantity
                }}</strong>
              </v-card-text>
              <v-card-text class="pl-0 pt-0"> Quantity </v-card-text>
              <div
                class="counter-parent d-flex align-center justify-start"
                style="gap: 20px"
              >
                <div
                  class="counter px-2"
                  style="
                    border-radius: 30px;
                    border: 1px solid rgb(201, 201, 201);
                    width: fit-content;
                    display: flex;
                    align-items: center;
                  "
                >
                  <v-icon size="22" @click="quantity > 1 ? quantity-- : false"
                    >mdi-minus</v-icon
                  >
                  <input
                    type="number"
                    style="
                      border: none;
                      outline: none;
                      width: 60px;
                      font-size: 12px;
                    "
                    class="text-center py-3"
                    min="1"
                    v-model="quantity"
                  />
                  <v-icon
                    size="22"
                    @click="quantity < product.stock ? quantity++ : false"
                    >mdi-plus</v-icon
                  >
                </div>
                <span>{{ quantity == product.stock ? "MAX" : "" }}</span>
              </div>

              <v-card-actions class="mt-7 w-100">
                <v-btn
                  variant="outlined"
                  style="
                    text-transform: none;
                    border-radius: 30px;
                    background-color: black;
                  "
                  class="w-75 text-white"
                  density="compact"
                  height="50px"
                  :loading="btnLoading"
                  @click="addItem(product)"
                  >Add to Cart</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import { Pagination, Navigation, Autoplay } from "swiper";
import { mapActions } from "pinia";
import { cartModule } from "@/stores/cart";

export default {
  inject: ["Emitter"],
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  components: {},
  data: () => ({
    loading: false,
    selectedImg: {},
    quantity: 1,
    dialog: false,
    product: "",
    btnLoading: false,
  }),
  methods: {
    ...mapActions(cartModule, ["addToCart"]),
    addItem(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addToCart(item);
      }, 1000);
    },
  },
  mounted() {
    this.Emitter.on("openQuickView", (data) => {
      this.loading = true;
      this.product = data;
      this.dialog = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  },
};
</script>

<style lang="scss">
.product-details {
  .details {
    .swiper-button-next,
    .swiper-button-prev {
      transition: 1s;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      top: 38%;
      &::after {
        font-size: 15px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:hover {
        background-color: rgb(63, 56, 56);
      }
    }
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
