<script setup>
import { ref } from 'vue'
const tipsText = ref('Можно гулять')
</script>
<template>
  <div class="weather-tips">
    <h3>Рекомендации на сегодня</h3>
    <p>{{ tipsText }}</p>
  </div>
</template>
<style scoped>
.weather-tips {
  background: #f0f8ff;
  border-radius: 16px;
  padding: 20px;
  width: 280px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  margin-top: 20px;
}

.weather-tips:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.weather-tips h3 {
  font-size: 18px;
  color: #1e40af;
  margin-bottom: 12px;
}

.weather-tips p {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  margin: 0;
}
</style>
