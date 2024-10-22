<template>
  <div class="product-details">
    <v-container fluid>
      <h1 class="mb-6 ml-5">{{ productById.title }}</h1>
      <v-row>
        <v-col cols="12" md="6" class="details">
          <img
            :src="productById.thumbnail"
            alt=""
            srcset=""
            class="w-100"
            style="height: 400px"
            v-if="!loading"
          />
          <!-- Loader -->
          <v-skeleton-loader
            v-if="loading"
            type="image,image,image"
          ></v-skeleton-loader>
          <!-- <Swiper
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :modules="modules"
            :slides-per-view="4"
            :space-between="35"
            class="pb-9 details"
            :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
            :autoplay="{ delay: 3000 }"
          >
            <swiper-slide
              v-for="product in productById.images"
              :key="product.id"
            >
              <v-card elevation="0" class="pb-5">
                <img
                  :src="
                    selectedImg[product.title]
                      ? selectedImg[product.title]
                      : product
                  "
                  alt=""
                  srcset=""
                  class="w-50 mx-3 mt-4"
                  height="55"
                  style=""
                />
              </v-card>
            </swiper-slide>
          </Swiper> -->
        </v-col>
        <v-col cols="12" md="6">
          <!-- loader -->
          <v-skeleton-loader
            v-if="loading"
            type="article,article,article"
          ></v-skeleton-loader>
          <v-card elevation="0" v-if="!loading">
            <v-card-title
              style="font-size: 18px; font-weight: bold"
              class="px-0"
            >
              ({{ productById.title }}) Sample - {{ productById.category }} for
              sale
            </v-card-title>
            <div
              class="rating-parent d-flex justify-start align-center"
              style="gap: 15px"
            >
              <v-rating
                v-model="productById.rating"
                half-increments
                readonly
                color="yellow-darken-3"
                density="compact"
                size="small"
              ></v-rating>
              <span style="font-size: 13px">Stock {{ productById.stock }}</span>
            </div>
            <v-card-text style="font-size: 13px" class="px-0">{{
              productById.description
            }}</v-card-text>
            <v-card-text style="font-size: 13px" class="px-0"
              >Brand : {{ productById.brand }}</v-card-text
            >
            <v-card-text style="font-size: 13px" class="px-0">{{
              productById.stock > 0 ? "In Stock" : "Out of stock"
            }}</v-card-text>
            <v-card-text class="pt-0 pl-0">
              <del>${{ productById.price }}</del> From $
              <strong style="color: red; font-weight: 900">{{
                Math.ceil(
                  productById.price -
                    productById.price * (productById.discountPercentage / 100)
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
                  @click="quantity < productById.stock ? quantity++ : false"
                  >mdi-plus</v-icon
                >
              </div>
              <span>{{ quantity == productById.stock ? "MAX" : "" }}</span>
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
                @click="addItem(productById)"
                >Add to Cart</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Pagination, Navigation, Autoplay } from "swiper";
import { mapActions, mapState } from "pinia";
import { productModule } from "@/stores/products";
import { cartModule } from "@/stores/cart";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
export default {
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  components: {
    VSkeletonLoader,
  },
  data: () => ({
    selectedImg: {},
    quantity: 1,
    loading: false,
    btnLoading: false,
  }),
  methods: {
    ...mapActions(productModule, ["getProductsByID"]),
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
  computed: {
    ...mapState(productModule, ["productById"]),
  },
  watch: {
    async $route() {
      await this.getProductsByID(this.$route.params.productID);
    },
  },
  async mounted() {
    this.loading = true;
    await this.getProductsByID(this.$route.params.productID);
    this.loading = false;
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
