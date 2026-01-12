<script setup>
const emit = defineEmits(['closeError'])
function changeError() {
  emit('closeError', false)
}
</script>
<template>
  <div class="error-wrap" role="alert">
    <div class="error-card">
      <span class="error-code">Error Code</span>
      <h1 class="error-title">Error title</h1>
      <p class="error-message">Error message</p>
      <button class="error-btn" @click="changeError">Закрыт</button>
    </div>
  </div>
</template>

<style scoped>
:root {
  --bg: #0f0f10;
  --card: #151518;
  --text: #e6e6eb;
  --muted: #9a9aa3;
  --accent: #7c7cff;
}

.error-wrap {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--bg);
  color: var(--text);
}

.error-card {
  max-width: 420px;
  padding: 28px 24px 24px;
  border-radius: 14px;
  background: var(--card);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  text-align: center;
}

.error-code {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.error-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
}

.error-message {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--muted);
}

.error-btn {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: var(--text);
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
}

.error-btn:hover {
  border-color: var(--accent);
}
</style>
