<template>
    <div class="chart-container">
      <canvas :id="chartId"></canvas>
    </div>
</template>
  
  <script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    }
  };
  </script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>