<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="text"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <router-link
        :to="{ name: 'Forum', params: { id: forumId } }"
        class="btn btn-ghost"
        >Cancel</router-link
      >
      <button class="btn btn-blue" type="submit" name="Publish">Publish</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      text: "",
    };
  },
  methods: {
    save() {
      this.$emit("save", { title: this.title, text: this.text });
    },
  },
};
</script>

<style></style>
