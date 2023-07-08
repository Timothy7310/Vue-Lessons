import Home from "@/pages/Home";
import ThreadShow from "@/pages/ThreadShow";
import ThreadCreate from "@/pages/ThreadCreate";
import ThreadEdit from "@/pages/ThreadEdit";
import NotFound from "@/pages/NotFound";
import Forum from "@/pages/Forum";
import Category from "@/pages/Category";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import SignIn from "@/pages/SignIn";
import store from "@/store";

import { createRouter, createWebHistory } from "vue-router";
import { findById } from "@/helpers";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/me",
    name: "Profile",
    component: Profile,
    meta: { toTop: true, smoothScroll: true, requiresAuth: true },
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: Profile,
    props: { isEdit: true },
    meta: { requiresAuth: true },
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: Forum,
    props: true,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    props: true,
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true,
    async beforeEnter(to, _from, next) {
      await store.dispatch("threads/fetchThread", {
        id: to.params.id,
        once: true,
      });

      const threadExists = findById(store.state.threads.items, to.params.id);

      if (threadExists) {
        return next();
      } else {
        next({
          name: "NotFound",
          params: { pathMatch: to.path.substring(1).split("/") },
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: "/forum/:forumId/thread/create",
    name: "ThreadCreate",
    component: ThreadCreate,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    meta: { requiresGuest: true },
  },
  {
    path: "/logout",
    name: "SignOut",
    async beforeEnter(to, form) {
      store.dispatch("auth/signOut");
      return { name: "Home" };
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {};

    if (to.meta.toTop) {
      scroll.top = 0;
    }

    if (to.meta.smoothScroll) {
      scroll.behavior = "smooth";
    }

    return scroll;
  },
});

router.beforeEach(async (to, from) => {
  await store.dispatch("auth/initAuthentication");
  store.dispatch("unsubscribeAllSnapshots");

  if (to.meta.requiresAuth && !store.state.auth.authId) {
    return { name: "SignIn", query: { redirectTo: to.path } };
  }

  if (to.meta.requiresGuest && store.state.auth.authId) {
    return { name: "Home" };
  }
});

export default router;
