<script setup>
import { ref } from 'vue';
const city = ref("")
const emit = defineEmits(['inputCity'])

function setCity() {
  emit('inputCity', city.value)
  city.value = ""
}

function cityValidation(value) {
  city.value = value.target.value.replace(/\d/g, '')
}
</script>

<template>
  <div class="city-input">
    <input @input="cityValidation" @keyup.enter="setCity" v-model="city" type="text" placeholder="Введите город" />
    <button @click="setCity">Поиск</button>
  </div>
</template>

<style scoped>
.city-input {
  display: flex;
  gap: var(--spacing-sm);
  width: 100%;
}

.city-input input {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 16px;
  font-family: var(--font);
  background: rgba(0, 0, 0, 0.15);
  border: 1.5px solid transparent;
  border-radius: var(--radius-sm);
  outline: none;
  flex: 1;
  min-width: 0;
  color: var(--color-primary);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.city-input input::placeholder {
  color: var(--color-primary-dark);
  opacity: 0.6;
}

.city-input input:focus {
  border-color: var(--color-accent);
  background: rgba(0, 0, 0, 0.22);
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
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
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
