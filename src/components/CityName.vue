<script setup>
const props = defineProps({ name: String })
</script>
<template>
  <div class="city-name">{{ props.name }}</div>
</template>
<style scoped>
.city-name {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: var(--spacing-lg) 0;
  letter-spacing: 1px;
  position: relative;
  cursor: default;
  transition: transform 0.3s ease, filter 0.3s ease;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: var(--color-accent);
}

.city-name::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background: var(--gradient);
  margin: var(--spacing-sm) auto 0;
  border-radius: var(--radius-sm);
  transition: width 0.3s ease;
}

.city-name:hover {
  transform: translateY(-2px);
  filter: drop-shadow(0 4px 12px rgba(144, 217, 224, 0.3));
}

.city-name:hover::after {
  width: 70px;
}
</style>
