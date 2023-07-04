<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="postCopy.text"
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue" type="submit">
          {{ post.id ? "Update Post" : "Submit post" }}
        </button>
      </div>
    </form>
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
    };
  },
  methods: {
    save() {
      // const post = {
      //   text: this.text,
      //   threadId: this.threadId,
      // };
      // this.$emit("save", post: this.postCopy);
      // this.text = "";
      this.$emit("save", { post: this.postCopy });
      this.postCopy.text = "";
    },
  },
};
</script>

<style></style>
