<template>
  <div v-if="thread && text" class="col-full push-top">
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
  computed: {
    thread() {
      return findById(this.$store.state.threads, this.id);
    },
    text() {
      const post = findById(this.$store.state.posts, this.thread.posts[0]);
      return post ? post.text : "";
    },
  },
  methods: {
    async save({ title, text }) {
      const thread = await this.$store.dispatch("updateThread", {
        id: this.id,
        title,
        text,
      });
      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
  },

  async created() {
    const thread = await this.$store.dispatch("fetchThread", { id: this.id });
    this.$store.dispatch("fetchPost", { id: thread.posts[0] });
  },
};
</script>

<style></style>
