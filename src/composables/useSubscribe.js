import { ref } from 'vue'
import { fetchSubscribe } from '@/api/subscribeApi'

export function useSubscribe() {
  const selectedParams = ref([])
  const token = ref(null)

  async function handleSelectedParams(params) {
    selectedParams.value = params
    try {
      const res = await fetchSubscribe(selectedParams.value)
      console.log(res.token)
      // Сохраняем токен из ответа API, если он есть
      if (res?.token) {
        token.value = res.token
      }
      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    selectedParams,
    token,
    handleSelectedParams,
  }
}
