<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="text"
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue" type="submit">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    threadId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    save() {
      const post = {
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: "L664y3qZSubDbT1R6npC0EEybJ73",
      };
      this.$emit("save", post);
      this.text = "";
    },
  },
};
</script>

<style></style>
