<template>
  <div class="menu-drawer">
    <v-navigation-drawer v-model="drawer" location="left" temporary width="250">
      <div class="nav-img py-4" style="background-color: #02218f">
        <img
          src="@/assets/images/logo.png"
          alt=""
          class="w-20"
          style="cursor: pointer"
          @click="$router.push({ name: 'home' })"
        />
      </div>
      <v-container fluid="">
        <v-row>
          <v-col cols="12">
            <h3 class="mb-4">Top Categories</h3>
            <ul class="links">
              <li v-for="category in categoriesRoutes" :key="category.title">
                <router-link
                  style="text-decoration: none; color: black"
                  :to="{
                    name: 'category',
                    params: { category: category.route, title: category.title },
                  }"
                  >{{ category.title }}</router-link
                >
              </li>
            </ul>
            <v-list>
              <v-list-group>
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" class="px-0">
                    <v-list-item-title>Languages</v-list-item-title>
                  </v-list-item>
                </template>
                <v-list-item v-for="language in languages" :key="language.lang">
                  <v-list-item-title>
                    <span v-html="language.icon"></span>
                    {{ language.lang }}/{{
                      language.currency
                    }}</v-list-item-title
                  >
                </v-list-item>
                <!-- <v-list-item>
                  <v-list-item-title>English</v-list-item-title>
                </v-list-item> -->
              </v-list-group>
            </v-list>
          </v-col>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-col cols="4" class="mt-3">
            <div
              class="wishlist d-flex flex-column justify-center align-center"
            >
              <v-icon color="#ffb547">mdi-heart-outline</v-icon>
              <span color="#ffb547">Wishlist</span>
            </div>
          </v-col>
          <v-col cols="4" class="mt-3">
            <div class="sign-in d-flex flex-column justify-center align-center">
              <v-icon color="#ffb547">mdi-badge-account</v-icon>
              <span color="#ffb547">Sign In</span>
            </div>
          </v-col>
          <v-col cols="4" class="mt-3">
            <div
              class="cart d-flex flex-column justify-center align-center"
              :style="`cursor: pointer;pointer-events: ${
                $route.name == 'Cart Page' ? 'none' : 'unset'
              }`"
              @click="$router.push({ name: 'Cart Page' })"
            >
              <v-badge
                location="right top"
                :content="cartItems.length"
                color="blue"
                offsetX="-15"
                offsetY="-7"
              ></v-badge>
              <v-icon color="#ffb547">mdi-cart-arrow-down</v-icon>
              <span color="#ffb547">Cart</span>
            </div>
          </v-col>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-divider lenght="100%" color="black"></v-divider>
          <v-col cols="12">
            <div class="help d-flex align-center" style="gap: 5px">
              <svg
                style="width: 23px"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="user-headset"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="svg-inline--fa fa-user-headset fa-w-14 fa-3x"
              >
                <path
                  fill="#256ef1"
                  d="M320 352h-23.1a174.08 174.08 0 0 1-145.8 0H128A128 128 0 0 0 0 480a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32 128 128 0 0 0-128-128zM48 224a16 16 0 0 0 16-16v-16c0-88.22 71.78-160 160-160s160 71.78 160 160v16a80.09 80.09 0 0 1-80 80h-32a32 32 0 0 0-32-32h-32a32 32 0 0 0 0 64h96a112.14 112.14 0 0 0 112-112v-16C416 86.13 329.87 0 224 0S32 86.13 32 192v16a16 16 0 0 0 16 16zm160 0h32a64 64 0 0 1 55.41 32H304a48.05 48.05 0 0 0 48-48v-16a128 128 0 0 0-256 0c0 40.42 19.1 76 48.35 99.47-.06-1.17-.35-2.28-.35-3.47a64.07 64.07 0 0 1 64-64z"
                  class=""
                ></path>
              </svg>
              <span>Help</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { cartModule } from "@/stores/cart";
import { productModule } from "@/stores/products";
import { mapState } from "pinia";

export default {
  inject: ["Emitter"],
  data: () => ({
    drawer: false,
    selectedLang: [
      {
        icon: ` <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="enable-background: new 0 0 512 512; width: 23px;"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xml:space="preserve"
            >
              <circle style="fill: #f0f0f0;" cx="256" cy="256" r="256"></circle>
              <g>
                <path style="fill: #0052b4;" d="M52.92,100.142c-20.109,26.163-35.272,56.318-44.101,89.077h133.178L52.92,100.142z"></path>
                <path style="fill: #0052b4;" d="M503.181,189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075,89.076H503.181z"></path>
                <path style="fill: #0052b4;" d="M8.819,322.784c8.83,32.758,23.993,62.913,44.101,89.075l89.074-89.075L8.819,322.784L8.819,322.784   z"></path>
                <path style="fill: #0052b4;" d="M411.858,52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177L411.858,52.921z"></path>
                <path style="fill: #0052b4;" d="M100.142,459.079c26.163,20.109,56.318,35.272,89.076,44.102V370.005L100.142,459.079z"></path>
                <path style="fill: #0052b4;" d="M189.217,8.819c-32.758,8.83-62.913,23.993-89.075,44.101l89.075,89.075V8.819z"></path>
                <path style="fill: #0052b4;" d="M322.783,503.181c32.758-8.83,62.913-23.993,89.075-44.101l-89.075-89.075V503.181z"></path>
                <path style="fill: #0052b4;" d="M370.005,322.784l89.075,89.076c20.108-26.162,35.272-56.318,44.101-89.076H370.005z"></path>
              </g>
              <g>
                <path
                  style="fill: #d80027;"
                  d="M509.833,222.609h-220.44h-0.001V2.167C278.461,0.744,267.317,0,256,0   c-11.319,0-22.461,0.744-33.391,2.167v220.44v0.001H2.167C0.744,233.539,0,244.683,0,256c0,11.319,0.744,22.461,2.167,33.391   h220.44h0.001v220.442C233.539,511.256,244.681,512,256,512c11.317,0,22.461-0.743,33.391-2.167v-220.44v-0.001h220.442   C511.256,278.461,512,267.319,512,256C512,244.683,511.256,233.539,509.833,222.609z"
                ></path>
                <path style="fill: #d80027;" d="M322.783,322.784L322.783,322.784L437.019,437.02c5.254-5.252,10.266-10.743,15.048-16.435   l-97.802-97.802h-31.482V322.784z"></path>
                <path style="fill: #d80027;" d="M189.217,322.784h-0.002L74.98,437.019c5.252,5.254,10.743,10.266,16.435,15.048l97.802-97.804   V322.784z"></path>
                <path style="fill: #d80027;" d="M189.217,189.219v-0.002L74.981,74.98c-5.254,5.252-10.266,10.743-15.048,16.435l97.803,97.803   H189.217z"></path>
                <path style="fill: #d80027;" d="M322.783,189.219L322.783,189.219L437.02,74.981c-5.252-5.254-10.743-10.266-16.435-15.047   l-97.802,97.803V189.219z"></path>
              </g>
            </svg>`,
        lang: "EN",
        currency: "USD",
      },
    ],
    languages: [
      {
        icon: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512; width: 23px;"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xml:space="preserve">
              <circle style="fill: #f0f0f0;" cx="256" cy="256" r="256"></circle>
              <g>
                <path style="fill: #0052b4;" d="M52.92,100.142c-20.109,26.163-35.272,56.318-44.101,89.077h133.178L52.92,100.142z"></path>
                <path style="fill: #0052b4;" d="M503.181,189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075,89.076H503.181z"></path>
                <path style="fill: #0052b4;" d="M8.819,322.784c8.83,32.758,23.993,62.913,44.101,89.075l89.074-89.075L8.819,322.784L8.819,322.784   z"></path>
                <path style="fill: #0052b4;" d="M411.858,52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177L411.858,52.921z"></path>
                <path style="fill: #0052b4;" d="M100.142,459.079c26.163,20.109,56.318,35.272,89.076,44.102V370.005L100.142,459.079z"></path>
                <path style="fill: #0052b4;" d="M189.217,8.819c-32.758,8.83-62.913,23.993-89.075,44.101l89.075,89.075V8.819z"></path>
                <path style="fill: #0052b4;" d="M322.783,503.181c32.758-8.83,62.913-23.993,89.075-44.101l-89.075-89.075V503.181z"></path>
                <path style="fill: #0052b4;" d="M370.005,322.784l89.075,89.076c20.108-26.162,35.272-56.318,44.101-89.076H370.005z"></path>
              </g>
              <g>
                <path
                  style="fill: #d80027;"
                  d="M509.833,222.609h-220.44h-0.001V2.167C278.461,0.744,267.317,0,256,0   c-11.319,0-22.461,0.744-33.391,2.167v220.44v0.001H2.167C0.744,233.539,0,244.683,0,256c0,11.319,0.744,22.461,2.167,33.391   h220.44h0.001v220.442C233.539,511.256,244.681,512,256,512c11.317,0,22.461-0.743,33.391-2.167v-220.44v-0.001h220.442   C511.256,278.461,512,267.319,512,256C512,244.683,511.256,233.539,509.833,222.609z"
                ></path>
                <path style="fill: #d80027;" d="M322.783,322.784L322.783,322.784L437.019,437.02c5.254-5.252,10.266-10.743,15.048-16.435   l-97.802-97.802h-31.482V322.784z"></path>
                <path style="fill: #d80027;" d="M189.217,322.784h-0.002L74.98,437.019c5.252,5.254,10.743,10.266,16.435,15.048l97.802-97.804   V322.784z"></path>
                <path style="fill: #d80027;" d="M189.217,189.219v-0.002L74.981,74.98c-5.254,5.252-10.266,10.743-15.048,16.435l97.803,97.803   H189.217z"></path>
                <path style="fill: #d80027;" d="M322.783,189.219L322.783,189.219L437.02,74.981c-5.252-5.254-10.743-10.266-16.435-15.047   l-97.802,97.803V189.219z"></path>
              </g>
            </svg>`,
        lang: "EN",
        currency: "USD",
      },
      {
        icon: `
         <svg
          version="1.1"
          version="1.1"
          version="1.1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background: new 0 0 512 512; width: 23px;"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
        >
          <path style="fill: #ffda44;" d="M15.923,345.043C52.094,442.527,145.929,512,256,512s203.906-69.473,240.077-166.957L256,322.783  L15.923,345.043z"></path>
          <path d="M256,0C145.929,0,52.094,69.472,15.923,166.957L256,189.217l240.077-22.261C459.906,69.472,366.071,0,256,0z"></path>
          <path
            style="fill: #d80027;"
            d="M15.923,166.957C5.633,194.69,0,224.686,0,256s5.633,61.31,15.923,89.043h480.155  C506.368,317.31,512,287.314,512,256s-5.632-61.31-15.923-89.043H15.923z"
          ></path>
          </svg>`,
        lang: "DE",
        currency: "EUR",
      },
    ],
  }),
  computed: {
    ...mapState(productModule, ["categoriesRoutes"]),
    ...mapState(cartModule, ["cartItems"]),
  },

  mounted() {
    this.Emitter.on("openMenu", () => {
      this.drawer = !this.drawer;
    });
  },
};
</script>

<style lang="scss" scoped>
.links {
  list-style: none;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  color: black;
}
.links li {
  position: relative;
}
.links li::after {
  content: "";
  position: absolute;
  height: 1.8px;
  width: 0;
  background-color: #02218f;
  bottom: 0;
  left: 0;
  transition: 1.2s;
}
li:hover::after {
  width: 100%;
}
</style>
