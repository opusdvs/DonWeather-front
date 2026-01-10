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
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-lg);
  width: 220px;
  text-align: center;
  margin: 0 auto;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  background: var(--color-bg-hover);
}

.temperature {
  font-size: 48px;
  font-weight: 700;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
}

.description {
  font-size: 16px;
  color: var(--color-primary-dark);
  font-weight: 400;
}
</style>
