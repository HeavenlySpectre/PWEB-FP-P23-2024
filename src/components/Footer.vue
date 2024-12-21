<template>
  <footer class="footer">
    <div class="content">
      <p>
        &copy; 2023 IT-PWEB-P23. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
background: var(--background);
  padding: 1.5rem 0; /* Adjusted padding */
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: right;
}

.content {
  color: white;
  margin: 0 2rem;
}
</style>
