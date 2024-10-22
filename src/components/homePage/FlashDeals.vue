<template>
  <div class="flash-deals pt-16 px-5 my-4">
    <div class="title d-flex justify-space-between align-center">
      <h2 style="font-weight: 900; font-size: 30px" class="px-5 text-red mb-4">
        Flash Deals
      </h2>
      <a href="#">Show All</a>
    </div>

    <Swiper
      :autoplay="{
        delay: 2000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :modules="modules"
      :slides-per-view="4"
      :space-between="35"
      class="pb-9"
      :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
      :loop="true"
      :breakpoints="breakpoints"
    >
      <swiper-slide v-for="product in flashDeals" :key="product.id">
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
          <v-card-text class="pl-0 card-title">
            <strong>{{ product.title }}</strong>
            {{
              product.description.split(" ").length <= 7
                ? product.description
                : product.description.split(" ").slice(0, 6).join(" ") + "..."
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
              class="pl-4 product-images"
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
      <div class="swiper-pagination mt-5"></div>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { productModule } from "@/stores/products";
import { mapActions, mapState } from "pinia";
export default {
  inject: ["Emitter"],
  methods: {
    ...mapActions(productModule, ["getProducts"]),
    openQuickView(product) {
      this.Emitter.emit("openQuickView", product);
    },
  },

  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  computed: {
    ...mapState(productModule, ["flashDeals"]),
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
  async mounted() {
    this.loading = true;
    try {
      await this.getProducts();
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
.flash-deals {
  .swiper-button-next,
  .swiper-button-prev {
    transition: 1s;
    width: 40px;
    height: 40px;
    border: 2px solid rgb(63, 56, 56);
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
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}
@media (max-width: 768px) {
  .flash-deals {
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
  .flash-deals {
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
