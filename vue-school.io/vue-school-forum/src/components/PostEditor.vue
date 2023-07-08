<template>
  <div class="col-full">
    <vee-form @submit="save" :key="formKey">
      <app-form-field
        as="textarea"
        name="text"
        v-model="postCopy.text"
        cols="30"
        rows="10"
        rules="required"
      />
      <div class="form-actions">
        <button class="btn-blue" type="submit">
          {{ post.id ? "Update Post" : "Submit post" }}
        </button>
      </div>
    </vee-form>
  </div>
</template>

<script>
export default {
  props: {
    threadId: {
      type: String,
    },
    post: {
      type: Object,
      default: () => ({ text: null }),
    },
  },
  data() {
    return {
      postCopy: { ...this.post },
      formKey: Math.random(),
    };
  },
  methods: {
    save() {
      this.$emit("save", { post: this.postCopy });
      this.postCopy.text = "";
      this.formKey = Math.random();
    },
  },
};
</script>

<style></style>
