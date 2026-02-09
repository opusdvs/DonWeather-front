<script setup>
const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<template>
  <button class="button-geo" @click="handleClick" type="button">
    <svg class="button-geo__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
    <span>Определить по геолокации</span>
  </button>
</template>

<style scoped>
.button-geo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 16px;
  font-family: var(--font);
  font-weight: 500;
  background: var(--gradient);
  color: var(--color-bg);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  width: 100%;
  margin-top: var(--spacing-md);
}

.button-geo:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  opacity: 0.95;
}

.button-geo:active {
  transform: translateY(0);
}

.button-geo:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-geo__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.button-geo span {
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 480px) {
  .button-geo {
    font-size: 14px;
    padding: var(--spacing-xs) var(--spacing-md);
  }
  
  .button-geo__icon {
    width: 18px;
    height: 18px;
  }
}
</style>
