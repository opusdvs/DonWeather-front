import { ref } from 'vue'
import { fetchSubscribe } from '@/api/subscribeApi'

export function useSubscribe() {
 const selectedParams = ref([])

  async function handleSelectedParams(params) {
    selectedParams.value = params
    try {
      const res = await fetchSubscribe(selectedParams.value)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    selectedParams,
    handleSelectedParams,
  }
}
