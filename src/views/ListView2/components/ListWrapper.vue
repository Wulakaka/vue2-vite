<script setup lang="ts">
defineProps<{
  data: { id: string; name: string }[]
}>()
</script>
<template>
  <div class="list-wrapper">
    <div v-for="i in data" :key="i.id">
      <slot :item="i.name"></slot>
    </div>
  </div>
</template>

<style scoped></style>
