import { ref, watch } from 'vue'

/**
 * Состояние ошибок и автоскрытие через заданное время
 */
export function useError(autoHideMs = 5000) {
  const errorStatus = ref(false)
  const errorCode = ref('')
  const errorMessage = ref('')

  let errorTimer = null

  watch(errorStatus, (newVal) => {
    if (errorTimer) {
      clearTimeout(errorTimer)
      errorTimer = null
    }
    if (newVal) {
      errorTimer = setTimeout(() => {
        errorStatus.value = false
        errorTimer = null
      }, autoHideMs)
    }
  })

  function showError(code, message) {
    errorStatus.value = true
    errorCode.value = code
    errorMessage.value = message
  }

  function closeError(value) {
    errorStatus.value = value
  }

  return {
    errorStatus,
    errorCode,
    errorMessage,
    showError,
    closeError,
  }
}
