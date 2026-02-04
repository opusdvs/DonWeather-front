<script setup>
  const { date, maxtemp_c, text, selected } = defineProps({
    date: String,
    maxtemp_c: Number,
    text: String,
    selected: { type: Boolean, default: false },
  })
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  const emit = defineEmits(['clickForecast'])
  function handleClick() {
    emit('clickForecast', date, maxtemp_c, text)
  }
</script>
<template>
  <div class="weather-forecast">
    <div
      class="forecast-card"
      :class="{ 'forecast-card--active': selected }"
      role="button"
      tabindex="0"
      @click="handleClick"
      @keydown.enter.space.prevent="handleClick"
    >
      <div class="info">
        <div class="label">{{ formattedDate }}</div>
        <div class="value">{{ maxtemp_c }}°C</div>
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
  cursor: pointer;
}

.forecast-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  background: var(--color-bg-hover);
}

.forecast-card--active {
  box-shadow: 0 0 0 2px var(--color-accent);
  background: var(--color-bg-hover);
}

.forecast-card--active:hover {
  box-shadow: 0 0 0 2px var(--color-accent), var(--shadow-md);
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
