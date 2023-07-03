<template>
  <div class="col-full">
    <div class="forum-list" v-for="category in categories" :key="category.id">
      <h2 class="list-title">
        <router-link :to="{ name: 'Category', params: { id: category.id } }">{{
          category.name
        }}</router-link>
      </h2>
      <forum-list />
    </div>
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
