<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import axios from 'axios'
import WeatherStats from './components/WeatherStats.vue'
import CityName from './components/CityName.vue'
import WeatherDisplay from './components/WeatherDisplay.vue'
import CityInput from './components/CityInput.vue'
import WeatherTips from './components/WeatherTips.vue'
import WeatherForecast from './components/WeatherForecast.vue'
import DeveloperContacts from './components/DeveloperContacts.vue'
import CopyrightFooter from './components/CopyrightFooter.vue'
import ErrorDisplay from './components/ErrorDisplay.vue'

const API_ROUTES = {
  register: 'weather/register',
}
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
const errorStatus = ref(false)
const city = ref(localStorage.getItem('city') || 'Москва')
const displayCityName = ref()
const data = ref()

watch(city, (newCity) => {
  if (!errorStatus.value) {
    localStorage.setItem('city', newCity)
  }
})

onMounted(() => {
  getWeather()
})

function closeError(value) {
  errorStatus.value = value
}
function setDisplayCityName(city = 'Москва') {
  displayCityName.value = city
}

async function getWeather() {
  const reqJson = {
    q: city.value,
    lang: 'ru',
    days: '3',
  }
  try {
    const res = await axios.post(`${API_ENDPOINT}/${API_ROUTES.register}`, reqJson)
    data.value = res.data
    errorStatus.value = false
    setDisplayCityName(data.value.location.name)
  } catch (err) {
    errorStatus.value = true
    console.error('Ошибка запроса:', err)
  }
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
      stat: data.value.current.wind_kph,
    },
    {
      label: 'Давление',
      stat: data.value.current.pressure_mb,
    },
  ]
})

const forecast = computed(() => {
  if (!data.value) {
    return []
  }
  return data.value.forecast.forecastday
})
</script>

<template>
  <div class="app">
    <ErrorDisplay v-show="errorStatus" @closeError="closeError"></ErrorDisplay>
    <div class="main-content">
      <CityName :name="displayCityName"></CityName>
      <WeatherDisplay :temp="temp.temp" :desc="temp.desc"></WeatherDisplay>
      <div class="stat-container">
        <WeatherStats v-for="item in weather" v-bind="item" :key="item.label"></WeatherStats>
      </div>
      <div class="forecast-section">
        <h2 class="forecast-title">Прогноз погоды на 3 дня</h2>
        <div class="forecast-container">
          <WeatherForecast
            v-for="item in forecast"
            :key="item.date"
            :date="item.date"
            :maxtemp_c="item.day.maxtemp_c"
            :text="item.day.condition.text"
          />
        </div>
      </div>
      <CityInput @keyup.enter="getWeather" @inputCity="getWeather" v-model="city"></CityInput>
      <WeatherTips></WeatherTips>
      <CopyrightFooter></CopyrightFooter>
    </div>
    <aside class="sidebar">
      <DeveloperContacts></DeveloperContacts>
    </aside>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  padding: var(--spacing-lg);
  gap: var(--spacing-lg);
  align-items: flex-start;
  justify-content: center;
  position: relative;
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 1 auto;
  max-width: 1200px;
  gap: var(--spacing-lg);
  margin: 0 auto;
}

.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: var(--spacing-lg);
  top: var(--spacing-lg);
  min-width: 280px;
  z-index: 10;
}

.stat-container {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-lg);
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.forecast-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;
}

.forecast-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-primary);
  text-align: center;
  margin: 0;
  letter-spacing: 0.5px;
}

.forecast-container {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-lg);
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 1024px) {
  .app {
    flex-direction: column;
    justify-content: flex-start;
  }

  .main-content {
    max-width: 100%;
    width: 100%;
  }

  .sidebar {
    position: static;
    width: 100%;
    min-width: auto;
    align-items: center;
  }
}
</style>
