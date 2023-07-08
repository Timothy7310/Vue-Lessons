<template>
  <div class="text-center" style="margin-bottom: 15px">
    <button class="btn-green btn-xsmall" @click.prevent="getRandomImage">
      Random Avatar
    </button>
    <br />
    <small style="opacity: 0.5"
      >Powered by <a href="https://unsplash.com/">Unsplash</a></small
    >
  </div>
</template>
<script>
import { arrayRandom } from "@/helpers";
import random from "lodash";

export default {
  methods: {
    async getRandomImage() {
      const searchTerms = [
        "cats",
        "dogs",
        "abstract",
        "cars",
        "mountains",
        "beach",
        "landscape",
        "object",
        "food",
        "flowers",
        "architecture",
        "yellow",
        "green",
        "blue",
        "orange",
        "black",
        "white",
        "brown",
        "red",
        "patterns",
        "animal",
        "code",
        "space",
      ];
      const randomWord = random(searchTerms);
      const res = await fetch(
        `https://api.unsplash.com/photos/random?client_id=T1zi0DPflA4q3xgDnW0Wz86-0vspjQNKqTgt8n8LGVY&query=${randomWord}`
      );
      const data = await res.json();
      const randomImage = data.urls.small;
      this.$emit("hit", randomImage);
    },
  },
};
</script>
