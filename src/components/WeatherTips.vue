<script setup>
const { tips } = defineProps({ tips: Array })
</script>
<template>
  <div class="weather-tips">
    <h3>Советы</h3>
    <ul v-if="tips?.length" class="tips-list">
      <li v-for="(tip, i) in tips" :key="i" class="tip-item">
        {{ tip.text }}
      </li>
    </ul>
  </div>
</template>
<style scoped>
.weather-tips {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.weather-tips h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.tips-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  flex: 1;
}

.tip-item {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-primary-dark);
}
</style>
