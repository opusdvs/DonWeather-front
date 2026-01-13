<script setup>
defineProps({
  show: Boolean,
  code: { type: [String, Number], default: 'Ошибка' },
  message: { type: String, default: 'Попробуйте снова.' },
})
</script>

<template>
  <transition name="slide-fade">
    <div v-if="show" class="error-toast">
      <div class="error-card">
        <span class="error-code">{{ code }}</span>
        <p class="error-message">{{ message }}</p>
        <button class="error-btn" @click="$emit('closeError', false)">Закрыть</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Toast в левом верхнем углу */
.error-toast {
  position: absolute;
  top: 20px; /* отступ сверху */
  left: 20px; /* отступ слева */
  z-index: 100;
}

.error-card {
  background: #151518;
  color: #e6e6eb;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 240px;
}

.error-code {
  font-size: 12px;
  text-transform: uppercase;
  color: #9a9aa3;
}

.error-message {
  font-size: 14px;
}

.error-btn {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: #e6e6eb;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-end;
  font-size: 13px;
}

.error-btn:hover {
  border-color: #7c7cff;
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
</style>
