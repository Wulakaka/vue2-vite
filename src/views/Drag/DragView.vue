<script setup lang="ts">
import { ref } from 'vue'
import DropTarget from './components/DropTarget.vue'
const status = ref('')
const count = ref(0)

function handleSourceDragStart(e: DragEvent) {
  console.log('drag start', count.value++)
  status.value = 'dragging'
}

function handleSourceDragEnd(e: DragEvent, str = '') {
  console.log('drag end', str, count.value++)
  status.value = ''
  Promise.resolve('drag end promise' + str).then(console.log)
}

function handleViewDrop(e: DragEvent, str = '') {
  // 事件冒泡是宏任务
  console.log('drop outer', str, count.value++)
  Promise.resolve('drop outer promise' + str).then(console.log)
}

function handleViewDragEnd(e: DragEvent, str = '') {
  console.log('drag end outer', str, count.value++)
  Promise.resolve('drag end outer promise' + str).then(console.log)
}

// 从outer移入inner一定会触发outer的dragleave
// console.log(1)
// Promise.resolve(2).then(console.log)
// console.log(3)
</script>
<template>
  <div
    class="drag-view"
    @drop="handleViewDrop"
    @dragend="handleViewDragEnd"
    @dragend.capture="(e) => handleViewDragEnd(e, 'capture')"
    @drop.capture="(e) => handleViewDrop(e, 'capture')"
  >
    {{ status }}

    <div class="outer">
      <div
        class="source"
        draggable
        @dragstart="handleSourceDragStart"
        @dragend="handleSourceDragEnd"
        @dragend.capture="(e) => handleSourceDragEnd(e, 'capture')"
      ></div>
    </div>
    <DropTarget name="target outer">
      <DropTarget name="target inner"></DropTarget>
    </DropTarget>
  </div>
</template>

<style scoped lang="scss">
%mark {
  border: 1px solid red;
}
.drag-view {
  background: white;
  color: black;
}
.source {
  width: 100px;
  height: 100px;
  @extend %mark;
}
.target {
  width: 200px;
  height: 200px;
  @extend %mark;
}
</style>
