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
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  width: 320px;
  max-width: 100%;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}

.weather-tips:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  background: var(--color-bg-hover);
}

.weather-tips h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.weather-tips p {
  font-size: 15px;
  color: var(--color-primary-dark);
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}
</style>
