<template>
  <div ref="el" class="chart-bar-1"></div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import * as d3 from 'd3'

defineComponent({
  name: 'ChartBar1',
})
const el = ref()

function useChart(container: Ref<HTMLElement>) {
  const width = 1000
  const height = 400

  const margin = { top: 20, right: 0, bottom: 0, left: 30 }

  const fruits = [
    { name: '🍊', count: 21 },
    { name: '🍇', count: 13 },
    { name: '🍏', count: 8 },
    { name: '🍌', count: 5 },
    { name: '🍐', count: 3 },
    { name: '🍋', count: 2 },
    { name: '🍎', count: 1 },
    { name: '🍉', count: 1 },
  ]

  const color = d3
    .scaleSequential()
    .domain([0, d3.max(fruits, (d) => d.count)])
    .interpolator(d3.interpolateBlues)

  const svg = d3.create('svg').attr('width', width).attr('height', height)

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(fruits, (d) => d.count) || 0])
    .range([margin.left, width - margin.right])
    .interpolate(d3.interpolateRound)

  const y = d3
    .scaleBand()
    .domain(fruits.map((d) => d.name))
    .range([margin.top, height - margin.bottom])
    .padding(0.1)
    .round(true)

  function addAxis() {
    svg
      .append('g')
      .attr('transform', `translate(0,${margin.top})`)
      .call(d3.axisTop(x))
      .call((g) => g.select('.domain').remove())

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .call((g) => g.select('.domain').remove())
  }

  function addBar() {
    const g = svg.append('g')
    fruits.forEach((d) => {
      g.append('rect')
        .attr('y', y(d.name))
        .attr('x', x(0))
        .attr('width', x(d.count) - x(0))
        .attr('height', y.bandwidth())
        .attr('fill', color(d.count))
    })
  }

  function addText() {
    const g = svg
      .append('g')
      .attr('text-anchor', 'end')
      .attr('transform', `translate(-6, ${y.bandwidth() / 2})`)
    fruits.forEach((d) => {
      g.append('text')
        .attr('fill', d3.lab(color(d.count)).l < 60 ? 'white' : 'black')
        .attr('y', y(d.name))
        .attr('x', x(d.count))
        .attr('dy', '0.35em')
        .text(d.count)
    })
  }

  addAxis()
  addBar()
  addText()

  onMounted(() => {
    const el = svg.node()
    el && container.value.append(el)
  })
}
useChart(el)
</script>

<style scoped>
.chart-bar-1 {
  width: 800px;
  height: 400px;
  background: white;
}
</style>
