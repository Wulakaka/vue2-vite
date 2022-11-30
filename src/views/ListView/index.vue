<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import ListWrapper from './components/ListWrapper.vue'
import type { Wrapper } from '@/views/ListView/types'

defineComponent({
  name: 'ListView',
})

const data1 = ref<Wrapper[]>(
  Array.from({ length: 8 }, (_, index) => {
    return {
      name: `${index}`,
      id: index,
      type: 'entity',
    }
  })
)
const data2 = ref<Wrapper[]>(
  Array.from({ length: 8 }, (_, index) => {
    return {
      name: `${index}`,
      id: index + 100,
      type: 'entity',
    }
  })
)
</script>
<template>
  <div class="list-view">
    <ListWrapper :data.sync="data1"></ListWrapper>
    <ListWrapper :data.sync="data2"></ListWrapper>
  </div>
</template>

<style scoped lang="scss">
.list-view {
  display: flex;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
}
</style>
