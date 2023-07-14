<template>
  <div class="thread-list">
    <h2 class="list-title">Threads</h2>
    <div v-if="threads.length">
      <thread-item
        v-for="thread in threads"
        :thread="thread"
        :key="thread.id"
      />
    </div>
  </div>
  <div v-if="!threads.length" style="padding: 10px; text-align: center">
    <em>No Threads Available</em>
  </div>
</template>

<script>
import ThreadItem from "@/components/ThreadItem.vue";
import { findById } from "@/helpers";
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
      return this.$store.state.posts.items;
    },
    users() {
      return this.$store.state.users.items;
    },
  },
  methods: {
    postById(postId) {
      return findById(this.posts, postId);
    },

    userById(userId) {
      return findById(this.users, userId);
    },
  },
};
</script>

<style></style>
