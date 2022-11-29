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

  const exchangeBefore = (index: number) => {
    console.log('before', 'placed', index, 'current', currentIndex.value)
    if (!current.value) return
    if (currentIndex.value === index) return
    if (currentIndex.value === index - 1) return
    const arr = list.value.slice()
    if (currentIndex.value < index) {
      // 插入后再删除
      arr.splice(index, 0, current.value)
      arr.splice(currentIndex.value, 1)
    } else {
      // 先删除再插入
      arr.splice(currentIndex.value, 1)
      arr.splice(index, 0, current.value)
    }
    list.value = arr
  }

  const exchangeAfter = (index: number) => {
    console.log('after', 'placed', index, 'current', currentIndex.value)
    if (!current.value) return
    if (currentIndex.value === index) return
    if (currentIndex.value === index + 1) return
    const arr = list.value.slice()
    if (currentIndex.value < index) {
      // 先删除再插入
      arr.splice(currentIndex.value, 1)
      arr.splice(index, 0, current.value)
    } else {
      // 先删除再插入
      arr.splice(currentIndex.value, 1)
      arr.splice(index + 1, 0, current.value)
    }
    list.value = arr
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
