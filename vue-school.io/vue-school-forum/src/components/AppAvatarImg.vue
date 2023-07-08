<template>
  <img :src="src || '/user-placeholder.jpg'" />
</template>

<script>
export default {
  props: {
    src: { type: String },
  },
};
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
