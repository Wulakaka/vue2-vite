<script setup lang="ts">
import { ref } from 'vue'
const status = ref('')
const targetText = ref('')

function handleSourceDragStart() {
  console.log('drag start')
  status.value = 'dragging'
}

function handleSourceDragEnd() {
  console.log('drag end')
  status.value = ''
}

function handleTargetDragOver() {
  targetText.value = 'dragover'
}

function handleTargetDrop() {
  console.log('drop')
  targetText.value = 'drop'
}

function handleViewDrop() {
  console.log('drop view')
}

function handleViewDragEnd() {
  console.log('drag end view')
}
</script>
<template>
  <div class="drag-view" @drop="handleViewDrop" @dragend="handleViewDragEnd">
    {{ status }}

    <div class="outer">
      <div
        class="source"
        draggable
        @dragstart="handleSourceDragStart"
        @dragend="handleSourceDragEnd"
      ></div>
    </div>

    <div
      class="target"
      @dragover.prevent="handleTargetDragOver"
      @drop="handleTargetDrop"
    >
      {{ targetText }}
    </div>
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
