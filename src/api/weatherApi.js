import axios from 'axios'
import { API_ENDPOINT, API_ROUTES } from '@/config/api'

/**
 * Запрос погоды по названию города
 */
export async function fetchWeather(city, days = '3') {
  const reqJson = {
    q: city,
    lang: 'ru',
    days,
  }
  const res = await axios.post(`${API_ENDPOINT}${API_ROUTES.register}`, reqJson)
  return res.data
}

/**
 * Определение города по координатам
 */
export async function fetchCityByPosition(latitude, longitude) {
  const reqJson = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  }
  const res = await axios.post(`${API_ENDPOINT}${API_ROUTES.getCityByPosition}`, reqJson)
  return res.data
}
