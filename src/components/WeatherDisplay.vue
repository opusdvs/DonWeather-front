<script setup>
const { temp, desc } = defineProps({ temp: Number, desc: String })
</script>
<template>
  <div class="weather-card">
    <div class="temperature">{{ temp }}°C</div>
    <div class="description">{{ desc }}</div>
  </div>
</template>
<style scoped>
.weather-card {
  background: #f0f8ff;
  border-radius: 16px;
  padding: 25px 20px;
  width: 200px;
  text-align: center;
  margin: 0 auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.weather-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.temperature {
  font-size: 36px;
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 5px;
}

.description {
  font-size: 16px;
  color: #555;
}
</style>
