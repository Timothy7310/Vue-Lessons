<template>
  <div v-if="asyncDataStatus_ready" class="container col-full">
    <div class="col-full push-top">
      <h1>{{ category.name }}</h1>
    </div>
    <forum-list
      :title="category.name"
      :forums="getForumsForCategory(category)"
    />
  </div>
</template>

<script>
import ForumList from "@/components/ForumList";
import { findById } from "@/helpers";
import { mapActions } from "vuex";
import asyncDataStatus from "@/mixins/asyncDataStatus";

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
  mixins: [asyncDataStatus],
  computed: {
    category() {
      return findById(this.$store.state.categories.items, this.id) || {};
    },
  },
  methods: {
    ...mapActions("categories", ["fetchCategory"]),
    ...mapActions("forums", ["fetchForums"]),
    getForumsForCategory(category) {
      return this.$store.state.forums.items.filter(
        (forum) => forum.categoryId === category.id
      );
    },
  },
  async created() {
    const category = await this.fetchCategory({ id: this.id });
    await this.fetchForums({ ids: category.forums });
    this.asyncDataStatus_fetched();
  },
};
</script>

<style></style>
