<template>
  <div class="col-full push-top">
    <h1>{{ category.name }}</h1>
  </div>
  <forum-list :title="category.name" :forums="getForumsForCategory(category)" />
</template>

<script>
import ForumList from "@/components/ForumList";
import { findById } from "@/helpers";
import { mapActions } from "vuex";
export default {
  components: {
    ForumList,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    category() {
      return findById(this.$store.state.categories, this.id) || {};
    },
  },
  methods: {
    ...mapActions("categories", ["fetchCategory"]),
    ...mapActions("forums", ["fetchForums"]),
    getForumsForCategory(category) {
      return this.$store.state.forums.filter(
        (forum) => forum.categoryId === category.id
      );
    },
  },
  async created() {
    const category = await this.$store.dispatch("fetchCategory", {
      id: this.id,
    });
    await this.$store.dispatch("fetchForums", { ids: category.forums });
    // await this.fetchForums({ ids: category.forums });
  },
};
</script>

<style></style>
