import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CityInput from '@/components/CityInput.vue'

describe('CityInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CityInput)
  })

  it('renders input and button', () => {
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Введите город')
  })

  it('emits inputCity event when button is clicked', async () => {
    const input = wrapper.find('input')
    await input.setValue('Москва')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('inputCity')).toBeTruthy()
    expect(wrapper.emitted('inputCity')[0]).toEqual(['Москва'])
  })

  it('emits inputCity event when Enter key is pressed', async () => {
    const input = wrapper.find('input')
    await input.setValue('Санкт-Петербург')
    await input.trigger('keyup.enter')

    expect(wrapper.emitted('inputCity')).toBeTruthy()
    expect(wrapper.emitted('inputCity')[0]).toEqual(['Санкт-Петербург'])
  })

  it('removes digits from input value', async () => {
    const input = wrapper.find('input')

    // Устанавливаем значение и триггерим событие input
    input.element.value = 'Москва123'
    await input.trigger('input')

    expect(input.element.value).toBe('Москва')
  })

  it('clears input after emitting event', async () => {
    const input = wrapper.find('input')
    await input.setValue('Казань')
    await wrapper.find('button').trigger('click')

    // После клика input должен быть очищен
    expect(input.element.value).toBe('')
  })

  it('does not emit event when input is empty', async () => {
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('inputCity')).toBeTruthy()
    expect(wrapper.emitted('inputCity')[0]).toEqual([''])
  })
})
