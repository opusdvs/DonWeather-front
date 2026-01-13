import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherDisplay from '@/components/WeatherDisplay.vue'

describe('WeatherDisplay', () => {
  it('renders temperature correctly', () => {
    const wrapper = mount(WeatherDisplay, {
      props: {
        temp: 25,
        desc: 'Ясно'
      }
    })

    expect(wrapper.text()).toContain('25°C')
    expect(wrapper.text()).toContain('Ясно')
  })

  it('renders with null temperature', () => {
    const wrapper = mount(WeatherDisplay, {
      props: {
        temp: null,
        desc: 'Нет данных'
      }
    })

    // null отображается как пустая строка в Vue
    expect(wrapper.text()).toContain('°C')
    expect(wrapper.text()).toContain('Нет данных')
  })

  it('renders with zero temperature', () => {
    const wrapper = mount(WeatherDisplay, {
      props: {
        temp: 0,
        desc: 'Облачно'
      }
    })

    expect(wrapper.text()).toContain('0°C')
    expect(wrapper.text()).toContain('Облачно')
  })

  it('renders with negative temperature', () => {
    const wrapper = mount(WeatherDisplay, {
      props: {
        temp: -10,
        desc: 'Снег'
      }
    })

    expect(wrapper.text()).toContain('-10°C')
    expect(wrapper.text()).toContain('Снег')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(WeatherDisplay, {
      props: {
        temp: 20,
        desc: 'Солнечно'
      }
    })

    expect(wrapper.find('.weather-card').exists()).toBe(true)
    expect(wrapper.find('.temperature').exists()).toBe(true)
    expect(wrapper.find('.description').exists()).toBe(true)
  })
})
