<template>
  <div class="new-products mt-8">
    <v-container fluid>
      <div class="new-products-title d-flex align-center justify-space-between">
        <h2>New Products</h2>
        <a href="/category/laptops/Laptops">Show All</a>
      </div>
      <v-row>
        <v-col cols="7">
          <Swiper
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :modules="modules"
            :slides-per-view="3"
            :space-between="35"
            class="pb-9"
            :breakpoints="breakpoints"
          >
            <swiper-slide v-for="product in laptops" :key="product.id">
              <v-skeleton-loader
                v-if="loading"
                type="image,article,article"
              ></v-skeleton-loader>
              <v-card elevation="0" class="pb-5" v-if="!loading">
                <div class="img-parent position-relative" style="height: 200px">
                  <img
                    :src="product.thumbnail"
                    alt=""
                    srcset=""
                    class="w-100"
                    style="height: 100%"
                  />
                  <!-- Quick View Button -->
                  <v-btn
                    density="compact"
                    width="80"
                    height="40"
                    variant="outlined"
                    class="bg-white quick-view-btn"
                    style="
                      text-transform: none;
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      transform: translate(-50%, -50%);
                      border-radius: 30px;
                      font-size: 12px;
                      transition: 1s all ease-in-out;
                      opacity: 0;
                    "
                    @click="openQuickView(product)"
                  >
                    Quick View</v-btn
                  >
                </div>
                <v-card-text class="pl-0" style="height: 100px">
                  <strong>{{ product.title }}</strong>
                  {{
                    product.description.split(" ").slice(0, 9).join(" ") + "..."
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

                <div class="card pt-4">
                  <v-btn
                    variant="outlined"
                    class="py-5 px-11 d-flex align-center justify-center"
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
              </v-card>
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </Swiper>
        </v-col>
        <v-col cols="5">
          <div class="banner-img">
            <img src="@/assets/images/vr-banner.webp" alt="" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { mapActions, mapState } from "pinia";
import { productModule } from "@/stores/products";

export default {
  inject: ["Emitter"],
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  data: () => ({
    loading: false,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },

      767: {
        slidesPerView: 2,
      },
      990: {
        slidesPerView: 2,
      },
    },
  }),
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapState(productModule, ["laptops"]),
  },
  methods: {
    ...mapActions(productModule, ["getTopLaptops"]),
    openQuickView(product) {
      this.Emitter.emit("openQuickView", product);
    },
  },
  async mounted() {
    this.loading = true;
    try {
      await this.getTopLaptops();
    } catch (error) {
      console.error("Error fetching top mobile phones:", error);
      this.error = true;
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    }
  },
};
</script>

<style lang="scss" scoped>
.img-parent:hover {
  .quick-view-btn {
    opacity: 1 !important;
  }
}
@media (max-width: 866px) {
  .new-products {
    .v-btn-group {
      gap: 20px;
      display: flex;
      justify-content: center;
    }
    .v-card-text {
      text-align: center;
    }
    .v-rating {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2%;
    }
    .card {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

@media (max-width: 768px) {
  .new-products {
    .v-btn-group {
      gap: 20px;
      display: flex;
      justify-content: center;
    }
    .v-card-text {
      text-align: center;
    }
    .v-rating {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2%;
    }
    .card {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
@media (max-width: 580px) {
  .new-products {
    .img-parent {
      height: 200px !important;
      width: 100% !important;
      img {
        width: 100% !important;
      }
    }
    .banner-img {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 90%;
        height: 90%;
      }
    }

    .v-btn-group {
      gap: 10px;
      display: flex;
      justify-content: center;
    }
    .v-card-text {
      text-align: center;
    }
    .v-rating {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2%;
    }
    .card {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
