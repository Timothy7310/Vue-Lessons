<template>
  <vee-form @submit="save">
    <app-form-field
      label="Title"
      name="title"
      v-model="forum.title"
      rules="required"
      type="text"
    />
    <app-form-field
      as="textarea"
      label="Content"
      name="content"
      v-model="forum.text"
      rules="required"
      rows="8"
      cols="140"
    />

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
  </vee-form>
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
      this.$emit("clean");
      this.$emit("save", { ...this.forum });
    },
  },
  watch: {
    forum: {
      handler() {
        if (this.forum.title !== this.title || this.forum.text !== this.text) {
          this.$emit("dirty");
        } else {
          this.$emit("clean");
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
