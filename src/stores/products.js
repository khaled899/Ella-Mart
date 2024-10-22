import axios from "axios";
import { defineStore } from "pinia";
export const productModule = defineStore("productModule", {
  state: () => ({
    flashDeals: [],
    mobilePhones: [],
    mensWatch: [],
    laptops: [],
    mensShoes: [],
    categoriesRoutes: [
      { title: "Laptops", route: "laptops" },
      { title: "Mens Shoes", route: "mens-shoes" },
      { title: "Smartphones", route: "smartphones" },
      { title: "Mens Shirts", route: "mens-shirts" },
      { title: "Furnitures", route: "furniture" },
      { title: "Skin Care", route: "skin-care" },
      { title: "Tablets", route: "tablets" },
    ],
    categoryProducts: [],
    productById: {},
  }),
  actions: {
    async getProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((response) => {
          this.flashDeals = response.data.products.slice(0, 8);
        })
        .catch((error) => console.log(error.message));
    },
    async getProductsByCategory(category) {
      await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((response) => (this.categoryProducts = response.data.products));
    },
    async getTopMobilePhones() {
      await axios
        .get(`https://dummyjson.com/products/category/smartphones`)
        .then(
          (response) => (this.mobilePhones = response.data.products.slice(0, 6))
        );
    },
    async getTopMensWatches() {
      await axios
        .get(`https://dummyjson.com/products/category/mens-watches`)
        .then((response) => (this.mensWatch = response.data.products));
    },
    async getTopMensShoes() {
      await axios
        .get(`https://dummyjson.com/products/category/mens-shoes`)
        .then((response) => (this.mensShoes = response.data.products));
    },
    async getTopLaptops() {
      await axios
        .get(`https://dummyjson.com/products/category/laptops`)
        .then((response) => (this.laptops = response.data.products));
    },
    async getProductsByID(id) {
      await axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((response) => (this.productById = response.data));
    },
  },
});
