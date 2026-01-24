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
import LoadingSpinner from './components/LoadingSpinner.vue'
const API_ROUTES = {
  register: 'weather/register',
}

const API_ENDPOINT = window.__ENV__.API_ENDPOINT
if (!API_ENDPOINT) {
  console.error('API_ENDPOINT is not defined')
}
const errorStatus = ref(false)
const city = ref(localStorage.getItem('city') || 'Москва')
const displayCityName = ref()
const data = ref()
const errorCode = ref("")
const errorMessage = ref("")
const loading = ref(false)
const loadingMessage = ref("Загрузка данных...")

onMounted(() => {
  getWeather(city.value)
})

function closeError(value) {
  errorStatus.value = value
}
function setDisplayCityName(city = 'Москва') {
  displayCityName.value = city
}

async function getWeather(value) {
  city.value = value
  if (city.value === "") {
    errorStatus.value = true
    errorCode.value = "Информация"
    errorMessage.value = "Введите город"
    return
  }
  loading.value = true
  const reqJson = {
    q: city.value,
    lang: 'ru',
    days: '3',
  }
  try {
    const res = await axios.post(`${API_ENDPOINT}/${API_ROUTES.register}`, reqJson)
    errorStatus.value = false
    data.value = res.data
    if (data.value?.location?.name) {
      localStorage.setItem('city', data.value.location.name)
      setDisplayCityName(data.value.location.name)
    }
  } catch (err) {
    errorStatus.value = true

    // Проверяем тип ошибки и обрабатываем соответственно
    if (err.response?.status === 404) {
      errorCode.value = "Не найдено"
      errorMessage.value = "Город не найден. Проверьте название и попробуйте снова."
    } else {
      errorCode.value = "Ошибка"
      errorMessage.value = "Неверное название города"
    }

  } finally {
    loading.value = false
  }
}

const temp = computed(() => {
  if (!data.value?.current) {
    return {}
  }
  return {
    temp: data.value.current?.temp_c ?? null,
    desc: data.value.current?.condition?.text ?? 'Нет данных',
  }
})
const weather = computed(() => {
  if (!data.value?.current) {
    return []
  }
  return [
    {
      label: 'Влажность',
      stat: data.value.current?.humidity ?? 0,
    },
    {
      label: 'Ветер',
      stat: data.value.current?.wind_kph ?? 0,
    },
    {
      label: 'Давление',
      stat: data.value.current?.pressure_mb ?? 0,
    },
  ]
})

const forecast = computed(() => {
  if (!data.value?.forecast?.forecastday) {
    return []
  }
  if (data.value.forecast.forecastday.length === 0) {
    return []
  }
  return data.value.forecast.forecastday
})

let errorTimer = null

watch(errorStatus, (newVal) => {
  if (errorTimer) {
    clearTimeout(errorTimer)
    errorTimer = null
  }

  if (newVal) {
    errorTimer = setTimeout(() => {
      errorStatus.value = false
      errorTimer = null
    }, 5000)
  }
})
</script>

<template>
  <div class="app">
    <div class="main-content">
      <ErrorDisplay :show="errorStatus" :code="errorCode" :message="errorMessage"  @closeError="closeError" />
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
            :key="item?.date"
            :date="item?.date"
            :maxtemp_c="item?.day?.maxtemp_c"
            :text="item?.day?.condition?.text"
          />
          <div v-if="loading" class="loading-overlay">
            <LoadingSpinner size="medium" :message="loadingMessage" />
          </div>
        </div>
      </div>
      <CityInput @inputCity="getWeather"></CityInput>
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
  position: relative;
  min-height: 120px;
}

.loading-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;
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
