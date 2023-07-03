<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="forum.title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="forum.text"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <router-link
        :to="{ name: isEdit ? 'ThreadShow' : 'Forum', params: { id } }"
        class="btn btn-ghost"
        >Cancel</router-link
      >
      <button
        class="btn btn-blue"
        type="submit"
        :name="isEdit ? 'Update' : 'Publish'"
      >
        {{ isEdit ? "Update" : "Publish" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      forum: {
        title: this.title,
        text: this.text,
      },
    };
  },
  methods: {
    save() {
      this.$emit("save", { ...this.forum });
    },
  },
};
</script>

<style></style>
