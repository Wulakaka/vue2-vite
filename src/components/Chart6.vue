<template>
  <div ref="el" class="chart-sample-6"></div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import useChart from '@/compositions/useChart6'

defineComponent({
  name: 'ChartSample6',
})
const el = ref()

useChart(el)
</script>

<style scoped>
.chart-sample-6 {
  width: 200px;
  height: 200px;
  background: white;
}
</style>
