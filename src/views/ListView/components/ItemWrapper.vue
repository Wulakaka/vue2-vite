<script setup lang="ts">
import { ref } from 'vue'
import overtime from '@/utils/overtime'
import type { Wrapper } from '@/views/ListView/types'
import { useDraggingItemStore } from '@/stores/draggingItem'
const store = useDraggingItemStore()

const props = defineProps<{
  data: Wrapper
}>()

const emit = defineEmits<{
  (e: 'drag-start'): void
  (e: 'drag-end'): void
  (e: 'enter-left'): void
  (e: 'enter-right'): void
  (e: 'drop', data: Wrapper): void
}>()

const isDragging = ref(false)

const interval = 300

const emitLeft = overtime(() => {
  emit('enter-left')
}, interval)

function handleTargetDragOverLeft(e: DragEvent) {
  e.preventDefault()
  emitLeft()
}

const emitRight = overtime(() => {
  emit('enter-right')
}, interval)
function handleTargetDragOverRight(e: DragEvent) {
  e.preventDefault()
  emitRight()
}

function handleTargetDragEnterLeft() {
  // console.log('left', props.name)
  // emit('enter-left')
}

function handleTargetDragEnterRight() {
  // console.log('right', props.name)
  // emit('enter-right')
}

function handleTargetDragLeaveLeft() {
  // console.log('leave left')
}
function handleTargetDragLeaveRight() {
  // console.log('leave right')
}

function handleSourceDrag() {
  // console.log('drag')
}

function handleSourceDragStart(e: DragEvent) {
  isDragging.value = true
  store.set(props.data)
  emit('drag-start')
}
function handleSourceDragEnd() {
  isDragging.value = false
  emit('drag-end')
}

function handleInnerDragOver(e: DragEvent) {
  e.preventDefault()
}

function handleDrop(e: DragEvent) {
  const data = store.item
  if (data) {
    emit('drop', data)
  }
  store.set(null)
}

function handleDragLeaveInner() {
  // console.log('drag leave inner')
}
</script>
<template>
  <div
    class="item-wrapper"
    :class="{
      'item-wrapper--dragging': isDragging,
      'item-wrapper--dragging': data.type === 'placeholder',
    }"
  >
    <div
      class="item-wrapper__left"
      @dragover.stop="handleTargetDragOverLeft"
      @dragenter="handleTargetDragEnterLeft"
      @dragleave="handleTargetDragLeaveLeft"
      @drop.stop="handleDrop"
    ></div>
    <div
      class="item-wrapper__right"
      @dragover.stop="handleTargetDragOverRight"
      @dragenter="handleTargetDragEnterRight"
      @dragleave="handleTargetDragLeaveRight"
      @drop.stop="handleDrop"
    ></div>
    <div
      class="item-wrapper__center"
      draggable
      @drag="handleSourceDrag"
      @dragstart="handleSourceDragStart"
      @dragend="handleSourceDragEnd"
      @dragover="handleInnerDragOver"
      @dragleave="handleDragLeaveInner"
    >
      {{ data.name }}
    </div>
  </div>
</template>

<style scoped lang="scss">
%mark {
  outline-offset: -1px;
  outline: rgba(red, 0.2) dashed 1px;
  background: rgba(red, 0.01);
}
.item-wrapper {
  width: 200px;
  height: 200px;
  display: flex;
  position: relative;
  transition: 0.3s;
  @extend %mark;

  &--dragging {
    opacity: 0;
  }

  &__left,
  &__right {
    flex: 50% 0 0;
    height: 100%;
    @extend %mark;
  }

  &__center {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50px;
    top: 50px;
    @extend %mark;
  }
}
</style>
