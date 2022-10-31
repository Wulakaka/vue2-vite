import * as d3 from 'd3'
import { onMounted, type Ref } from 'vue'

function getChart() {
  const svg = d3.create('svg').attr('viewBox', [-100, -100, 200, 200])

  const clipPath = svg.append('clipPath').attr('id', 'clip')

  const flag1 = clipPath.append('path').attr('d', 'M 0, 0 H 50 V 50 z')
  const flag2 = clipPath.append('path').attr('d', 'M 0, 0 V -50 H 50 z')
  const flag3 = clipPath.append('path').attr('d', 'M 0, 0 H -50 V -50 z')
  const flag4 = clipPath.append('path').attr('d', 'M 0, 0 v 50 H -50 z')

  const group = svg.append('g').attr('clip-path', 'url(#clip)')

  svg.on('click', (event) => {
    const [x, y] = d3.pointer(event)
    const fill = d3.interpolateRainbow(Math.random())
    const t = d3.transition().duration(1000).ease(d3.easeCubicOut)
    const circle = group
      .append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('fill', fill)
      .attr('r', 0)
      .attr('opacity', 1)

    circle
      .transition(t)
      .attr('r', 200)
      .attrTween('opacity', function () {
        return function (t) {
          if (t > 0.5) {
            return (1 - t) / 0.5 + ''
          } else {
            return '1'
          }
        }
      })
      .remove()
  })
  return svg.node()
}

export default function useChart(el: Ref<HTMLElement | undefined>) {
  onMounted(() => {
    const svg = getChart()
    svg && el.value?.appendChild(svg)
  })
}
