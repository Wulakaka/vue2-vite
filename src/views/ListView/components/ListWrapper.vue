<script setup lang="ts">
import ItemWrapper from './ItemWrapper.vue'
import { computed, ref } from 'vue'

interface Wrapper {
  name: string
  id: number
}

function useList() {
  const current = ref<Wrapper | null>(null)
  const list = ref<Wrapper[]>([])

  list.value = Array.from({ length: 16 }, (_, index) => {
    return {
      name: `${index}`,
      id: index,
    }
  })
  const currentIndex = computed(() => {
    if (current.value) {
      return list.value.indexOf(current.value)
    } else {
      return -1
    }
  })
  const setCurrent = (item: Wrapper) => {
    current.value = item
  }

  const spliceItem = () => {
    const [item] = list.value.splice(currentIndex.value, 1)
    return item
  }

  const insertBefore = (index: number, item: Wrapper) => {
    list.value.splice(index, 0, item)
  }
  const insertAfter = (index: number, item: Wrapper) => {
    list.value.splice(index + 1, 0, item)
  }

  const exchangeBefore = (index: number) => {
    const item = spliceItem()
    insertBefore(index, item)
  }

  const exchangeAfter = (index: number) => {
    const item = spliceItem()
    insertAfter(index, item)
  }

  return {
    current,
    list,
    setCurrent,
    exchangeBefore,
    exchangeAfter,
  }
}

const { list, setCurrent, exchangeBefore, exchangeAfter } = useList()

function handleDragStart(i: Wrapper) {
  setCurrent(i)
}

function handleEnterLeft(index: number) {
  exchangeBefore(index)
}
function handleEnterRight(index: number) {
  exchangeAfter(index)
}
</script>
<template>
  <transition-group name="list-wrapper" tag="div" class="list-wrapper">
    <ItemWrapper
      v-for="(i, index) in list"
      :key="i.id"
      @drag-start="handleDragStart(i)"
      @enter-left="handleEnterLeft(index)"
      @enter-right="handleEnterRight(index)"
      v-bind="i"
    ></ItemWrapper>
  </transition-group>
</template>

<style scoped lang="scss">
.list-wrapper {
  display: flex;
  width: 800px;
  height: 800px;
  margin: auto;
  flex-wrap: wrap;

  &-enter-active {
    //position: absolute;
  }

  &-enter-to {
  }

  &-leave-active {
  }
  &-leave {
  }
  &-leave-to {
  }
}
</style>
