<template>
  <app-layout>
    <transition name="fade">
      <LoadingScreen v-if="loading" />
    </transition>
    <router-view v-if="!loading" />
    <QuickView />
  </app-layout>
</template>
<script>
import AppLayout from "@/components/global/AppLayout";
import QuickView from "./components/homePage/QuickView.vue";
import LoadingScreen from "./components/global/LoadingScreen.vue";

export default {
  components: {
    AppLayout,
    QuickView,
    LoadingScreen,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      localStorage.setItem("hasSeenLoading", "true");
    }, 1500);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
