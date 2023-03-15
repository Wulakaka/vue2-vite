<script setup lang="ts"></script>

<template>
  <main class="clip">ABCDEFGHIJKLMN</main>
</template>
<style scoped>
.clip {
  line-height: 30vmin;
  font-weight: bold;
  //animation: 0.5s forwards b;
  background: conic-gradient(
    #068d9d 12%,
    #fff 12%,
    #fff 33%,
    #6d9dc5 33%,
    #6d9dc5 55%,
    orange 55%,
    orange 71%,
    #b5deff 70%,
    #b5deff 87%,
    #aeecef 87%
  );
  //background-clip: text;
  //-webkit-background-clip: text;
  background-size: 50%;
  color: #0000;
  //cursor: pointer;
  font-size: 13vmin;
  //text-align: center !important;
}
</style>
