<script lang="tsx">
import type { VNode } from 'vue'
import * as d3 from 'd3'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChartSample2',
  data() {
    return {
      list: [
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
      ],
      index: 0,
      isPaused: false,
    }
  },
  created() {
    setInterval(() => {
      if (!this.isPaused) {
        this.index++
      }
    }, 1000)
  },
  render(): VNode {
    const pieArcData = d3
      .pie<{ name: string; value: number }>()
      .value((d) => d.value)(this.list)
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

    // const reveal = (i) => (path) =>
    //   path
    //     .transition()
    //     .duration(5000)
    //     .ease(d3.easeLinear)
    //     .attrTween('d', function () {
    //       return d3.interpolate(arcPie(i), activeArcPie(i))
    //     })

    return (
      <div class="chart-sample-2">
        <svg viewBox="-90 -90 180 180">
          <defs>
            <mask id="mask">
              <circle r="90" cx="0" cy="0" fill="white"></circle>
              <circle
                r="70"
                cx="0"
                cy="0"
                fill="black"
                fill-opacity="0.5"
              ></circle>
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
          <g mask="url(#mask)">
            {pieArcData.map((i, _, list) => {
              // const el = d3
              //   .create('path')
              //   .attr('fill', colors[i.index])
              //   .attr('d', arcPie(i))
              //   .node()

              return (
                <path
                  fill={colors[i.index]}
                  d={
                    i.index === this.index % list.length
                      ? activeArcPie(i)
                      : arcPie(i)
                  }
                  onMouseenter={() => this.onMouseEnter(i.index)}
                  onMouseleave={() => this.onMouseLeave(i.index)}
                ></path>
              )
            })}
          </g>

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
      </div>
    )
  },
  methods: {
    onMouseEnter(index) {
      this.index = index
      this.isPaused = true
    },
    onMouseLeave(index) {
      if (this.index === index) {
        this.isPaused = false
      }
    },
  },
})
</script>

<style scoped>
.chart-sample-2 {
  width: 180px;
  height: 700px;
}
</style>
