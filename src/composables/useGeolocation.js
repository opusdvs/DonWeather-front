import { ref } from 'vue'
import { fetchCityByPosition } from '@/api/weatherApi'

/**
 * Геолокация браузера и определение города по координатам
 */
export function useGeolocation() {
  const position = ref(null)
  const cityByPosition = ref(null)

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
            const cityData = await fetchCityByPosition(
              pos.coords.latitude,
              pos.coords.longitude
            )
            cityByPosition.value = cityData.name
            resolve(cityData.name)
          } catch (error) {
            reject(error)
          }
        },
        (error) => reject(error)
      )
    })
  }

  return {
    position,
    cityByPosition,
    getPosition,
  }
}
