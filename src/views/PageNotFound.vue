<template>
  <div class="page-not-found position-relative">
    <img src="@/assets/images/pageNotFound.jpg" alt="" srcset="" />
    <v-btn
      style="
        border-radius: 30px;
        border-color: rgb(199, 199, 199);
        text-transform: none;
        position: absolute;
        top: 80%;
        left: 50%;
        width: 20%;
        transform: translateX(-50%);
      "
      class=""
      density="compact"
      variant="elevated"
      height="45"
      color="blue"
      @click="$router.push({ name: 'home' })"
      >Return Home</v-btn
    >
  </div>
</template>

<style lang="scss" scoped>
.page-not-found {
  width: 100%;
  height: 100vh;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
