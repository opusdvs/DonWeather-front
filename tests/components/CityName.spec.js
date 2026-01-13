import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CityName from '@/components/CityName.vue'

describe('CityName', () => {
  it('renders city name correctly', () => {
    const wrapper = mount(CityName, {
      props: {
        name: 'Москва'
      }
    })

    expect(wrapper.text()).toBe('Москва')
  })

  it('renders empty string when name is not provided', () => {
    const wrapper = mount(CityName, {
      props: {
        name: ''
      }
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders with long city name', () => {
    const wrapper = mount(CityName, {
      props: {
        name: 'Санкт-Петербург'
      }
    })

    expect(wrapper.text()).toBe('Санкт-Петербург')
  })

  it('has correct CSS class', () => {
    const wrapper = mount(CityName, {
      props: {
        name: 'Казань'
      }
    })

    expect(wrapper.find('.city-name').exists()).toBe(true)
  })
})
