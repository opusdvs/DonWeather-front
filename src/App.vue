<script setup>
import WeatherStats from './components/WeatherStats.vue'
import CityName from './components/CityName.vue'
import WeatherDisplay from './components/WeatherDisplay.vue'
import CityInput from './components/CityInput.vue'
import WeatherTips from './components/WeatherTips.vue'

const data = {
  label: 'Влажность',
  stat: 90,
}

function getCity(city) {
  console.log(city)
}
</script>

<template>
  <div class="app">
    <CityName></CityName>
    <WeatherDisplay></WeatherDisplay>
    <div class="stat-container">
      <WeatherStats v-bind="data"></WeatherStats>
      <WeatherStats v-bind="data"></WeatherStats>
    </div>
    <CityInput @input-city="getCity"></CityInput>
    <WeatherTips></WeatherTips>
  </div>
</template>

<style scoped>
/* Общий фон приложения */
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e6f0fa;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  gap: 20px;
}

/* Хедер */
.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-header h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 8px;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
  color: #1e3a8a;
}

.stat-container {
  display: flex; /* Горизонтальное расположение элементов */
  flex-direction: row; /* Явно задаём направление по горизонтали */
  gap: 20px; /* Расстояние между карточками */
  justify-content: center; /* Центрируем все карточки по горизонтали */
  align-items: center; /* Выравниваем карточки по вертикали */
  margin-top: 20px; /* Отступ сверху */
  flex-wrap: wrap; /* Если мало места — перенос на новую строку */
}
</style>
