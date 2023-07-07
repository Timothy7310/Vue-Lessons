<!-- <template>
  <div class="col-full">
    <div class="forum-list" v-for="category in categories" :key="category.id">
      <h2 class="list-title">
        <router-link :to="{ name: 'Category', params: { id: category.id } }">{{
          category.name
        }}</router-link>
      </h2>
      <forum-list :forumIds="category.forums" />
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

<style></style> -->

<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category)"
    :title="category.name"
    :category-id="category.id"
  />
</template>

<script>
import ForumList from "@/components/ForumList";

export default {
  components: { ForumList },
  props: {
    categories: {
      required: true,
      type: Array,
    },
  },
  methods: {
    getForumsForCategory(category) {
      return this.$store.state.forums.items.filter(
        (forum) => forum.categoryId === category.id
      );
    },
  },
};
</script>

<style scoped></style>
