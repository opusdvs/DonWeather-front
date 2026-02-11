<script setup>
import { onMounted, onUnmounted } from 'vue'
import { DEFAULT_CITY, WEATHER_UPDATE_INTERVAL_MS } from '@/config/api'
import { useError } from '@/composables/useError'
import { useGeolocation } from '@/composables/useGeolocation'
import { useWeather } from '@/composables/useWeather'
import { useForecast } from '@/composables/useForecast'

import CityName from './components/CityName.vue'
import CityInput from './components/CityInput.vue'
import WeatherTips from './components/WeatherTips.vue'
import WeatherSubscribe from './components/WeatherSubscribe.vue'
import WeatherForecast from './components/WeatherForecast.vue'
import WeatherDayDetail from './components/WeatherDayDetail.vue'
import DeveloperContacts from './components/DeveloperContacts.vue'
import CopyrightFooter from './components/CopyrightFooter.vue'
import ErrorDisplay from './components/ErrorDisplay.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ButtonGeo from './components/ButtonGeo.vue'

const { errorStatus, errorCode, errorMessage, showError, closeError } = useError()
const { getPosition, setCurrentCity, getCurrentCity } = useGeolocation()
const { data, displayCityName, loading, loadingMessage, temp, weather, forecast, getWeather } =
  useWeather({ showError })
const { selectedDate, formattedDate, clickForecast, initSelectedDate } = useForecast(data)

let intervalId = null

onMounted(async () => {
  const savedCity = localStorage.getItem('city')

  let result
  if (savedCity) {
    result = await getWeather(savedCity)
  } else {
    try {
      const cityByGeo = await getPosition()
      if (cityByGeo) {
        result = await getWeather(cityByGeo)
      }
    } catch (error) {
      console.log('Геолокация недоступна:', error)
      result = await getWeather(DEFAULT_CITY)
    }
  }

  if (result?.forecast?.forecastday) {
    initSelectedDate(result.forecast.forecastday)
  }

  if (result?.location?.name) {
    setCurrentCity(result.location.name)
  }

  // Создаем интервал для обновления погоды
  intervalId = setInterval(() => {
    const currentCity = getCurrentCity()
    if (currentCity) {
      getWeather(currentCity)
    }
  }, WEATHER_UPDATE_INTERVAL_MS)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

async function handleClickGeo() {
  try {
    const cityByGeo = await getPosition()
    if (cityByGeo) {
      const result = await getWeather(cityByGeo)
      if (result?.forecast?.forecastday) {
        initSelectedDate(result.forecast.forecastday)
      }
      if (result?.location?.name) {
        setCurrentCity(result.location.name)
      }
    }
  } catch (error) {
    console.log('Ошибка определения города по геолокации:', error)
  }
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
            <ButtonGeo @click="handleClickGeo" />
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
