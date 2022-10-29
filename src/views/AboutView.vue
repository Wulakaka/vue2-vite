<template>
  <div class="about">
    <!--    <h1>This is an about page</h1>-->
    <!--    <SvgSample></SvgSample>-->
    <!--    <SwiperTest></SwiperTest>-->
    <Chart3></Chart3>
    <Chart4></Chart4>
  </div>
</template>
<script setup>
// import SwiperTest from '@/components/Swiper/SwiperTest.vue'
// import SvgSample from '@/components/SvgSample.vue'
import Chart3 from '@/components/Chart3.vue'
import Chart4 from '@/components/Chart4.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
