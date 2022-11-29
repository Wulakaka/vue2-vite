<template>
  <div class="image-view">
    <img alt="Vue logo" class="image-view__img" src="@/assets/img_1.png" />
  </div>
</template>

<script setup></script>

<style scoped>
.image-view {
  width: 100%;
  overflow: hidden;
}
.image-view__img {
  width: 140%;
  position: relative;
  left: -20%;
}
</style>
