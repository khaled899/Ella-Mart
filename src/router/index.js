import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/category/:category/:title",
    name: "category",
    component: () => import("@/views/CategoryPage.vue"),
  },
  {
    path: "/product-details/:productID",
    name: "Product Details",
    component: () => import("@/views/ProductDetails.vue"),
  },
  {
    path: "/cart-page",
    name: "Cart Page",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: () => import("@/views/CheckOut.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "Page Not Found",
    component: () => import("@/views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
