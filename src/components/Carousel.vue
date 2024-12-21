<template>
  <div class="page">
    <div class="carousel">
      <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div class="carousel-item" v-for="(item, index) in items" :key="index">
          <img :src="item.src" :alt="item.alt" />
          <div class="carousel-caption">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control prev" @click="prev">‹</button>
      <button class="carousel-control next" @click="next">›</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      items: [
        {
          src: "https://via.placeholder.com/150",
          alt: "Wi-Fi",
          title: "Wi-Fi",
          description: "High-speed internet access available 24/7."
        },
        {
          src: "https://via.placeholder.com/150",
          alt: "Laundry",
          title: "Laundry",
          description: "On-site laundry facilities for your convenience."
        },
        {
          src: "https://via.placeholder.com/150",
          alt: "Kitchen",
          title: "Kitchen",
          description: "Fully equipped kitchen for all your cooking needs."
        },
      ]
    };
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    }
  }
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  flex: 0 0 100%;
  position: relative;
}

.carousel-item img {
  width: 100%;
  height: 400px; /* Adjusted height */
  object-fit: cover; /* Maintain aspect ratio */
}

.carousel-caption {
  position: absolute;
  bottom: 10px;
  right: 30px; /* Changed from left to right */
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: 10px; /* Adjusted margin */
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s ease; /* Smooth transition */
}

.carousel:hover .carousel-caption {
  opacity: 1; /* Visible on hover */
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  margin: 0 20px; /* Adjusted margin */
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}

</style>
