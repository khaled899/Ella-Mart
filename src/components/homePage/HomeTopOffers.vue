<template>
  <div class="top-offer bg-grey-lighten-4 pt-5">
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-hover v-slot="{ isHovering, props }">
            <div class="parent" v-bind="props" style="overflow: hidden">
              <img
                src="@/assets/images/playstations.webp"
                alt=""
                srcset=""
                :style="`width: 100%; transition:0.3s all ease-in-out; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col cols="4">
          <v-hover v-slot="{ isHovering, props }">
            <div class="parent" v-bind="props" style="overflow: hidden">
              <img
                src="@/assets/images/headset.webp"
                alt=""
                srcset=""
                :style="`width: 100%; transition:0.3s all ease-in-out; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col cols="4">
          <v-hover v-slot="{ isHovering, props }">
            <div class="parent" v-bind="props" style="overflow: hidden">
              <img
                src="@/assets/images/chairs.webp"
                alt=""
                srcset=""
                :style="`width: 100%; transition:0.3s all ease-in-out; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-hover v-slot="{ isHovering, props }">
            <div class="parent" v-bind="props" style="overflow: hidden">
              <img
                src="@/assets/images/iphones.webp"
                alt=""
                srcset=""
                :style="`width: 100%; transition:0.3s all ease-in-out; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col cols="6">
          <v-hover v-slot="{ isHovering, props }">
            <div class="parent" v-bind="props" style="overflow: hidden">
              <img
                src="@/assets/images/laptops.webp"
                alt=""
                srcset=""
                :style="`width: 100%; transition:0.3s all ease-in-out; scale: ${
                  isHovering ? 1.05 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
img {
  cursor: pointer;
}
</style>
