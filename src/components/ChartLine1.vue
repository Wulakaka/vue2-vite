<template>
  <div ref="el" class="chart-line-1"></div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import * as d3 from 'd3'

defineComponent({
  name: 'ChartLine1',
})
const el = ref()

function useChart(container: Ref<HTMLElement>) {
  const width = 1000
  const height = 400
  const length = 20
  const margin = {
    bottom: 20,
    left: 30,
    top: 10,
  }

  const svg = d3.create('svg').attr('width', width).attr('height', height)

  const data = Array.from({ length }, function (_, index) {
    return {
      x: index + 1,
      y: Math.round(Math.random() * 1000 - 500),
    }
  })

  const x = d3
    .scaleLinear()
    .domain([0, length])
    .range([margin.left, width - 10])

  const dataY = data.map((d) => d.y)
  const y = d3
    .scaleLinear()
    .domain([d3.min(dataY) || 0, d3.max(dataY) || 0])
    .range([height - margin.bottom, margin.top])

  function addAxis() {
    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )

    const yAxis = d3.axisLeft(y)
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
  }

  function addLine() {
    const line = d3
      .line<{ x: number; y: number }>()
      .curve(d3.curveStep)
      .x((d) => x(d.x))
      .y((d) => y(d.y))(data)

    svg
      .append('path')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('d', line)
      .attr('fill', 'none')
  }
  function addTip() {
    data.forEach((d) => {
      const point = svg
        .append('circle')
        .attr('cx', x(d.x))
        .attr('cy', y(d.y))
        .attr('r', 4)
        .attr('fill', 'none')
        .attr('stroke', '#333')
        .attr('stroke-width', '1')

      const text = svg
        .append('text')
        .attr('x', x(d.x))
        .attr('y', y(d.y))
        .attr('text-anchor', 'middle')
        .attr('dy', 20)
        .text(d.y)
        .style('cursor', 'pointer')

      text.on('mouseenter', function () {
        const position = y(d.y)
        const line = svg
          .append('path')
          .attr('d', `M0, ${position} H ${width}`)
          .attr('stroke', 'black')

        text.on('mouseleave', function () {
          line.remove()
        })
      })
    })
  }

  function addArea() {
    const area = d3
      .area<{ x: number; y: number }>()
      .defined((d) => !!(d.x % 5))
      .x((d) => x(d.x))
      .y1((d) => y(d.y))
      .y0(y(0))(data)

    svg.append('path').attr('d', area).attr('fill', 'aliceblue')
  }
  addAxis()
  addArea()
  addLine()
  addTip()

  onMounted(() => {
    const el = svg.node()
    el && container.value.append(el)
  })
}
useChart(el)
</script>

<style scoped>
.chart-line-1 {
  width: 800px;
  height: 400px;
  background: white;
}
</style>
