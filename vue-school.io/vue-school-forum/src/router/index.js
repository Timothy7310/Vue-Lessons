import PageHome from "@/components/PageHome.vue";
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: PageHome,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
