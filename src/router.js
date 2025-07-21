import { createRouter, createWebHistory } from "vue-router"
import Home from "./views/Home.vue"
import Base from "./views/Base.vue"
import StatPage from "./views/StatPage.vue"
import ItemNamePage from "./views/ItemNamePage.vue"

const routes = [
  {
    path: "/home",
    alias: "/",
    component: Home
  },
  {
    path: "/home/total-price",
    component: StatPage
  },
  {
    path: "/home/discount-percent",
    component: StatPage
  },
  {
    path: "/home/cancel-count",
    component: StatPage
  },
  {
    path: "/home/oblasts",
    component: StatPage
  },
  {
    path: "/home/item/:id",
    component: ItemNamePage
  },
  //View: Base
  {
    path: "/incomes",
    component: Base,
    props: {
      page: "incomes",
      pageTitle: "Incomes",
      isStocksPage: false
    }
  },
  {
    path: "/orders",
    component: Base,
    props: {
      page: "orders",
      pageTitle: "Orders",
      isStocksPage: false
    }
  },
  {
    path: "/stocks",
    component: Base,
    props: {
      page: "stocks",
      pageTitle: "Stocks",
      isStocksPage: true
    }
  },
  {
    path: "/sales",
    component: Base,
    props: {
      page: "sales",
      pageTitle: "Sales",
      isStocksPage: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "pagenav__item--active",
  routes
})
export default router