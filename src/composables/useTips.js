import { ref, watch} from 'vue'
/**
 * Советы по погоде
 */
export function useTips(data) {
  const tips = ref([])
  function setTips(newData) {
    if (newData?.tips) {
      console.log(newData?.tips.tips)
      tips.value = newData?.tips.tips
    }
    else {
      tips.value = []
    }
  }
  watch(data, setTips, { immediate: true })
  return {
    tips,
    setTips,
  }
}




