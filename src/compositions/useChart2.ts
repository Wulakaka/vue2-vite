import * as d3 from 'd3'
import { onMounted, type Ref } from 'vue'

function getChart() {
  const svg = d3.create('svg').attr('viewBox', [-100, -100, 200, 200])

  const group = svg.append('g').attr('fill', 'red')

  const flag1 = group.append('path').attr('d', 'M 0, 0 H 50 V 50 z')
  const flag2 = group.append('path').attr('d', 'M 0, 0 V -50 H 50 z')
  const flag3 = group.append('path').attr('d', 'M 0, 0 H -50 V -50 z')
  const flag4 = group.append('path').attr('d', 'M 0, 0 v 50 H -50 z')

  const flags = [flag1, flag2, flag3, flag4]

  flags.forEach((flag, index) => {
    flag.attr('fill', d3.interpolateRainbow(index / 4))
  })

  const interval = 1500

  let i = 0

  const t = d3.transition().duration(interval).ease(d3.easeElasticInOut)

  setTimeout(() => {
    group.transition(t).on('start', function repeat() {
      i++
      d3.active(this)
        .attrTween('transform', function () {
          return function (t) {
            return `rotate(${45 * t + 45 * i})`
          }
        })
        .transition()
        .delay(interval)
        .on('start', repeat)
    })

    flags.forEach((flag, index) => {
      const t = d3.transition().duration(interval).ease(d3.easeLinear)
      flag.transition(t).on('start', function repeat() {
        d3.active(this)
          .attrTween('fill', function () {
            return function (t) {
              return d3.interpolateRainbow(index / 4 + t)
            }
          })
          .transition()
          .on('start', repeat)
      })
    })
  })

  return svg.node()
}

export default function useChart(el: Ref<HTMLElement | undefined>) {
  onMounted(() => {
    const svg = getChart()
    svg && el.value?.appendChild(svg)
  })
}
