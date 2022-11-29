<script setup lang="ts">
import { defineComponent } from 'vue'
import ListWrapper from './components/ListWrapper.vue'

defineComponent({
  name: 'ListView',
})
</script>
<template>
  <div class="list-view">
    <ListWrapper></ListWrapper>
  </div>
</template>

<style scoped lang="scss">
.list-view {
  display: flex;
  align-items: center;
  height: 100vh;
}
</style>
