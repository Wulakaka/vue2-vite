import * as d3 from 'd3'
import { onMounted, ref, type Ref } from 'vue'

function getChart(list) {
  const arcPie = d3
    .arc()
    .innerRadius(70)
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

  const basis = d3.interpolateRgbBasis(colors)

  const svg = d3.create('svg').attr('viewBox', [-90, -90, 180, 180])
  const defs = svg.append('defs')
  const mask = defs.append('mask').attr('id', 'mask')
  mask
    .append('circle')
    .attr('r', 90)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', 'white')

  mask
    .append('circle')
    .attr('r', 70)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', 'black')
    .attr('fill-opacity', 0.5)

  mask
    .append('circle')
    .attr('r', 50)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', 'black')

  const pattern = defs
    .append('pattern')
    .attr('id', 'pattern')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 5)
    .attr('height', 100)
    .attr('patternUnits', 'userSpaceOnUse')

  pattern
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', 100)
    .attr('stroke', '#F0F0F7')
    .attr('stroke-width', 1)

  const group = svg.append('g').attr('mask', 'url(#mask)')

  const pieArcData = d3
    .pie<{ name: string; value: number }>()
    .value((d) => d.value)(list)
  const paths = pieArcData.map((i) => {
    return group
      .append('path')
      .attr('fill', basis(i.index / list.length))
      .attr('d', arcPie(i))
  })

  let index = 0

  setInterval(() => {
    index++
    paths.forEach((p, i) => {
      if (i === index % list.length) {
        const t = d3.transition().duration(1000).ease(d3.easeBounceOut)
        p.transition(t).attrTween('d', function () {
          return function (t) {
            const arc = d3
              .arc()
              .innerRadius(70 - t * 20)
              .outerRadius(90)
              .padRadius(90)
              .padAngle(10 / 90)
              .cornerRadius(1)

            return arc(pieArcData[i])
          }
        })
      } else if (i === (index - 1) % list.length) {
        const t = d3.transition().duration(1000).ease(d3.easeBounceIn)
        p.transition(t).attrTween('d', function () {
          return function (t) {
            const arc = d3
              .arc()
              .innerRadius(50 + 20 * t)
              .outerRadius(90)
              .padRadius(90)
              .padAngle(10 / 90)
              .cornerRadius(1)

            return arc(pieArcData[i])
          }
        })
      }
    })
  }, 1000)

  const innerCircle = svg
    .append('circle')
    .attr('r', 48)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', 'url(#pattern)')
    .attr('stroke', '#cacdf7')
    .attr('stroke-dasharray', [2, 4])
    .attr('stroke-width', 4)
    .attr('transform', 'rotate(0)')

  setInterval(() => {
    const t = d3.transition().duration(2000).ease(d3.easeLinear)
    innerCircle.transition(t).attrTween('transform', function () {
      return function (t) {
        return `rotate(${t * 180})`
      }
    })
  }, 2000)

  return svg.node()
}

export default function useChart(el: Ref<HTMLElement | undefined>) {
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
  onMounted(() => {
    const svg = getChart(list.value)
    el.value?.appendChild(svg)
  })
}
