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
  width: 100%;
}

.forecast-card {
  background: rgba(0, 0, 0, 0.15);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: background 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}

.forecast-card:hover {
  background: rgba(0, 0, 0, 0.22);
  transform: translateY(-2px);
}

.forecast-card--active {
  background: rgba(144, 217, 224, 0.12);
  box-shadow: inset 0 0 0 1.5px var(--color-accent);
}

.forecast-card--active:hover {
  background: rgba(144, 217, 224, 0.18);
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.info .label {
  font-size: 13px;
  color: var(--color-primary-dark);
  font-weight: 400;
}

.info .value {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
  transition: transform 0.3s ease;
}

.forecast-card:hover .value {
  transform: scale(1.08);
}

.info .desc {
  font-size: 12px;
  color: var(--color-primary-dark);
  font-weight: 400;
  text-align: center;
}
</style>
