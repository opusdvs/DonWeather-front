import { ref } from 'vue'

/**
 * Выбор дня прогноза, форматирование даты и обновление текущих данных
 */
export function useForecast(data) {
  const selectedDate = ref(null)
  const formattedDate = ref(
    new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  )

  function avgPressure(date) {
    const days = data.value?.weather?.forecast?.forecastday
    if (!days?.length) return 0
    const day = days.find((item) => item.date === date)
    if (!day?.hour?.length) return 0
    const sum = day.hour.reduce((acc, item) => acc + item.pressure_mb, 0)
    return Math.floor(sum / day.hour.length)
  }

  function clickForecast(date, maxtemp_c, text) {
    const days = data.value?.weather?.forecast?.forecastday
    const current = data.value?.weather?.current
    if (!days?.length || !current) return

    const dayData = days.find((item) => item.date === date)
    if (!dayData) return

    selectedDate.value = date
    data.value.weather.current.temp_c = maxtemp_c
    data.value.weather.current.condition.text = text
    data.value.weather.current.humidity = dayData.day.avghumidity
    data.value.weather.current.wind_kph = dayData.day.maxwind_kph
    data.value.weather.current.pressure_mb = avgPressure(date)
    formattedDate.value = new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    })
  }

  function initSelectedDate(forecastDays) {
    if (forecastDays?.length) {
      selectedDate.value = forecastDays[0].date
    }
  }

  return {
    selectedDate,
    formattedDate,
    clickForecast,
    initSelectedDate,
  }
}
