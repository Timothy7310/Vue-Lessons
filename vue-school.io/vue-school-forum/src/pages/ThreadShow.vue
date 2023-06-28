<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="threadPosts" />
    <post-editor @save="addPost" :threadId="this.id" />
  </div>
</template>

<script>
import sourceData from "@/data.json";
import PostList from "@/components/PostList";
import PostEditor from "@/components/PostEditor";
export default {
  name: "ThreadShow",
  components: {
    PostList,
    PostEditor,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
    };
  },
  computed: {
    thread() {
      return this.threads.find((thread) => thread.id === this.id);
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id);
    },
  },
  methods: {
    addPost(payload) {
      this.posts.push(payload.post);
      this.thread.posts.push(payload.postId);
    },
  },
};
</script>

<style></style>
