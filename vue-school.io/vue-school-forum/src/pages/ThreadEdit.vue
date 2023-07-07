<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>
    <thread-edit
      @save="save"
      :isEdit="true"
      :id="this.thread.id"
      :title="thread.title"
      :text="text"
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
    id: {
      type: String,
      required: true,
    },
  },
  mixins: [asyncDataStatus],
  computed: {
    thread() {
      return findById(this.$store.state.threads.items, this.id);
    },
    text() {
      const post = findById(
        this.$store.state.posts.items,
        this.thread.posts[0]
      );
      return post ? post.text : "";
    },
  },
  methods: {
    ...mapActions("threads", ["updateThread", "fetchThread"]),
    ...mapActions("posts", ["fetchPost"]),
    async save({ title, text }) {
      const thread = await this.updateThread({
        id: this.id,
        title,
        text,
      });
      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
  },

  async created() {
    const thread = await this.fetchThread({ id: this.id });
    await this.fetchPost({ id: thread.posts[0] });
    this.asyncDataStatus_fetched();
  },
};
</script>

<style></style>
