<script setup>
const { label, stat } = defineProps({ label: String, stat: Number })
</script>
<template>
  <div class="weather-stats">
    <div class="stat-card">
      <div class="info">
        <div class="label">{{ label }}</div>
        <div class="value">{{ stat }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-stats {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
}

.stat-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  min-width: 130px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  background: var(--color-bg-hover);
}

.icon {
  font-size: 24px;
  color: var(--color-accent);
}

.info {
  display: flex;
  flex-direction: column;
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
}
</style>
