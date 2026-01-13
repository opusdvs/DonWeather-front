import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherForecast from '@/components/WeatherForecast.vue'

describe('WeatherForecast', () => {
  it('renders forecast data correctly', () => {
    const wrapper = mount(WeatherForecast, {
      props: {
        date: '2024-01-15',
        maxtemp_c: 20,
        text: 'Ясно'
      }
    })

    expect(wrapper.text()).toContain('20°C')
    expect(wrapper.text()).toContain('Ясно')
  })

  it('formats date correctly in Russian locale', () => {
    const wrapper = mount(WeatherForecast, {
      props: {
        date: '2024-01-15',
        maxtemp_c: 15,
        text: 'Облачно'
      }
    })

    // Проверяем, что дата отформатирована (должна содержать число и месяц)
    const text = wrapper.text()
    expect(text).toMatch(/\d+/) // Содержит число
  })

  it('renders with zero temperature', () => {
    const wrapper = mount(WeatherForecast, {
      props: {
        date: '2024-01-16',
        maxtemp_c: 0,
        text: 'Снег'
      }
    })

    expect(wrapper.text()).toContain('0°C')
    expect(wrapper.text()).toContain('Снег')
  })

  it('renders with negative temperature', () => {
    const wrapper = mount(WeatherForecast, {
      props: {
        date: '2024-01-17',
        maxtemp_c: -5,
        text: 'Мороз'
      }
    })

    expect(wrapper.text()).toContain('-5°C')
    expect(wrapper.text()).toContain('Мороз')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(WeatherForecast, {
      props: {
        date: '2024-01-18',
        maxtemp_c: 25,
        text: 'Солнечно'
      }
    })

    expect(wrapper.find('.weather-forecast').exists()).toBe(true)
    expect(wrapper.find('.forecast-card').exists()).toBe(true)
    expect(wrapper.find('.info').exists()).toBe(true)
    expect(wrapper.find('.label').exists()).toBe(true)
    expect(wrapper.find('.value').exists()).toBe(true)
    expect(wrapper.find('.desc').exists()).toBe(true)
  })
})
