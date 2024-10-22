import { defineStore } from "pinia";

export const cartModule = defineStore("cartModule", {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(item) {
      let exists = false;
      for (let index = 0; index < this.cartItems.length; index++) {
        if (this.cartItems[index].id === item.id) {
          this.cartItems[index].quantity = item.quantity;
          exists = true;

          break;
        }
      }
      if (!exists) {
        this.cartItems.push(item);
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
      }
    },
    showCartItems() {
      if (localStorage.getItem("cart")) {
        this.cartItems = JSON.parse(localStorage.getItem("cart"));
      }
    },
    deleteCartItem(id) {
      for (let index = 0; index < this.cartItems.length; index++) {
        if (this.cartItems[index].id === id) {
          this.cartItems.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(this.cartItems));
        }
      }
    },
    deleteAllCartItems() {
      localStorage.removeItem("cart");
    },
    setToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
  },
});
