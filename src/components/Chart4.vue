<template>
  <div ref="el" class="chart-sample-4"></div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import useChart2 from '@/compositions/useChart2'

defineComponent({
  name: 'ChartSample4',
})
const el = ref()

useChart2(el)
</script>

<style scoped>
.chart-sample-4 {
  width: 200px;
  height: 200px;
  background: white;
}
</style>
