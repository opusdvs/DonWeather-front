import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders spinner with default size', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.find('.loading-container').exists()).toBe(true)
    expect(wrapper.find('.spinner').exists()).toBe(true)
    expect(wrapper.find('.spinner-medium').exists()).toBe(true)
  })

  it('renders spinner with small size', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        size: 'small'
      }
    })

    expect(wrapper.find('.spinner-small').exists()).toBe(true)
  })

  it('renders spinner with large size', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        size: 'large'
      }
    })

    expect(wrapper.find('.spinner-large').exists()).toBe(true)
  })

  it('renders message when provided', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        message: 'Загрузка данных...'
      }
    })

    expect(wrapper.find('.loading-message').exists()).toBe(true)
    expect(wrapper.text()).toContain('Загрузка данных...')
  })

  it('does not render message when not provided', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.find('.loading-message').exists()).toBe(false)
  })

  it('renders all three spinner rings', () => {
    const wrapper = mount(LoadingSpinner)

    const rings = wrapper.findAll('.spinner-ring')
    expect(rings.length).toBe(3)
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        size: 'medium',
        message: 'Тест'
      }
    })

    expect(wrapper.find('.loading-container').exists()).toBe(true)
    expect(wrapper.find('.spinner').exists()).toBe(true)
    expect(wrapper.find('.spinner-medium').exists()).toBe(true)
    expect(wrapper.find('.loading-message').exists()).toBe(true)
  })
})
