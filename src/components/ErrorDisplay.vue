<script setup>
defineProps({
  show: Boolean,
  code: { type: [String, Number], default: 'Ошибка' },
  message: { type: String, default: 'Попробуйте снова.' },
})

const emit = defineEmits(['closeError'])
function closeError() {
  emit('closeError', false)
}
</script>

<template>
  <transition name="slide-fade">
    <div v-if="show" class="error-toast">
      <div class="error-card">
        <span class="error-code">{{ code }}</span>
        <p class="error-message">{{ message }}</p>
        <button class="error-btn" @click="closeError">Закрыть</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Toast в левом верхнем углу на десктопе, по центру сверху на мобильных */
.error-toast {
  position: fixed;
  top: var(--spacing-lg);
  left: var(--spacing-lg);
  right: auto;
  z-index: 100;
  max-width: calc(100vw - calc(var(--spacing-lg) * 2));
}

.error-card {
  background: var(--color-bg-card);
  color: var(--color-primary);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xs);
  min-width: 240px;
  max-width: 100%;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.error-code {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--color-primary-dark);
  font-weight: 400;
  letter-spacing: 0.5px;
}

.error-message {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
}

.error-btn {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  align-self: flex-end;
  font-size: 13px;
  font-family: var(--font);
  font-weight: 500;
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease;
}

.error-btn:hover {
  border-color: var(--color-accent);
  background: var(--color-bg-hover);
  transform: translateY(-1px);
}

.error-btn:active {
  transform: translateY(0);
}

/* Анимация появления */
.slide-fade-enter-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.slide-fade-leave-active {
  transition: opacity 0.25s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}
.slide-fade-leave-to {
  opacity: 0;
}

/* Адаптивное позиционирование для мобильных устройств */
@media (max-width: 768px) {
  .error-toast {
    position: fixed;
    top: var(--spacing-lg);
    left: 50%;
    right: auto;
    width: calc(100% - calc(var(--spacing-lg) * 2));
    max-width: 400px;
    transform: translateX(-50%);
  }

  .error-card {
    min-width: auto;
    width: 100%;
  }

  /* Учитываем transform для центрирования в анимации */
  .slide-fade-enter-from {
    opacity: 0;
    transform: translate(-50%, -12px);
  }
}

/* Для очень маленьких экранов */
@media (max-width: 480px) {
  .error-toast {
    top: var(--spacing-sm);
    width: calc(100% - calc(var(--spacing-sm) * 2));
    max-width: none;
  }

  .error-card {
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .error-message {
    font-size: 13px;
  }
}
</style>
