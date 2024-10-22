import axios from "axios";
import { defineStore } from "pinia";

export const categoriesModule = defineStore("categoriesModule", {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getCategories() {
      await axios
        .get("https://dummyjson.com/products/categories")
        .then((response) => (this.categories = response.data))
        .catch((error) => console.log(error.message));
    },
  },
});
