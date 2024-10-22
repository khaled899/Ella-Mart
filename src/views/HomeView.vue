<template>
  <div class="home">
    <HomePanner />
    <HomeFeatures />
    <HomeTopOffers />
    <FlashDeals />
    <TopCategories :categories="categories" />
    <NewProducts />
    <QualityFeatures />
    <TopMobilePhones />
    <ProductsBanner />
    <TopMensWatches />
    <TVBanner />
    <TopMensShoes />
    <WhyShopWithUs />
  </div>
</template>

<script>
// @ is an alias to /src
import FlashDeals from "@/components/homePage/FlashDeals.vue";
import HomeFeatures from "@/components/homePage/HomeFeatures.vue";
import HomePanner from "@/components/homePage/HomePanner.vue";
import HomeTopOffers from "@/components/homePage/HomeTopOffers.vue";
import NewProducts from "@/components/homePage/NewProducts.vue";
import ProductsBanner from "@/components/homePage/ProductsBanner.vue";
import QualityFeatures from "@/components/homePage/QualityFeatures.vue";
import TopCategories from "@/components/homePage/TopCategories.vue";
import TopMensWatches from "@/components/homePage/TopMensWatches.vue";
import TopMobilePhones from "@/components/homePage/TopMobilePhones.vue";
import TVBanner from "@/components/homePage/TVBanner.vue";
import WhyShopWithUs from "@/components/homePage/WhyShopWithUs.vue";
import { categoriesModule } from "@/stores/categories";
import { mapActions, mapState } from "pinia";
import TopMensShoes from "@/components/homePage/TopMensShoes.vue";

export default {
  name: "HomeView",

  components: {
    HomePanner,
    HomeFeatures,
    HomeTopOffers,
    FlashDeals,
    TopCategories,
    NewProducts,
    QualityFeatures,
    TopMobilePhones,
    ProductsBanner,
    TopMensWatches,
    TVBanner,
    TopMensShoes,
    WhyShopWithUs,
  },
  computed: {
    ...mapState(categoriesModule, ["categories"]),
  },
  methods: {
    ...mapActions(categoriesModule, ["getCategories"]),
  },
  async mounted() {
    await this.getCategories();
  },
};
</script>
