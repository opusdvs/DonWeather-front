import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'

// Очистка после каждого теста
afterEach(() => {
  cleanup()
})
