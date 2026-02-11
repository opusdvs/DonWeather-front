export const API_ROUTES = {
  register: '/api/v1/weather',
  getCityByPosition: '/api/v1/georesolve',
}

export const DEFAULT_CITY = 'Москва'

export const API_ENDPOINT = 'https://api.donweather.dev.buildbyte.ru'
//export const API_ENDPOINT = 'http://185.196.117.162:8082'

// Интервал автоматического обновления погоды (в миллисекундах)
export const WEATHER_UPDATE_INTERVAL_MS = 5 * 60 * 1000 // 5 минут
