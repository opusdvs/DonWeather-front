import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import axios from 'axios'
import App from '@/App.vue'

// Мокаем axios
vi.mock('axios')

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renders main components', () => {
    // Мокаем axios для предотвращения ошибок при монтировании
    axios.post.mockResolvedValue({
      data: {
        location: { name: 'Москва' },
        current: { temp_c: 20, condition: { text: 'Ясно' } },
        forecast: { forecastday: [] },
      },
    })

    const wrapper = mount(App, {
      global: {
        stubs: {
          WeatherStats: true,
          CityName: true,
          WeatherDisplay: true,
          CityInput: true,
          WeatherTips: true,
          WeatherForecast: true,
          DeveloperContacts: true,
          CopyrightFooter: true,
          ErrorDisplay: true,
          LoadingSpinner: true,
        },
      },
    })

    expect(wrapper.find('.app').exists()).toBe(true)
  })

  it('loads weather data on mount', async () => {
    const mockData = {
      data: {
        location: { name: 'Москва' },
        current: {
          temp_c: 20,
          condition: { text: 'Ясно' },
          humidity: 65,
          wind_kph: 10,
          pressure_mb: 1013,
        },
        forecast: {
          forecastday: [
            {
              date: '2024-01-15',
              day: {
                maxtemp_c: 22,
                condition: { text: 'Солнечно' },
              },
            },
          ],
        },
      },
    }

    axios.post.mockResolvedValue(mockData)

    mount(App, {
      global: {
        stubs: {
          WeatherStats: true,
          CityName: true,
          WeatherDisplay: true,
          CityInput: true,
          WeatherTips: true,
          WeatherForecast: true,
          DeveloperContacts: true,
          CopyrightFooter: true,
          ErrorDisplay: true,
          LoadingSpinner: true,
        },
      },
    })

    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(axios.post).toHaveBeenCalled()
  })

  it('handles API error correctly', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'))

    const wrapper = mount(App, {
      global: {
        stubs: {
          WeatherStats: true,
          CityName: true,
          WeatherDisplay: true,
          CityInput: true,
          WeatherTips: true,
          WeatherForecast: true,
          DeveloperContacts: true,
          CopyrightFooter: true,
          ErrorDisplay: true,
          LoadingSpinner: true,
        },
      },
    })

    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Проверяем, что ошибка обработана
    expect(wrapper.vm.errorStatus).toBe(true)
  })

  it('validates empty city input', async () => {
    // Мокаем axios для начального запроса при монтировании
    axios.post.mockResolvedValue({
      data: {
        location: { name: 'Москва' },
        current: { temp_c: 20, condition: { text: 'Ясно' } },
        forecast: { forecastday: [] },
      },
    })

    const wrapper = mount(App, {
      global: {
        stubs: {
          WeatherStats: true,
          CityName: true,
          WeatherDisplay: true,
          CityInput: true,
          WeatherTips: true,
          WeatherForecast: true,
          DeveloperContacts: true,
          CopyrightFooter: true,
          ErrorDisplay: true,
          LoadingSpinner: true,
        },
      },
    })

    // Ждем завершения начального запроса
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Теперь тестируем валидацию пустого города
    await wrapper.vm.getWeather('')
    await nextTick()

    expect(wrapper.vm.errorStatus).toBe(true)
    expect(wrapper.vm.errorMessage).toBe('Введите город')
    expect(wrapper.vm.errorCode).toBe('Информация')
  })
})
