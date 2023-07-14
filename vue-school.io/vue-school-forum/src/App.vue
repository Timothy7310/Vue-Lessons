<template>
  <app-head>
    <title>Vue Forum</title>
    <meta name="description" content="Awesome Forum" />

    <!-- Social -->
    <meta property="og:title" content="Awesome Forum" />
    <meta property="og:description" content="Awesome Forum with Vue!" />
    <meta
      property="og:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg"
    />

    <!-- Twitter -->
    <meta name="twitter:title" content="Awesome Forum" />
    <meta name="twitter:description" content="Awesome Forum with Vue!" />
    <meta
      name="twitter:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg"
    />
    <meta name="twitter:card" content="summary_large_image" />
  </app-head>
  <the-navbar />
  <div class="container">
    <router-view
      v-show="showPage"
      @ready="onPageReady"
      :key="`${$route.path}${JSON.stringify($route.query)}`"
    />
    <app-spinner v-show="!showPage" />
  </div>
  <app-notifications />
</template>

<script>
import AppNotifications from "@/components/AppNotifications";
import TheNavbar from "@/components/TheNavbar";
import { mapActions } from "vuex";
import NProgress from "nprogress";

export default {
  components: {
    TheNavbar,
    AppNotifications,
  },
  data() {
    return {
      showPage: false,
    };
  },
  name: "App",
  methods: {
    ...mapActions("auth", ["fetchAuthUser"]),
    onPageReady() {
      this.showPage = true;
      NProgress.done();
    },
  },
  created() {
    this.fetchAuthUser();
    NProgress.configure({
      speed: 200,
      showSpinner: false,
    });
    this.$router.beforeEach(() => {
      this.showPage = false;
      NProgress.start();
    });
  },
};
</script>

<style>
@import "assets/style.css";
@import "~nprogress/nprogress.css";
#nprogress .bar {
  background: #57ad8d !important;
}
</style>
