import axios from 'axios'
import { API_ENDPOINT, API_ROUTES } from '@/config/api'

function generateSecureToken() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

export async function fetchSubscribe(params) {
  const requestJson = createSubscribeRequestJson(params)
  console.log(requestJson)
  try {
    const res = await axios.post(`${API_ENDPOINT}${API_ROUTES.createSubscribe}`, requestJson)
    // Возвращаем токен из запроса, если его нет в ответе
    return {
      ...res.data,
      token: res.data?.token || requestJson.token
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

function createSubscribeRequestJson(params) {
  const token = generateSecureToken()
  return {
    token,
    filters: {
      humidity: params.params.includes('Влажность'),
      wind_speed: params.params.includes('Ветер'),
      pressure: params.params.includes('Давление'),
      temperature: params.params.includes('Температура'),
    },
    city: params.city,
  }
}
