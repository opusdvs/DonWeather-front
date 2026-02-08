import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import axios from 'axios'
import App from '@/App.vue'
import ErrorDisplay from '@/components/ErrorDisplay.vue'
import CityInput from '@/components/CityInput.vue'

vi.mock('axios')

const defaultStubs = {
  CityName: true,
  WeatherTips: true,
  WeatherSubscribe: true,
  WeatherForecast: true,
  WeatherDayDetail: true,
  DeveloperContacts: true,
  CopyrightFooter: true,
  LoadingSpinner: true,
}

const mockWeatherResponse = {
  data: {
    location: { name: 'Москва' },
    current: { temp_c: 20, condition: { text: 'Ясно' }, humidity: 65, wind_kph: 10, pressure_mb: 1013 },
    forecast: { forecastday: [] },
  },
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    // Сохранённый город — при монтировании вызывается getWeather, а не геолокация
    localStorage.setItem('city', 'Москва')
  })

  it('renders main components', () => {
    axios.post.mockResolvedValue(mockWeatherResponse)

    const wrapper = mount(App, {
      global: {
        stubs: { ...defaultStubs, ErrorDisplay: true },
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
            { date: '2024-01-15', day: { maxtemp_c: 22, condition: { text: 'Солнечно' } } },
          ],
        },
      },
    }
    axios.post.mockResolvedValue(mockData)

    mount(App, {
      global: {
        stubs: { ...defaultStubs, ErrorDisplay: true },
      },
    })

    await nextTick()
    await new Promise((r) => setTimeout(r, 100))

    expect(axios.post).toHaveBeenCalled()
  })

  it('handles API error correctly', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'))

    const wrapper = mount(App, {
      global: {
        stubs: { ...defaultStubs },
      },
    })

    await nextTick()
    await new Promise((r) => setTimeout(r, 150))

    const errorDisplay = wrapper.findComponent(ErrorDisplay)
    expect(errorDisplay.exists()).toBe(true)
    expect(errorDisplay.props('show')).toBe(true)
  })

  it('validates empty city input', async () => {
    axios.post.mockResolvedValue(mockWeatherResponse)

    const wrapper = mount(App, {
      global: {
        stubs: { ...defaultStubs },
      },
    })

    await nextTick()
    await new Promise((r) => setTimeout(r, 100))

    const cityInput = wrapper.findComponent(CityInput)
    await cityInput.find('input').setValue('')
    await cityInput.find('button').trigger('click')
    await nextTick()

    const errorDisplay = wrapper.findComponent(ErrorDisplay)
    expect(errorDisplay.props('show')).toBe(true)
    expect(errorDisplay.props('message')).toBe('Введите город')
    expect(errorDisplay.props('code')).toBe('Информация')
  })
})
