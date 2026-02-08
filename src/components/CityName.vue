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
  letter-spacing: 1px;
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
}
</style>
