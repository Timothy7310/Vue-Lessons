<template>
  <div class="forum-listing" v-for="forum in forums" :key="forum.id">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{ name: 'Forum', params: { id: forum.id } }"
      >
        {{ forum.name }}
      </router-link>
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p>
        <span v-if="forum.threads" class="count">{{
          forum.threads.length
        }}</span>
        <span v-else class="count">0</span>
        {{ forum.threads?.length > 1 ? "threads" : "thread" }}
      </p>
    </div>

    <div class="last-thread"></div>
  </div>
</template>

<script>
export default {
  props: {
    forumIDs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    forums() {
      return this.forumIDs.map((forumId) =>
        this.$store.state.forums.find((forum) => forum.id === forumId)
      );
    },
  },
};
</script>

<style></style>
