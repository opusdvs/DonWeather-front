import { ref, computed } from 'vue'
import { fetchWeather } from '@/api/weatherApi'

/**
 * Загрузка погоды, состояние и производные данные (temp, weather, forecast)
 */
export function useWeather({ showError }) {
  const data = ref(null)
  const city = ref(localStorage.getItem('city') || null)
  const displayCityName = ref(null)
  const loading = ref(false)
  const loadingMessage = ref('Загрузка данных...')
  let controller = null

  const temp = computed(() => {
    if (!data.value?.weather?.current) return {}
    return {
      temp: data.value.weather.current?.temp_c ?? null,
      desc: data.value.weather.current?.condition?.text ?? 'Нет данных',
    }
  })

  const weather = computed(() => {
    if (!data.value?.weather?.current) return []
    return [
      { label: 'Влажность', stat: data.value.weather.current?.humidity ?? 0 },
      { label: 'Ветер', stat: data.value.weather.current?.wind_kph ?? 0 },
      { label: 'Давление', stat: data.value.weather.current?.pressure_mb ?? 0 },
    ]
  })

  const forecast = computed(() => {
    if (!data.value?.weather?.forecast?.forecastday) return []
    return data.value.weather.forecast.forecastday
  })

  function setDisplayCityName(name = 'Москва') {
    displayCityName.value = name
  }

  async function getWeather(value) {
    city.value = value

    if (!city.value) {
      showError('Информация', 'Введите город')
      return
    }

    // Отменяем предыдущий запрос, если он существует
    if (controller) {
      controller.abort()
    }

    // Создаем новый контроллер для текущего запроса
    controller = new AbortController()

    loading.value = true
    try {
      const result = await fetchWeather(city.value, '3', controller.signal)

      // Проверяем, не был ли запрос отменен
      if (!result) {
        return null
      }

      data.value = result
      if (result?.weather?.location?.name) {
        localStorage.setItem('city', result.weather.location.name)
        setDisplayCityName(result.weather.location.name)
      }
      return result
    } catch (err) {
      // Игнорируем ошибку отмены запроса
      if (err.name === 'CanceledError' || err.name === 'AbortError') {
        return null
      }

      if (err.response?.status === 404) {
        showError('Не найдено', 'Город не найден. Проверьте название и попробуйте снова.')
      } else {
        showError('Ошибка', 'Неверное название города')
      }
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    city,
    displayCityName,
    loading,
    loadingMessage,
    temp,
    weather,
    forecast,
    getWeather,
    setDisplayCityName,
  }
}
