import axios from 'axios'
import { API_ENDPOINT, API_ROUTES } from '@/config/api'

/**
 * Запрос погоды по названию города
 */
export async function fetchWeather(city, days = '3', signal) {
  const reqJson = {
    q: city,
    lang: 'ru',
    days,
  }
  try {
    const res = await axios.post(`${API_ENDPOINT}${API_ROUTES.register}`, reqJson, { signal })
    return res.data
  } catch (error) {
    if (error.name === 'CanceledError') {
      return null
    }
    throw error
  }
}

/**
 * Определение города по координатам
 */
export async function fetchCityByPosition(latitude, longitude, signal) {
  const reqJson = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  }
  try {
    const res = await axios.post(`${API_ENDPOINT}${API_ROUTES.getCityByPosition}`, reqJson, { signal })
    return res.data
  } catch (error) {
    if (error.name === 'CanceledError') {
      return null
    }
    throw error
  }
}
