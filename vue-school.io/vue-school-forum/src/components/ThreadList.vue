<template>
  <div class="thread-list">
    <h2 class="list-title">Threads</h2>
    <thread-item
      v-for="thread in threads"
      :thread="thread"
      :key="thread.id"
    ></thread-item>
  </div>
</template>

<script>
import ThreadItem from "@/components/ThreadItem.vue";
export default {
  components: {
    ThreadItem,
  },
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    postById(postId) {
      return this.posts.find((p) => p.id === postId);
    },

    userById(userId) {
      return this.users.find((p) => p.id === userId);
    },
  },
};
</script>

<style></style>
