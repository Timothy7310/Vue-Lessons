<template>
  <div class="col-full push-top">
    <h1>{{ categories[0].name }}</h1>
  </div>
  <category-list :categories="categories" />
</template>

<script>
import CategoryList from "@/components/CategoryList.vue";
import sourceData from "@/data.json";
export default {
  components: {
    CategoryList,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    categories() {
      return sourceData.categories.filter(
        (category) => category.id === this.id
      );
    },
  },
};
</script>

<style></style>
