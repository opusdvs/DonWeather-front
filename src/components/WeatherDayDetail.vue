<script setup>
const {weather, temp, formattedDate} = defineProps({ weather: Array, temp: Object, formattedDate: String })
</script>
<template>
  <div class="day-detail">
    <article class="day-detail__card">
      <header class="day-detail__header">
        <h3 class="day-detail__title">{{ formattedDate }}</h3>
      </header>
      <div class="day-detail__main">
        <span class="day-detail__temp">{{ temp.temp }}°</span>
        <p class="day-detail__condition">{{ temp.desc }}</p>
      </div>
      <div class="day-detail__grid">
        <div v-for="item in weather" :key="item.label" class="day-detail__item">
          <span class="day-detail__item-label">{{ item.label }}</span>
          <span class="day-detail__item-value">{{ item.stat }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.day-detail {
  width: 100%;
}

.day-detail__header {
  text-align: center;
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid rgba(144, 217, 224, 0.12);
}

.day-detail__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

.day-detail__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xl);
}

.day-detail__temp {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-accent);
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.day-detail__condition {
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  color: var(--color-primary-dark);
  text-align: center;
}

.day-detail__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.day-detail__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(0, 0, 0, 0.15);
  border-radius: var(--radius-sm);
  transition: background 0.2s ease;
}

.day-detail__item:hover {
  background: rgba(0, 0, 0, 0.22);
}

.day-detail__item-label {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-primary-dark);
  text-align: center;
}

.day-detail__item-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
}

@media (max-width: 480px) {
  .day-detail__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .day-detail__temp {
    font-size: 30px;
  }
}
</style>
