<template>
  <div>
    <svg
      width="250"
      viewBox="0 0 200 85"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <!-- Filter declaration -->
        <filter
          id="MyFilter"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="120"
        >
          <!-- offsetBlur -->
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset in="blur" dx="4" dy="4" result="offsetBlur" />

          <!-- litPaint -->
          <feSpecularLighting
            in="blur"
            surfaceScale="5"
            specularConstant=".75"
            specularExponent="20"
            lighting-color="#bbbbbb"
            result="specOut"
          >
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite
            in="specOut"
            in2="SourceAlpha"
            operator="in"
            result="specOut"
          />
          <feComposite
            in="SourceGraphic"
            in2="specOut"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint"
          />

          <!-- merge offsetBlur + litPaint -->
          <feMerge>
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="litPaint" />
          </feMerge>
        </filter>
      </defs>

      <!-- Graphic elements -->
      <g filter="url(#MyFilter)">
        <path
          fill="none"
          stroke="#D90000"
          stroke-width="10"
          d="M50,66 c-50,0 -50,-60 0,-60 h100 c50,0 50,60 0,60z"
        />
        <path
          fill="#D90000"
          d="M60,56 c-30,0 -30,-40 0,-40 h80 c30,0 30,40 0,40z"
        />
        <g fill="#FFFFFF" stroke="black" font-size="45" font-family="Verdana">
          <text x="52" y="52">SVG</text>
        </g>
      </g>
    </svg>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="Gradient">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="white" stop-opacity="1" />
        </linearGradient>
        <mask id="Mask">
          <rect x="0" y="0" width="200" height="200" fill="url(#Gradient)" />
        </mask>
      </defs>

      <rect x="0" y="0" width="200" height="200" fill="green" />
      <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)" />
    </svg>
    <svg viewBox="0 0 300 300" width="300" height="300">
      <path id="my_path" d="M 20,20 C 40,40 80,40 100,20" fill="transparent" />
      <text>
        <textPath
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#my_path"
        >
          This text follows a curve.
        </textPath>
      </text>
    </svg>
    <svg
      width="300"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <linearGradient id="Gradient1">
          <stop offset="5%" stop-color="white" />
          <stop offset="95%" stop-color="blue" />
        </linearGradient>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="5%" stop-color="red" />
          <stop offset="95%" stop-color="orange" />
        </linearGradient>

        <pattern
          id="Pattern"
          x="0"
          y="10"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="50"
            stroke="red"
            stroke-width="4"
          ></line>
          <!--          <rect x="0" y="0" width="50" height="50" fill="skyblue" />
          <rect x="0" y="0" width="25" height="25" fill="url(#Gradient2)" />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="url(#Gradient1)"
            fill-opacity="0.5"
          />-->
        </pattern>
      </defs>

      <circle
        fill="url(#Pattern)"
        stroke="none"
        cx="150"
        cy="150"
        r="100"
        transform="rotate(45, 150,150)"
      />
    </svg>
    <svg
      width="220"
      height="220"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="GradientPad"
          cx="0.5"
          cy="0.5"
          r="0.4"
          fx="0.75"
          fy="0.75"
          spreadMethod="pad"
        >
          <stop offset="0%" stop-color="red" />
          <stop offset="100%" stop-color="blue" />
        </radialGradient>
        <radialGradient
          id="GradientRepeat"
          cx="0.5"
          cy="0.5"
          r="0.4"
          fx="0.75"
          fy="0.75"
          spreadMethod="repeat"
        >
          <stop offset="0%" stop-color="red" />
          <stop offset="100%" stop-color="blue" />
        </radialGradient>
        <radialGradient
          id="GradientReflect"
          cx="0.5"
          cy="0.5"
          r="0.4"
          fx="0.75"
          fy="0.75"
          spreadMethod="reflect"
        >
          <stop offset="0%" stop-color="red" />
          <stop offset="100%" stop-color="blue" />
        </radialGradient>
      </defs>

      <rect
        x="10"
        y="10"
        rx="15"
        ry="15"
        width="100"
        height="100"
        fill="url(#GradientPad)"
      />
      <rect
        x="10"
        y="120"
        rx="15"
        ry="15"
        width="100"
        height="100"
        fill="url(#GradientRepeat)"
      />
      <rect
        x="120"
        y="120"
        rx="15"
        ry="15"
        width="100"
        height="100"
        fill="url(#GradientReflect)"
      />

      <text
        x="15"
        y="30"
        fill="white"
        font-family="sans-serif"
        font-size="12pt"
      >
        Pad
      </text>
      <text
        x="15"
        y="140"
        fill="white"
        font-family="sans-serif"
        font-size="12pt"
      >
        Repeat
      </text>
      <text
        x="125"
        y="140"
        fill="white"
        font-family="sans-serif"
        font-size="12pt"
      >
        Reflect
      </text>
    </svg>
    <svg
      width="120"
      height="240"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="Gradient1">
          <stop class="stop1" offset="0%" />
          <stop class="stop2" offset="50%" />
          <stop class="stop3" offset="100%" />
        </linearGradient>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="red" />
          <stop offset="50%" stop-color="black" stop-opacity="0" />
          <stop offset="100%" stop-color="blue" />
        </linearGradient>
      </defs>

      <rect
        id="rect1"
        x="10"
        y="10"
        rx="15"
        ry="15"
        width="100"
        height="100"
        fill="url(#Gradient1)"
      />
      <rect
        x="10"
        y="120"
        rx="15"
        ry="15"
        width="100"
        height="100"
        fill="url(#Gradient2)"
      />
    </svg>
    <svg
      width="325px"
      height="325px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M80 80
           A 45 45, 0, 0, 0, 125 125
           L 125 80 Z"
        fill="green"
      />
      <path
        d="M230 80
           A 45 45, 0, 1, 0, 275 125
           L 275 80 Z"
        fill="red"
      />
      <path
        d="M80 230
           A 45 45, 0, 0, 1, 125 275
           L 125 230 Z"
        fill="purple"
      />
      <path
        d="M230 230
           A 45 45, 0, 1, 1, 275 275
           L 275 230 Z"
        fill="blue"
      />
    </svg>
    <svg
      width="320px"
      height="320px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 315
           L 110 215
           A 30 50 0 0 1 162.55 162.45
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10"
        stroke="black"
        fill="green"
        stroke-width="2"
        fill-opacity="0.5"
      />
    </svg>
    <svg
      width="190px"
      height="160px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 80 Q 52.5 10, 95 80 T 180 80"
        stroke="black"
        fill="transparent"
      />
    </svg>
    <svg
      width="190px"
      height="160px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent" />
    </svg>
    <svg
      width="190px"
      height="160px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
        stroke="black"
        fill="transparent"
      />
      <g fill="red">
        <circle r="1" cx="40" cy="10"></circle>
        <circle r="1" cx="65" cy="10"></circle>
        <circle r="1" cx="95" cy="80"></circle>
        <circle r="1" cx="150" cy="150"></circle>
        <circle r="1" cx="180" cy="80"></circle>
      </g>
    </svg>
    <svg
      width="190px"
      height="160px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10 C 20 20, 40 20, 50 10"
        stroke="black"
        fill="transparent"
      />

      <g fill="red">
        <circle r="1" cx="20" cy="20"></circle>
        <circle r="1" cx="40" cy="20"></circle>
        <circle r="1" cx="50" cy="10"></circle>
      </g>
      <path
        d="M70 10 C 70 20, 120 20, 120 10"
        stroke="black"
        fill="transparent"
      />
      <g fill="red">
        <circle r="1" cx="70" cy="20"></circle>
        <circle r="1" cx="120" cy="20"></circle>
        <circle r="1" cx="120" cy="10"></circle>
      </g>
      <path
        d="M130 10 C 120 20, 180 20, 170 10"
        stroke="black"
        fill="transparent"
      />
      <path
        d="M10 60 C 20 80, 40 80, 50 60"
        stroke="black"
        fill="transparent"
      />
      <path
        d="M70 60 C 70 80, 110 80, 110 60"
        stroke="black"
        fill="transparent"
      />
      <path
        d="M130 60 C 120 80, 180 80, 170 60"
        stroke="black"
        fill="transparent"
      />
      <path
        d="M10 110 C 20 140, 40 140, 50 110"
        stroke="black"
        fill="transparent"
      />
      <path
        d="M70 110 C 70 140, 110 140, 110 110"
        stroke="black"
        fill="transparent"
      />
      <path
        d="M130 110 C 120 140, 180 140, 170 110"
        stroke="black"
        fill="transparent"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgSample',
}
</script>

<style scoped>
/*//#rect1 {*/
/*//  fill: url(#Gradient1);*/
/*//}*/
.stop1 {
  stop-color: red;
}
.stop2 {
  stop-color: black;
  stop-opacity: 0;
}
.stop3 {
  stop-color: blue;
}
</style>
