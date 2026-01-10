<script setup>
const name = defineModel()
const emit = defineEmits(['inputCity'])

function setCity() {
  emit('inputCity')
}
</script>

<template>
  <div class="city-input">
    <input v-model="name" type="text" placeholder="Введите город" />
    <button @click="setCity">Поиск</button>
  </div>
</template>

<style scoped>
.city-input {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin: var(--spacing-lg) 0;
}

.city-input input {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 16px;
  font-family: var(--font);
  background: var(--color-bg-card);
  border: 2px solid var(--color-bg-hover);
  border-radius: var(--radius-sm);
  outline: none;
  width: 240px;
  color: var(--color-primary);
  transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.city-input input::placeholder {
  color: var(--color-primary-dark);
}

.city-input input:focus {
  border-color: var(--color-accent);
  background: var(--color-bg-hover);
  box-shadow: 0 0 0 3px rgba(144, 217, 224, 0.1);
}

.city-input button {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 16px;
  font-family: var(--font);
  font-weight: 500;
  background: var(--gradient);
  color: var(--color-bg);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.city-input button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  opacity: 0.95;
}

.city-input button:active {
  transform: translateY(0);
}
</style>
