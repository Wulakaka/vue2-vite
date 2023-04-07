<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { debounce, throttle } from 'lodash-es'

const props = defineProps<{
  name: string
}>()

const { name } = toRefs(props)

const targetText = ref('')
const log = throttle(
  (str: string) => {
    console.log(str)
  },
  100,
  {
    leading: true,
    trailing: false,
  }
)
function handleDragOver(e: DragEvent) {
  e.stopPropagation()
  // console.log(`[${name.value}] dragover`)
  log(`[${name.value}] dragover`)
  targetText.value = 'dragover'
}

function handleDragEnter(e: DragEvent) {
  e.stopPropagation()
  console.log(`[${name.value}] dragenter`)
}

function handleDragLeave() {
  console.log(`[${name.value}] dragleave`)
  targetText.value = 'dragleave'
}

function handleDrop(e: DragEvent, str = '') {
  console.log(`[${name.value}] drop`, str)
  targetText.value = 'drop'
  Promise.resolve(`[${name.value}] drop promise ` + str).then(console.log)
}
</script>
<template>
  <div
    class="drop-target"
    @dragover.prevent="handleDragOver"
    @dragenter="handleDragEnter"
    @drop="handleDrop"
    @drop.capture="(e) => handleDrop(e, 'capture')"
    @dragleave="handleDragLeave"
  >
    {{ targetText }}
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
%mark {
  border: 1px solid red;
}
.drop-target {
  min-width: 200px;
  min-height: 200px;
  padding: 20px;
  @extend %mark;
}
</style>
