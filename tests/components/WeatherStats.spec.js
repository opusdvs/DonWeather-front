import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherStats from '@/components/WeatherStats.vue'

describe('WeatherStats', () => {
  it('renders label and stat correctly', () => {
    const wrapper = mount(WeatherStats, {
      props: {
        label: 'Влажность',
        stat: 65
      }
    })

    expect(wrapper.text()).toContain('Влажность')
    expect(wrapper.text()).toContain('65')
  })

  it('renders with zero value', () => {
    const wrapper = mount(WeatherStats, {
      props: {
        label: 'Скорость ветра',
        stat: 0
      }
    })

    expect(wrapper.text()).toContain('Скорость ветра')
    expect(wrapper.text()).toContain('0')
  })

  it('renders with negative value', () => {
    const wrapper = mount(WeatherStats, {
      props: {
        label: 'Температура',
        stat: -5
      }
    })

    expect(wrapper.text()).toContain('Температура')
    expect(wrapper.text()).toContain('-5')
  })

  it('renders with large number', () => {
    const wrapper = mount(WeatherStats, {
      props: {
        label: 'Давление',
        stat: 1013
      }
    })

    expect(wrapper.text()).toContain('Давление')
    expect(wrapper.text()).toContain('1013')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(WeatherStats, {
      props: {
        label: 'Влажность',
        stat: 50
      }
    })

    expect(wrapper.find('.weather-stats').exists()).toBe(true)
    expect(wrapper.find('.stat-card').exists()).toBe(true)
    expect(wrapper.find('.info').exists()).toBe(true)
    expect(wrapper.find('.label').exists()).toBe(true)
    expect(wrapper.find('.value').exists()).toBe(true)
  })
})
