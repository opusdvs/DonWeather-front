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
    const days = data.value?.forecast?.forecastday
    if (!days?.length) return 0
    const day = days.find((item) => item.date === date)
    if (!day?.hour?.length) return 0
    const sum = day.hour.reduce((acc, item) => acc + item.pressure_mb, 0)
    return Math.floor(sum / day.hour.length)
  }

  function clickForecast(date, maxtemp_c, text) {
    const days = data.value?.forecast?.forecastday
    const current = data.value?.current
    if (!days?.length || !current) return

    const dayData = days.find((item) => item.date === date)
    if (!dayData) return

    selectedDate.value = date
    current.temp_c = maxtemp_c
    current.condition.text = text
    current.humidity = dayData.day.avghumidity
    current.wind_kph = dayData.day.maxwind_kph
    current.pressure_mb = avgPressure(date)
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
