<script setup>
const emit = defineEmits(['updateWeather'])

function handleUpdateWeather() {
  emit('updateWeather')
}
</script>

<template>
  <button class="weather-update" @click="handleUpdateWeather" type="button" title="Обновить погоду">
    Обновить
  </button>
</template>

<style scoped>
.weather-update {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 16px;
  font-family: var(--font);
  font-weight: 500;
  background: var(--gradient);
  color: var(--color-bg);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
  white-space: nowrap;
  min-width: 120px;
}

.weather-update:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  opacity: 0.95;
}

.weather-update:active {
  transform: translateY(0);
}

.weather-update:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Responsive */
@media (max-width: 480px) {
  .weather-update {
    font-size: 14px;
    padding: var(--spacing-xs) var(--spacing-md);
  }
}
</style>
