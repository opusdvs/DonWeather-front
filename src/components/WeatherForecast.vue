<script setup></script>
<template>
  <div class="weather-forecast">
    <div class="forecast-card">
      <div class="info">
        <div class="label">Сегодня</div>
        <div class="value">+18°</div>
        <div class="desc">Ясно</div>
      </div>
    </div>

    <div class="forecast-card">
      <div class="info">
        <div class="label">Завтра</div>
        <div class="value">+16°</div>
        <div class="desc">Облачно</div>
      </div>
    </div>

    <div class="forecast-card">
      <div class="info">
        <div class="label">Послезавтра</div>
        <div class="value">+14°</div>
        <div class="desc">Дождь</div>
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
