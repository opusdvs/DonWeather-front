<script setup>
import { computed, ref } from 'vue'
import WeatherStats from './components/WeatherStats.vue'
import CityName from './components/CityName.vue'
import WeatherDisplay from './components/WeatherDisplay.vue'
import CityInput from './components/CityInput.vue'
import WeatherTips from './components/WeatherTips.vue'

const API_ENDPOINT = 'https://api.weatherapi.com/v1'
const city = ref()
const displayCityName = ref()
const data = ref()

async function getWeather() {
  const params = new URLSearchParams({
    q: city.value,
    lang: 'ru',
    key: 'cd3200bf0f914528862150404260801',
    day: 3,
  })
  const res = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`)
  data.value = await res.json()
}

const temp = computed(() => {
  if (!data.value) {
    return {}
  }
  return {
    temp: data.value.current.temp_c,
    desc: data.value.current.condition.text,
  }
})
const weather = computed(() => {
  if (!data.value) {
    return []
  }
  return [
    {
      label: 'Влажность',
      stat: data.value.current.humidity,
    },
    {
      label: 'Ветер',
      stat: data.value.current.wind_mph,
    },
    {
      label: 'Облачность',
      stat: data.value.current.cloud,
    },
  ]
})
</script>

<template>
  <div class="app">
    <CityName :name="displayCityName"></CityName>
    <WeatherDisplay :temp="temp.temp" :desc="temp.desc"></WeatherDisplay>
    <div class="stat-container">
      <WeatherStats v-for="item in weather" v-bind="item" :key="item.label"></WeatherStats>
    </div>
    <CityInput @keyup.enter="getWeather" @inputCity="getWeather" v-model="city"></CityInput>
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
