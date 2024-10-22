<template>
  <div class="fixed-nav">
    <v-app-bar color="#02218f" height="fit-content" class="">
      <v-container fluid="">
        <v-row class="align-center">
          <v-col cols="2">
            <img
              src="@/assets/images/logo.png"
              alt=""
              class="w-50"
              style="cursor: pointer"
              @click="$router.push({ name: 'home' })"
            />
          </v-col>
          <v-col cols="8">
            <ul class="links">
              <li v-for="category in categoriesRoutes" :key="category.title">
                <router-link
                  style="color: white; text-decoration: none"
                  :to="{
                    name: 'category',
                    params: { category: category.route, title: category.title },
                  }"
                  >{{ category.title }}</router-link
                >
              </li>
            </ul>
          </v-col>
          <v-col
            cols="2"
            class="d-flex justify-end align-center"
            style="gap: 20px"
          >
            <svg
              fill="white"
              data-icon="search"
              viewBox="0 0 512 512"
              width="100%"
              height="100%"
              style="width: 25px"
            >
              <path
                d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z"
              ></path>
            </svg>
            <div
              class="cart d-flex flex-column justify-center align-center"
              :style="`cursor: pointer;pointer-events: ${
                $route.name == 'Cart Page' ? 'none' : 'unset'
              }`"
              @click="openCart"
            >
              <v-badge
                v-if="cartItems.length"
                location="right top"
                :content="cartItems.length"
                color="blue"
                offsetX="-15"
                offsetY="-7"
              ></v-badge>
              <v-icon color="#ffb547">mdi-cart-arrow-down</v-icon>
              <span color="#ffb547">Cart</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { cartModule } from "@/stores/cart";
import { productModule } from "@/stores/products";
import { mapState } from "pinia";

export default {
  inject: ["Emitter"],
  computed: {
    ...mapState(productModule, ["categoriesRoutes"]),
    ...mapState(cartModule, ["cartItems"]),
  },
  methods: {
    openCart() {
      this.Emitter.emit("openCart");
    },
  },
};
</script>

<style scoped lang="scss">
.links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 30px;
}
</style>
