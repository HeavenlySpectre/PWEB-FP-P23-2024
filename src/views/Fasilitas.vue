<template>
  <div id="app">
    <Carousel />
    <h1>Facilities</h1>
    <div class="facility-details">
      <div class="facility-card">
        <h2>WiFi</h2>
        <p>High-speed internet access with speeds up to 100 Mbps available throughout the facility.</p>
      </div>
      <div class="facility-card">
        <h2>Laundry</h2>
        <p>On-site laundry services available 24/7, including washing machines, dryers, and ironing facilities.</p>
      </div>
      <div class="facility-card">
        <h2>Kitchen</h2>
        <p>Fully equipped kitchen with modern appliances including refrigerator, microwave, and stove.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel.vue';

export default {
  name: 'App',
  components: {
    Carousel
  }
}
</script>

<style>
#app {
  min-height: 80vh;
  background: var(--background);
}

h1 {
  color: #FFD700;
  font-size: 24px;
  margin: 20px;
}

.facility-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
}

.facility-card {
  background: #242424;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(33.333% - 40px);
  box-sizing: border-box;
}

.facility-card h2 {
  font-size: 1.25rem;
  margin-bottom: 15px;
  color: #f0f0f0;
}

.facility-card p {
  margin-bottom: 15px;
  font-size: 1rem;
  color: #f5f5f5;
}

.facility-card ul {
  list-style-type: disc;
  padding-left: 25px;
}
</style>