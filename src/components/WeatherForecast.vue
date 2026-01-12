<script setup>
  const { date, maxtemp_c, text } = defineProps({ date: String, maxtemp_c: Number, text: String })
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
</script>
<template>
  <div class="weather-forecast">
    <div class="forecast-card">
      <div class="info">
        <div class="label">{{ formattedDate }}</div>
        <div class="value">{{ maxtemp_c}}</div>
        <div class="desc">{{ text }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.weather-forecast {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.forecast-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 110px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  cursor: default;
}

.forecast-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  background: var(--color-bg-hover);
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info .label {
  font-size: 13px;
  color: var(--color-primary-dark);
  font-weight: 400;
  margin-bottom: var(--spacing-xs);
}

.info .value {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
  transition: transform 0.3s ease;
}

.forecast-card:hover .value {
  transform: scale(1.08);
}

.info .desc {
  font-size: 12px;
  color: var(--color-primary-dark);
  font-weight: 400;
}
</style>
