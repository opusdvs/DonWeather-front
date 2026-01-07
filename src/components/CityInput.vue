<script setup>
const emits = defineEmits({
  inputCity(payload) {
    return payload ? true : false
  },
})

function log() {
  emits('inputCity', 'Moscow')
}
</script>

<template>
  <div class="city-input">
    <input type="text" placeholder="Введите город" />
    <button @click="log()">Поиск</button>
  </div>
</template>

<style scoped>
.city-input {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.city-input input {
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #1e40af;
  border-radius: 8px;
  outline: none;
  width: 200px;
  transition: border-color 0.2s ease;
}

.city-input input:focus {
  border-color: #3b82f6;
}

.city-input button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1e40af;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.city-input button:hover {
  background-color: #3b82f6;
}
</style>
