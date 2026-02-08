<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import axios from 'axios'
//import WeatherStats from './components/WeatherStats.vue'
import CityName from './components/CityName.vue'
//simport WeatherDisplay from './components/WeatherDisplay.vue'
import CityInput from './components/CityInput.vue'
import WeatherTips from './components/WeatherTips.vue'
import WeatherSubscribe from './components/WeatherSubscribe.vue'
import WeatherForecast from './components/WeatherForecast.vue'
import WeatherDayDetail from './components/WeatherDayDetail.vue'
import DeveloperContacts from './components/DeveloperContacts.vue'
import CopyrightFooter from './components/CopyrightFooter.vue'
import ErrorDisplay from './components/ErrorDisplay.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

const API_ROUTES = {
  register: '/api/v1/weather',
  getCityByPosition: '/api/v1/georesolve',
}

const DEFAULT_CITY = "Москва"

// Нужно заменить на API_ENDPOINT из env.js
// временное решение для dev
//const API_ENDPOINT = "https://api.donweather.dev.buildbyte.ru"
const API_ENDPOINT = "http://localhost:8082"
const errorStatus = ref(false)
const position = ref(null)
const city = ref(localStorage.getItem('city') || null)
const displayCityName = ref()
const data = ref()
const errorCode = ref("")
const errorMessage = ref("")
const loading = ref(false)
const loadingMessage = ref("Загрузка данных...")
const formattedDate = ref(new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }))
const selectedDate = ref(null)
const cityByPosition = ref(null)


onMounted(async () => {
  if (city.value) {
    getWeather(city.value)
  } else {
    try {
      const cityByGeo = await getPosition()
      if (cityByGeo) {
        cityByPosition.value = cityByGeo
        getWeather(cityByGeo)
      }
    } catch (error) {
      console.log('Геолокация недоступна:', error)
      getWeather(DEFAULT_CITY)
    }
  }
})

function getPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Геолокация не поддерживается'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        position.value = pos
        try {
          const cityName = await getCityByPosition(pos)
          resolve(cityName.name)
        } catch (error) {
          reject(error)
        }
      },
      (error) => {
        reject(error)
      }
    )
  })
}

async function getCityByPosition(position) {
  try {
    const reqJson = {
      latitude: parseFloat(position?.coords?.latitude),
      longitude: parseFloat(position?.coords?.longitude),
    }
    const res = await axios.post(`${API_ENDPOINT}${API_ROUTES.getCityByPosition}`, reqJson)
    return res.data
  } catch (error) {
    console.log('Ошибка получения города по координатам:', error)
    throw error
  }
}
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
    const res = await axios.post(`${API_ENDPOINT}${API_ROUTES.register}`, reqJson)
    errorStatus.value = false
    data.value = res.data
    if (data.value?.location?.name) {
      localStorage.setItem('city', data.value.location.name)
      setDisplayCityName(data.value.location.name)
    }
    if (data.value?.forecast?.forecastday?.length) {
      selectedDate.value = data.value.forecast.forecastday[0].date
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
function avgPressure(date) {
  return Math.floor(data.value.forecast.forecastday.find(item => item.date === date).hour.reduce((acc, item) => acc + item.pressure_mb, 0) / data.value.forecast.forecastday.find(item => item.date === date).hour.length)
}
function clickForecast(date, maxtemp_c, text) {
  selectedDate.value = date
  data.value.current.temp_c = maxtemp_c
  data.value.current.condition.text = text
  data.value.current.humidity = data.value.forecast.forecastday.find(item => item.date === date).day.avghumidity
  data.value.current.wind_kph = data.value.forecast.forecastday.find(item => item.date === date).day.maxwind_kph
  data.value.current.pressure_mb = avgPressure(date)
  formattedDate.value = new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })

}
</script>

<template>
  <div class="app">
    <ErrorDisplay :show="errorStatus" :code="errorCode" :message="errorMessage" @closeError="closeError" />

    <div class="main-content">
      <CityName :name="displayCityName" />

      <div class="content-card">
        <aside class="content-left">
          <WeatherSubscribe />
        </aside>

        <div class="content-center">
          <WeatherDayDetail
            v-if="forecast.length"
            :weather="weather"
            :temp="temp"
            :formattedDate="formattedDate"
          />

          <div class="forecast-section">
            <h2 class="forecast-title">Прогноз погоды на 3 дня</h2>
            <div class="forecast-container">
              <WeatherForecast
                v-for="item in forecast"
                :key="item?.date"
                :date="item?.date"
                :maxtemp_c="item?.day?.maxtemp_c"
                :text="item?.day?.condition?.text"
                :selected="selectedDate === item?.date"
                @clickForecast="clickForecast"
              />
            </div>
            <div v-if="loading" class="loading-overlay">
              <LoadingSpinner size="medium" :message="loadingMessage" />
            </div>
          </div>

          <CityInput @inputCity="getWeather" />
        </div>

        <aside class="content-right">
          <WeatherTips />
        </aside>
      </div>

    </div>

    <div class="dev-contacts-corner">
      <DeveloperContacts />
    </div>
    <CopyrightFooter />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: var(--spacing-xl);
  box-sizing: border-box;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 960px;
  width: 100%;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-xl);
}

/* --- общий контейнер для погоды + tips --- */
.content-card {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-lg);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.content-left {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 200px;
  flex-shrink: 0;
  border-right: 1px solid rgba(144, 217, 224, 0.12);
  padding-right: var(--spacing-lg);
}

.content-center {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  flex: 1;
  min-width: 0;
}

.content-right {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 200px;
  flex-shrink: 0;
  border-left: 1px solid rgba(144, 217, 224, 0.12);
  padding-left: var(--spacing-lg);
}

/* --- forecast --- */
.forecast-section {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.forecast-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  text-align: center;
  margin: 0;
  letter-spacing: 0.3px;
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid rgba(144, 217, 224, 0.12);
}

.forecast-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
}

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
  background: rgba(39, 46, 55, 0.6);
  border-radius: var(--radius-sm);
}

.dev-contacts-corner {
  position: fixed;
  bottom: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 20;
}

/* --- responsive --- */
@media (max-width: 768px) {
  .app {
    padding: var(--spacing-md);
  }

  .content-card {
    flex-direction: column;
    padding: var(--spacing-lg);
  }

  .content-left {
    width: 100%;
    border-right: none;
    padding-right: 0;
    border-bottom: 1px solid rgba(144, 217, 224, 0.12);
    padding-bottom: var(--spacing-lg);
  }

  .content-right {
    width: 100%;
    border-left: none;
    padding-left: 0;
    border-top: 1px solid rgba(144, 217, 224, 0.12);
    padding-top: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .app {
    padding: var(--spacing-sm);
  }

  .content-card {
    padding: var(--spacing-md);
  }

  .forecast-container {
    grid-template-columns: 1fr;
  }
}
</style>
