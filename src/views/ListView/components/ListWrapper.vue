<script setup lang="ts">
import ItemWrapper from './ItemWrapper.vue'
import { computed, Ref, ref } from 'vue'
import type { Wrapper } from '@/views/ListView/types'
import overtime from '@/utils/overtime'
import { useDraggingItemStore } from '@/stores/draggingItem'

const props = defineProps<{
  data: Wrapper[]
}>()

const emit = defineEmits<{
  (e: 'update:data', val: Wrapper[]): void
}>()

const list = computed({
  set(val: Wrapper[]) {
    emit('update:data', val)
  },
  get() {
    return props.data
  },
})

function useList(list: Ref<Wrapper[]>) {
  const placeholder: Wrapper = {
    name: '',
    id: -1,
    type: 'placeholder',
  }
  const hasPlaceholder = computed(() => {
    return list.value.includes(placeholder)
  })

  const placeholderIndex = computed(() => list.value.indexOf(placeholder))

  const removeItem = (i: Wrapper) => {
    const index = list.value.indexOf(i)
    if (index < 0) return
    list.value.splice(index, 1)
  }

  const removePlaceholder = () => {
    removeItem(placeholder)
  }

  const insertPlaceholderBefore = (index: number) => {
    if (hasPlaceholder.value) {
      exchangeBefore(placeholderIndex.value, index)
    } else {
      list.value.splice(index, 0, placeholder)
    }
  }

  const insertPlaceholderAfter = (index: number = list.value.length - 1) => {
    if (hasPlaceholder.value) {
      exchangeAfter(placeholderIndex.value, index)
    } else {
      list.value.splice(index + 1, 0, placeholder)
    }
  }

  const exchangeBefore = (currentIndex: number, targetIndex: number) => {
    if (currentIndex === targetIndex) return
    if (currentIndex === targetIndex - 1) return
    const arr = list.value.slice()
    const current = arr[currentIndex]
    if (currentIndex < targetIndex) {
      // 插入后再删除
      arr.splice(targetIndex, 0, current)
      arr.splice(currentIndex, 1)
    } else {
      // 先删除再插入
      arr.splice(currentIndex, 1)
      arr.splice(targetIndex, 0, current)
    }
    list.value = arr
  }

  const exchangeAfter = (currentIndex: number, targetIndex: number) => {
    if (currentIndex === targetIndex) return
    if (currentIndex === targetIndex + 1) return
    const arr = list.value.slice()
    const current = arr[currentIndex]
    if (currentIndex < targetIndex) {
      // 先删除再插入
      arr.splice(currentIndex, 1)
      arr.splice(targetIndex, 0, current)
    } else {
      // 先删除再插入
      arr.splice(currentIndex, 1)
      arr.splice(targetIndex + 1, 0, current)
    }
    list.value = arr
  }

  const replacePlaceholder = (i: Wrapper) => {
    if (hasPlaceholder.value) {
      const arr = list.value.slice()
      arr.splice(placeholderIndex.value, 1, i)
      list.value = arr
    }
  }

  const setPlaceholderId = (i: Wrapper) => {
    placeholder.id = i.id
  }

  return {
    removeItem,
    removePlaceholder,
    setPlaceholderId,
    insertPlaceholderBefore,
    insertPlaceholderAfter,
    replacePlaceholder,
  }
}

const {
  removeItem,
  removePlaceholder,
  setPlaceholderId,
  insertPlaceholderBefore,
  insertPlaceholderAfter,
  replacePlaceholder,
} = useList(list)

const store = useDraggingItemStore()

function handleDragStart(i: Wrapper) {
  removeItem(i)
}

function handleEnterLeft(index: number) {
  if (store.item) {
    setPlaceholderId(store.item)
  }
  insertPlaceholderBefore(index)
}
function handleEnterRight(index: number) {
  if (store.item) {
    setPlaceholderId(store.item)
  }
  insertPlaceholderAfter(index)
}
const interval = 300
const handleDragOver = overtime(() => {
  console.log('drag over list')
  insertPlaceholderAfter()
}, interval)

function handleDragOverList(e: DragEvent) {
  e.preventDefault()
  if (store.item) {
    setPlaceholderId(store.item)
  }
  handleDragOver()
}
function handleDragEnterList() {
  // console.log('drag-enter list')
}
const refListWrapper = ref<HTMLElement>()
function handleDragLeaveList(e: DragEvent) {
  if (e.target === refListWrapper.value?.firstChild) {
    console.log('leave')
    // removePlaceholder()
  }
}

function handleDrop(e: DragEvent) {
  const data = store.item
  if (data) {
    replacePlaceholder(data)
  }
}
</script>
<template>
  <div
    class="list-wrapper"
    @drop="handleDrop"
    @dragover="handleDragOverList"
    @dragenter="handleDragEnterList"
    @dragleave.capture="handleDragLeaveList"
    ref="refListWrapper"
  >
    <transition-group
      name="list-wrapper__inner"
      tag="div"
      class="list-wrapper__inner"
    >
      <ItemWrapper
        v-for="(i, index) in list"
        :key="i.id"
        @drag-start="handleDragStart(i)"
        @enter-left="handleEnterLeft(index)"
        @enter-right="handleEnterRight(index)"
        @drop="replacePlaceholder"
        :data="i"
      ></ItemWrapper>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.list-wrapper {
  width: 800px;
  height: 800px;
  margin: auto;

  &__inner {
    display: flex;
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
      position: relative;
      width: 0;
    }
  }
}
</style>
