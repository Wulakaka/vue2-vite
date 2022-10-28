<script lang="ts" setup>
import * as d3 from 'd3'
import { defineComponent, onMounted, ref } from 'vue'

defineComponent({
  name: 'ChartSample1',
})

const list = ref([
  {
    name: 'A',
    value: 10,
  },
  {
    name: 'B',
    value: 20,
  },
  {
    name: 'C',
    value: 20,
  },
  {
    name: 'D',
    value: 20,
  },
])

const index = ref(0)
const isPaused = ref(false)

setInterval(() => {
  if (!isPaused.value) {
    index.value++
  }
}, 1000)

const pieArcData = d3
  .pie<{ name: string; value: number }>()
  .value((d) => d.value)(list.value)
const arcPie = d3
  .arc()
  .innerRadius(70)
  .outerRadius(90)
  .padRadius(90)
  .padAngle(10 / 90)
  .cornerRadius(1)

const activeArcPie = d3
  .arc()
  .innerRadius(50)
  .outerRadius(90)
  .padRadius(90)
  .padAngle(10 / 90)
  .cornerRadius(1)

const colors = [
  '#6266ea',
  '#8184ef',
  '#3254dd',
  '#2b8ef3',
  '#48e5e5',
  '#bee5fb',
]

const onMouseEnter = (i) => {
  index.value = i
  isPaused.value = true
}
const onMouseLeave = (i) => {
  if (index.value === i) {
    isPaused.value = false
  }
}

const el = ref()
onMounted(() => {
  pieArcData.forEach((i) => {
    const p = d3
      .create('path')
      .attr('fill', colors[i.index])
      .attr('d', arcPie(i))
      .attr('stroke', 'black')
      .attr('stroke-width', '10')
      .node()

    el.value.appendChild(p)
  })
})
</script>
<template>
  <svg viewBox="-90 -90 180 180">
    <defs>
      <mask id="mask">
        <circle r="90" cx="0" cy="0" fill="white"></circle>
        <circle r="70" cx="0" cy="0" fill="black" fill-opacity="0.5"></circle>
        <circle r="50" cx="0" cy="0" fill="black"></circle>
      </mask>
      <pattern
        id="pattern"
        x="0"
        y="0"
        width="5"
        height="100"
        patternUnits="userSpaceOnUse"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="100"
          stroke="#F0F0F7"
          stroke-width="1"
        ></line>
      </pattern>
    </defs>
    <g mask="url(#mask)" ref="el"></g>
    <circle
      r="48"
      cx="0"
      cy="0"
      fill="url(#pattern)"
      stroke="#cacdf7"
      stroke-dasharray="2,4"
      stroke-width="4"
      transform="rotate(45)"
    ></circle>
  </svg>
</template>

<style scoped>
.chart-sample-2 {
  width: 180px;
  height: 700px;
}
</style>
