<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import List from './components/ListWrapper.vue'
import Item from './components/ItemWrapper.vue'

defineComponent({
  name: 'ListView2',
})

const list = ref([
  {
    id: 'A',
    name: 'A',
  },
  {
    id: 'B',
    name: 'B',
  },
  {
    id: 'C',
    name: 'C',
  },
])
</script>
<template>
  <div>
    123
    <List :data="list">
      <template v-slot="{ item }">
        <Item class="item-name">{{ item }}</Item>
      </template>
    </List>
  </div>
</template>
<style scoped></style>
