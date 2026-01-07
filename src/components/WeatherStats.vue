<script setup>
const { label, stat } = defineProps({ label: String, stat: Number })
</script>
<template>
  <div class="weather-stats">
    <div class="stat-card">
      <div class="info">
        <div class="label">{{ label }}</div>
        <div class="value">{{ stat }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-stats {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.stat-card {
  background: #f0f4f8;
  border-radius: 12px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 120px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 24px;
}

.info .label {
  font-size: 14px;
  color: #555;
}

.info .value {
  font-size: 18px;
  font-weight: bold;
  color: #222;
}
</style>
