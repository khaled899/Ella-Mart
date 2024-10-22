<template>
  <div class="why-shop-with-us mt-8 text-center text-white py-14">
    <div class="title mb-10">
      <h2><span>Why Shop </span>With Us?</h2>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <div class="img-parent">
              <img src="@/assets/images/free-shipping.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Free Shipping On First Order</v-card-title
            >
            <v-card-text>Praesent on first order</v-card-text>
            <a href="" class="text-white">Learn More</a>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <div class="img-parent">
              <img src="@/assets/images/weekly-flash-sales.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Weekly Flash Sales</v-card-title
            >
            <v-card-text>Praesent on first order</v-card-text>
            <a href="" class="text-white">Learn More</a>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <div class="img-parent">
              <img src="@/assets/images/discount.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Anual Payment Discount</v-card-title
            >
            <v-card-text>Praesent on first order</v-card-text>
            <a href="" class="text-white">Learn More</a>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <div class="img-parent">
              <img src="@/assets/images/cash-back.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Cashback Reward Program</v-card-title
            >
            <v-card-text class="pb-0" style="font-size: 15px"
              >Praesent on first order</v-card-text
            >
            <a href="" class="text-white">Learn More</a>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.why-shop-with-us {
  background-image: url(../../assets/images/why-shop-with-us-banner.webp);
  background-repeat: repeat-x;
  background-size: cover;
  h2 {
    font-size: 30px;
    font-weight: 900;
    span {
      color: rgb(45 251 223);
    }
  }
}
</style>
