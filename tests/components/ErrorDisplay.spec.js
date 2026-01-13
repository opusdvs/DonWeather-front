import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorDisplay from '@/components/ErrorDisplay.vue'

describe('ErrorDisplay', () => {
  it('renders when show is true', () => {
    const wrapper = mount(ErrorDisplay, {
      props: {
        show: true,
        code: 'Ошибка',
        message: 'Произошла ошибка'
      }
    })

    expect(wrapper.find('.error-toast').exists()).toBe(true)
    expect(wrapper.text()).toContain('Ошибка')
    expect(wrapper.text()).toContain('Произошла ошибка')
  })

  it('does not render when show is false', () => {
    const wrapper = mount(ErrorDisplay, {
      props: {
        show: false,
        code: 'Ошибка',
        message: 'Произошла ошибка'
      }
    })

    expect(wrapper.find('.error-toast').exists()).toBe(false)
  })

  it('uses default props when not provided', () => {
    const wrapper = mount(ErrorDisplay, {
      props: {
        show: true
      }
    })

    expect(wrapper.text()).toContain('Ошибка')
    expect(wrapper.text()).toContain('Попробуйте снова.')
  })

  it('emits closeError event when button is clicked', async () => {
    const wrapper = mount(ErrorDisplay, {
      props: {
        show: true,
        code: 'Ошибка',
        message: 'Тестовая ошибка'
      }
    })

    await wrapper.find('.error-btn').trigger('click')

    expect(wrapper.emitted('closeError')).toBeTruthy()
    expect(wrapper.emitted('closeError')[0]).toEqual([false])
  })

  it('renders custom error code and message', () => {
    const wrapper = mount(ErrorDisplay, {
      props: {
        show: true,
        code: 'Информация',
        message: 'Город не найден'
      }
    })

    expect(wrapper.text()).toContain('Информация')
    expect(wrapper.text()).toContain('Город не найден')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(ErrorDisplay, {
      props: {
        show: true,
        code: 'Ошибка',
        message: 'Тест'
      }
    })

    expect(wrapper.find('.error-toast').exists()).toBe(true)
    expect(wrapper.find('.error-card').exists()).toBe(true)
    expect(wrapper.find('.error-code').exists()).toBe(true)
    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('.error-btn').exists()).toBe(true)
  })
})
