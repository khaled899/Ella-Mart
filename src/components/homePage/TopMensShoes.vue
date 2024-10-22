<template>
  <div class="top-mens-shoes mt-5">
    <v-container fluid>
      <div
        class="top-mens-shoes-title d-flex align-center justify-space-between mb-7"
      >
        <h2>Top Mens Shoes</h2>
        <a href="/category/mens-shoes/Mens Shoes">Show All</a>
      </div>
      <Swiper
        :pagination="{ el: '.swiper-pagination', clickable: true }"
        :modules="modules"
        :slides-per-view="4"
        :space-between="35"
        class="pb-9"
        :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
        :autoplay="{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }"
        :breakpoints="breakpoints"
      >
        <swiper-slide v-for="product in mensShoes" :key="product.id">
          <v-skeleton-loader
            v-if="loading"
            type="image,article,article"
          ></v-skeleton-loader>
          <v-card elevation="0" class="pb-5" v-if="!loading">
            <div class="img-parent position-relative" style="height: 200px">
              <img
                :src="
                  selectedImg[product.title]
                    ? selectedImg[product.title]
                    : product.thumbnail
                "
                alt=""
                srcset=""
                class="w-100"
                style="height: 100%"
              />
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
            <v-card-text class="pl-0" style="height: 38px">
              <strong>{{ product.title }}</strong>
              {{
                product.description.split(" ").length <= 7
                  ? product.description
                  : product.description.split(" ").slice(0, 7).join(" ") + "..."
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
          </v-card>
        </swiper-slide>
        <div class="swiper-prev"></div>
        <div class="swiper-next"></div>
        <div class="swiper-pagination"></div>
      </Swiper>
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
  components: {
    Swiper,
    SwiperSlide,
  },
  data: () => ({
    selectedImg: {},
    loading: false,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      580: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      990: {
        slidesPerView: 4,
      },
    },
  }),
  computed: {
    ...mapState(productModule, ["mensShoes"]),
  },
  methods: {
    ...mapActions(productModule, ["getTopMensShoes"]),
    openQuickView(product) {
      this.Emitter.emit("openQuickView", product);
    },
  },
  async mounted() {
    this.loading = true;
    try {
      await this.getTopMensShoes();
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
</script>

<style lang="scss">
.top-mens-shoes {
  .swiper-button-next,
  .swiper-button-prev {
    transition: 1s;
    width: 40px;
    height: 40px;
    border: 1px dashed rgb(63, 56, 56);
    border-radius: 50%;
    top: 20%;
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
.img-parent:hover {
  .quick-view-btn {
    opacity: 1 !important;
  }
}
@media (max-width: 768px) {
  .top-mens-shoes {
    .swiper-button-next,
    .swiper-button-prev {
      top: 60%;
    }
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
  .top-mens-shoes {
    .img-parent {
      height: 300px !important;
    }
    .swiper-button-next,
    .swiper-button-prev {
      top: 60%;
    }
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
</style>
