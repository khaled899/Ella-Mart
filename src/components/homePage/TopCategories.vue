<template>
  <CyberBanner />
  <div class="top-categories">
    <div class="title d-flex justify-center align-center px-5 py-6">
      <h3 class="text-center flex-grow-1 font-weight-bold">Top Categories</h3>
      <a href="#">Shop Now</a>
    </div>
    <v-container fluid>
      <v-row>
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg="2"
          v-for="category in categories"
          :key="category.name"
        >
          <v-card
            class="text-center"
            elevation="0"
            style="cursor: pointer"
            @click="
              $router.push({
                name: 'category',
                params: { category: category.slug, title: category.name },
              })
            "
          >
            <img
              src="@/assets/images/elle.jpg"
              style="width: 80px; height: 80px; border-radius: 50%"
              alt="#"
              srcset=""
            />
            <v-card-text>{{ category.name }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CyberBanner from "./CyberBanner.vue";

export default {
  components: {
    CyberBanner,
  },
  props: {
    categories: {
      type: Array,
    },
  },
};
</script>
