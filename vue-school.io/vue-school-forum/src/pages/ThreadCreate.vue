<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <thread-edit
      @save="save"
      @dirty="isDirty = true"
      @clean="isDirty = false"
      :id="this.forum.id"
      :isEdit="false"
    />
  </div>
</template>

<script>
import ThreadEdit from "@/components/ThreadEdit";
import { findById } from "@/helpers";
import { mapActions } from "vuex";
import asyncDataStatus from "@/mixins/asyncDataStatus";

export default {
  components: {
    ThreadEdit,
  },
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDirty: false,
    };
  },
  mixins: [asyncDataStatus],
  computed: {
    forum() {
      return findById(this.$store.state.forums, this.forumId);
    },
  },
  methods: {
    ...mapActions(["fetchForum", "createThread"]),
    async save({ title, text }) {
      const thread = await this.createThread({
        forumId: this.forum.id,
        title,
        text,
      });
      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
  },
  cancel() {
    this.$router.push({ name: "Forum", params: { id: this.forum.id } });
  },

  async created() {
    await this.fetchForum({ id: this.forumId });
    this.asyncDataStatus_fetched();
  },

  beforeRouteLeave() {
    console.log(this.isDirty);
    if (this.isDirty) {
      const confirmed = window.confirm(
        "Are you sure you want to leave? Unsaved changes will be lost!"
      );
      if (!confirmed) return false;
    }
  },
};
</script>

<style></style>
