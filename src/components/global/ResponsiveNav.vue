<template>
  <div class="responsive-nav">
    <v-app-bar color="#02218f" height="fit-content">
      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <div class="nav-img">
              <img
                src="@/assets/images/logo.png"
                alt=""
                class="w-20"
                style="cursor: pointer"
                @click="$router.push({ name: 'home' })"
              />
            </div>
          </v-col>
          <v-col cols="6">
            <div class="nav-icon w-100 text-right">
              <v-badge
                v-if="cartItems.length"
                location="right top"
                :content="cartItems.length"
                color="blue"
                offsetX="-35"
                offsetY="-22"
              ></v-badge>
              <v-app-bar-nav-icon @click="openMenu"> </v-app-bar-nav-icon>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { cartModule } from "@/stores/cart";
import { mapState } from "pinia";

export default {
  inject: ["Emitter"],
  methods: {
    openMenu() {
      this.Emitter.emit("openMenu");
    },
  },
  computed: {
    ...mapState(cartModule, ["cartItems"]),
  },
};
</script>
