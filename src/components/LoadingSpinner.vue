<script setup>
defineProps({
  size: { type: String, default: 'medium' }, // small, medium, large
  message: { type: String, default: '' }
})
</script>

<template>
  <div class="loading-container">
    <div class="spinner" :class="`spinner-${size}`">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
}

.spinner {
  position: relative;
  display: inline-block;
}

.spinner-small {
  width: 32px;
  height: 32px;
}

.spinner-medium {
  width: 48px;
  height: 48px;
}

.spinner-large {
  width: 64px;
  height: 64px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-ring:nth-child(1) {
  animation-delay: 0s;
  border-top-color: var(--color-accent);
}

.spinner-ring:nth-child(2) {
  animation-delay: 0.2s;
  border-top-color: var(--color-accent-secondary);
  width: 75%;
  height: 75%;
  top: 12.5%;
  left: 12.5%;
}

.spinner-ring:nth-child(3) {
  animation-delay: 0.4s;
  border-top-color: var(--color-accent);
  width: 50%;
  height: 50%;
  top: 25%;
  left: 25%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-message {
  font-size: 14px;
  color: var(--color-primary-dark);
  font-weight: 400;
  margin: 0;
  text-align: center;
}

/* Альтернативный вариант - простой спиннер */
.spinner-simple {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-bg-hover);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
</style>
