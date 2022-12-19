import * as d3 from 'd3'
import { onMounted, ref, type Ref } from 'vue'

function getChart() {
  const svg = d3.create('svg').attr('viewBox', [-100, -100, 200, 200])

  const ball1 = svg
    .append('ellipse')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('rx', 80)
    .attr('ry', 80)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'transparent')

  const ball2 = svg
    .append('ellipse')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('rx', 60)
    .attr('ry', 60)
    .attr('stroke', '#90ff47')
    .attr('stroke-width', 2)
    .attr('fill', 'transparent')

  const defs = svg.append('defs')
  const l = defs.append('radialGradient').attr('id', 'gradient')
  Array.from({ length: 7 }, function (_, index) {
    return d3.interpolateRainbow(index / 7)
  }).forEach((color, i) => {
    l.append('stop')
      .attr('offset', i / 7)
      .attr('stop-color', color)
  })
  l.append('stop')
    .attr('offset', 1)
    .attr('stop-color', d3.interpolateRainbow(1))

  const ball3 = svg
    .append('ellipse')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('rx', 40)
    .attr('ry', 40)
    .attr('fill', 'url(#gradient)')

  const interval = 1500

  let i = 0

  const doAnimate = () => {
    const t = d3.transition().duration(interval).ease(d3.easeElasticInOut)

    // ball1.transition(t).attrTween('ry', function () {
    //   return function (t) {
    //     return Math.abs(t - 0.5) * 160
    //   }
    // })

    ball2.transition(t).attr('cy', i % 2 ? 0 : 50)

    i++
    setTimeout(doAnimate, interval)
  }

  setTimeout(doAnimate)
  return svg.node()
}

export default function useChart(el: Ref<HTMLElement | undefined>) {
  onMounted(() => {
    const svg = getChart()
    el.value?.appendChild(svg)
  })
}
