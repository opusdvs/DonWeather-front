import { ref } from 'vue'
import { fetchCityByPosition } from '@/api/weatherApi'

/**
 * Геолокация браузера и определение города по координатам
 */
export function useGeolocation() {
  const position = ref(null)
  const cityByPosition = ref(null)
  const currentCity = ref(null)
  let controller = null

  function getPosition() {
    return new Promise((resolve, reject) => {
      // Отменяем предыдущий HTTP запрос, если он существует
      if (controller) {
        controller.abort()
      }
      controller = new AbortController()

      if (!navigator.geolocation) {
        reject(new Error('Геолокация не поддерживается'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          position.value = pos
          try {
            const cityData = await fetchCityByPosition(
              pos.coords.latitude,
              pos.coords.longitude,
              controller.signal
            )

            // Проверяем, не был ли запрос отменен
            if (!cityData) {
              resolve(null)
              return
            }

            const cityName = cityData?.name || cityData
            cityByPosition.value = cityName
            resolve(cityName)
          } catch (error) {
            // Игнорируем ошибку отмены запроса
            if (error.name === 'CanceledError' || error.name === 'AbortError') {
              resolve(null)
              return
            }
            reject(error)
          }
        },
        (error) => reject(error)
      )
    })
  }

  function setCurrentCity(city) {
    currentCity.value = city
  }

  function getCurrentCity() {
    return currentCity.value
  }

  return {
    position,
    cityByPosition,
    getPosition,
    setCurrentCity,
    getCurrentCity,
  }
}
