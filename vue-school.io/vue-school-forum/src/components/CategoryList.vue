<template>
  <div class="forum-list" v-for="category in categories" :key="category.id">
    <h2 class="list-title">
      <a href="#">{{ category.name }}</a>
    </h2>
    <forum-list :forumIDs="category.forums" />
  </div>
</template>

<script>
import ForumList from "@/components/ForumList.vue";
export default {
  components: {
    ForumList,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
