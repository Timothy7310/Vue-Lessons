<template>
  <div class="thread">
    <div>
      <p>
        <router-link :to="{ name: 'ThreadShow', params: { id: thread.id } }">{{
          thread.title
        }}</router-link>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{ userById(thread.userId).name }}</a
        >, <app-date :timestamp="thread.publishedAt" />.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">{{ thread.repliesCount }} replies</p>

      <app-avatar-img
        class="avatar-medium"
        :src="userById(thread.userId).avatar"
        alt=""
      />

      <div>
        <p class="text-xsmall">
          <a href="#">{{ userById(thread.userId).name }}</a>
        </p>
        <p class="text-xsmall text-faded">
          <app-date :timestamp="thread.publishedAt" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { findById } from "@/helpers";
export default {
  props: {
    thread: {
      type: Object,
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
      return findById(this.users, userId) || {};
    },
  },
};
</script>

<style></style>
