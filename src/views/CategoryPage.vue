<template>
  <div class="products-category mt-10">
    <h1 class="text-center mb-6">{{ $route.params.title }}</h1>

    <v-container>
      <v-card elevation="0" class="pb-5" :loading="loading">
        <v-row>
          <v-col
            cols="12"
            lg="3"
            md="4"
            sm="6"
            class="px-10 px-sm-5 mt-8 mt-lg-0"
            v-for="product in categoryProducts"
            :key="product.id"
          >
            <v-skeleton-loader
              v-if="loading"
              type="image,article,article"
            ></v-skeleton-loader>
            <div class="products" v-if="!loading">
              <img
                :src="
                  selectedImg[product.title]
                    ? selectedImg[product.title]
                    : product.thumbnail
                "
                alt=""
                srcset=""
                class="w-100"
                style="height: 200px"
              />
              <v-card-text class="pl-0">
                <strong>{{ product.title }}</strong>
                {{
                  product.description.split(" ").length <= 7
                    ? product.description
                    : product.description.split(" ").slice(0, 7).join(" ") +
                      "..."
                }}
              </v-card-text>
              <v-rating
                v-model="product.rating"
                half-increments
                readonly
                color="yellow-darken-3"
                density="compact"
                size="small"
              ></v-rating>
              <v-card-text class="pt-0 pl-0">
                <del>${{ product.price }}</del> From $
                <strong style="color: red; font-weight: 900">{{
                  Math.ceil(
                    product.price -
                      product.price * (product.discountPercentage / 100)
                  )
                }}</strong>
              </v-card-text>
              <v-btn-toggle v-model="selectedImg[product.title]">
                <v-btn
                  v-for="(img, i) in product.images"
                  :key="i"
                  :value="img"
                  size="s-small"
                  rounded="xl"
                  class="pl-4"
                >
                  <img
                    :src="img"
                    alt=""
                    srcset=""
                    style="width: 40px; height: 40px; border-radius: 50%"
                /></v-btn>
              </v-btn-toggle>
              <div class="card pt-4">
                <v-btn
                  variant="outlined"
                  class="py-5 px-15 d-flex align-center justify-center"
                  style="text-transform: none; border-radius: 30px"
                  density="compact"
                  @click="
                    $router.push({
                      name: 'Product Details',
                      params: { productID: product.id },
                    })
                  "
                  >More Details</v-btn
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { productModule } from "@/stores/products";
import { mapActions, mapState } from "pinia";

export default {
  data: () => ({
    selectedImg: {},
    loading: false,
  }),
  methods: {
    ...mapActions(productModule, ["getProductsByCategory"]),
  },
  computed: {
    ...mapState(productModule, ["categoryProducts"]),
  },
  watch: {
    async $route() {
      this.loading = true;
      try {
        await this.getProductsByCategory(this.$route.params.category);
      } catch (error) {
        console.error("Error fetching top mobile phones:", error);
        this.error = true; // Assuming you have an error state to manage UI
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      }
    },
  },
  async beforeMount() {
    this.loading = true;
    try {
      await this.getProductsByCategory(this.$route.params.category);
    } catch (error) {
      console.error("Error fetching top mobile phones:", error);
      this.error = true; // Assuming you have an error state to manage UI
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    }
  },
};
// await this.getProductsByCategory(this.$route.params.category);
</script>
