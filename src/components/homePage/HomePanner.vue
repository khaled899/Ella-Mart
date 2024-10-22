<template>
  <div class="parent">
    <img src="@/assets/images/banner-bg.jpg" alt="" srcset="" />
    <div class="cont">
      <h3><span>Huge Saveing</span> on UHD Televions</h3>
      <p class="my-5">sale up to 70% on selected items</p>

      <v-btn
        variant="outlined"
        density="comfortable"
        style="
          border-radius: 30px;
          text-transform: none;
          display: flex;
          align-items: center;
          justify-content: center;
        "
        class="py-5 px-10"
      >
        Shop Now
      </v-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.parent {
  height: 400px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cont {
    position: absolute;
    color: white;
    left: 6%;
    top: 20%;
    width: 500px;
    h3 {
      font-size: 50px;
      font-weight: 900;
      span {
        color: #82da82;
      }
    }
  }
}
@media (max-width: 990px) {
  .parent {
    .cont {
      width: 400px;
      h3 {
        font-size: 35px;
      }
    }
  }
}
@media (max-width: 767px) {
  .parent {
    height: 320px;
    .cont {
      width: 400px;
      padding-left: 10px;
      h3 {
        font-size: 26px;
      }
      p {
        font-size: 14px;
      }
    }
  }
}
@media (max-width: 580px) {
  .parent {
    height: 250px;
    .cont {
      width: 60%;
      padding-left: 20px;
      top: 20%;
      h3 {
        font-size: 1.2rem;
      }
      p {
        font-size: 12px;
      }
      button {
        height: 30px !important;
        width: 130px !important;
        font-size: 13px !important;
      }
    }
  }
}
</style>
