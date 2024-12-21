<template>
  <div class="about">
    <h1>Boarding House Rules</h1>
    <div class="rules-container">
      <ul>
        <li>1. Keep your room clean and tidy at all times.</li>
        <li>2. Do not make loud noises after 10 PM.</li>
        <li>3. Always respect the privacy of other residents.</li>
        <li>4. Smoking is not allowed inside building.</li>
        <li>5. Dispose of all trash properly in the bins provided.</li>
        <li>6. Guests are only allowed between 9 AM and 9 PM.</li>
        <li>7. Residents must accompany their guests at all times.</li>
        <li>8. Overnight guests need a permit from the management.</li>
        <li>9. Handle all facilities with care to avoid damage.</li>
        <li>10. Report any damages to the management immediately.</li>
        <li>11. Do not remove facility items from their designated areas.</li>
        <li>12. Violating the rules will result in appropriate sanctions.</li>
      </ul>
    </div>
  </div>
</template>

<style>

.about {
  padding: 40px 40px;
  background-color: #242424;
  border-radius: 8px;
  width: fit-content;
  margin: 40px auto;
}

.about h1 {
  font-size: 28px;
  color: #FFD700;
  text-align: center;
  margin-bottom: 30px;
}

.rules-container {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

.rules-container ul {
  list-style-type: none;
  padding: 0;
}

.rules-container li {
  padding: 15px;
  margin-bottom: auto;
  font-size: 16px;
  color: #f9f9f9;
}

.rules-container::-webkit-scrollbar {
  width: 8px;
}

.rules-container::-webkit-scrollbar-track {
  background: #333;
  border-radius: 4px;
}

.rules-container::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

.rules-container::-webkit-scrollbar-thumb:hover {
  background: #666;
}

@media (min-width: 1024px) {
  .about {
    min-height: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
