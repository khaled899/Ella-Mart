<template>
  <div class="layout">
    <v-layout class="position-relative">
      <AppDrawer />
      <MenuDrawer />
      <v-main
        :style="`padding-top:${
          $route.name == 'CheckOut' || $route.name == 'Page Not Found'
            ? '0px'
            : windowWidth <= 990
            ? '60px'
            : '150px'
        }`"
      >
        <slot></slot>
      </v-main>
      <AppNavbar
        v-show="
          $route.name != 'CheckOut' &&
          $route.name != 'Page Not Found' &&
          !showFixedNav &&
          windowWidth > 990
        "
      />
      <ResponsiveNav
        v-show="
          windowWidth <= 990 &&
          $route.name != 'CheckOut' &&
          $route.name != 'Page Not Found'
        "
      />
      <FixedNav
        v-show="
          $route.name != 'CheckOut' &&
          $route.name != 'Page Not Found' &&
          showFixedNav &&
          windowWidth > 990
        "
      />
      <AppFooter
        v-show="$route.name != 'CheckOut' && $route.name != 'Page Not Found'"
      />
    </v-layout>
  </div>
</template>

<script>
import AppDrawer from "./AppDrawer.vue";
import AppFooter from "./AppFooter.vue";
import AppNavbar from "./AppNavbar.vue";
import FixedNav from "./FixedNav.vue";
import MenuDrawer from "./MenuDrawer.vue";
import ResponsiveNav from "./ResponsiveNav.vue";

export default {
  components: {
    AppNavbar,
    AppFooter,
    AppDrawer,
    FixedNav,
    ResponsiveNav,
    MenuDrawer,
  },
  data: () => ({
    drawer: false,
    windowWidth: 0,
    showFixedNav: false,
  }),
  mounted() {
    this.windowWidth = window.innerWidth;
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
    window.onscroll = () => {
      if (window.scrollY > 205) {
        this.showFixedNav = true;
      } else {
        this.showFixedNav = false;
      }
    };
  },
};
</script>
