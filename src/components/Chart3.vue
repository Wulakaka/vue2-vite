<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import useChart from '@/compositions/useChart'

defineComponent({
  name: 'ChartSample3',
})

const el = ref<HTMLElement>()
useChart(el)
</script>
<template>
  <div ref="el" class="chart-sample-3"></div>
</template>
<style scoped>
.chart-sample-3 {
  width: 180px;
  height: 180px;
  background: white;
}
</style>
