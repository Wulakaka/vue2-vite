<template>
  <div ref="el" class="chart-sample-4"></div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import useChart5 from '@/compositions/useChart5'

defineComponent({
  name: 'ChartSample5',
})
const el = ref()

useChart5(el)
</script>

<style scoped>
.chart-sample-4 {
  width: 200px;
  height: 200px;
  background: white;
}
</style>
