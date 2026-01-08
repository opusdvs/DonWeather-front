<script setup>
const props = defineProps({ name: String })
</script>
<template>
  <div class="city-name">{{ props.name }}</div>
</template>
<style scoped>
.city-name {
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  margin: 20px 0;
  letter-spacing: 1.5px;
  position: relative;
  cursor: default;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
  will-change: transform, filter;

  /* Градиентный текст (WebKit) */
  background: linear-gradient(90deg, #1e3a8a, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Фолбэк для других браузеров */
  color: #1e3a8a; /* если градиент не поддерживается */
}

/* Подчеркивающая линия */
.city-name::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: #3b82f6;
  margin: 10px auto 0;
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Hover эффекты */
.city-name:hover {
  transform: translateY(-4px);
  filter: drop-shadow(0 4px 10px rgba(59, 130, 246, 0.4));
}

.city-name:hover::after {
  width: 80px;
}
</style>
