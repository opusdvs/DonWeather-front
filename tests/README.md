# Unit тесты для DonWeather Frontend

## 📋 Обзор

Проект использует [Vitest](https://vitest.dev/) и [Vue Test Utils](https://test-utils.vuejs.org/) для unit-тестирования компонентов.

## 🚀 Запуск тестов

### Запуск всех тестов
```bash
npm test
```

### Запуск тестов один раз (без watch режима)
```bash
npm run test:run
```

### Запуск тестов с UI интерфейсом
```bash
npm run test:ui
```

### Запуск тестов с покрытием кода
```bash
npm run test:coverage
```

## 📁 Структура тестов

```
tests/
├── setup.js                    # Настройка тестового окружения
└── components/
    ├── App.spec.js            # Тесты для главного компонента
    ├── CityInput.spec.js      # Тесты для компонента ввода города
    ├── CityName.spec.js       # Тесты для компонента названия города
    ├── ErrorDisplay.spec.js   # Тесты для компонента отображения ошибок
    ├── LoadingSpinner.spec.js # Тесты для компонента загрузки
    ├── WeatherDisplay.spec.js # Тесты для компонента отображения погоды
    ├── WeatherForecast.spec.js # Тесты для компонента прогноза
    └── WeatherStats.spec.js   # Тесты для компонента статистики
```

## ✅ Покрытие тестами

### Компоненты с тестами:

1. **WeatherDisplay** (5 тестов)
   - Рендеринг температуры
   - Обработка null значений
   - Отрицательные температуры
   - CSS классы

2. **WeatherStats** (5 тестов)
   - Рендеринг метрик
   - Нулевые значения
   - Отрицательные значения
   - Большие числа

3. **WeatherForecast** (5 тестов)
   - Рендеринг прогноза
   - Форматирование даты
   - Различные температуры
   - CSS классы

4. **CityInput** (6 тестов)
   - Рендеринг элементов
   - Эмиссия событий
   - Валидация ввода (удаление цифр)
   - Очистка после отправки

5. **CityName** (4 теста)
   - Рендеринг названия города
   - Пустые значения
   - Длинные названия

6. **ErrorDisplay** (6 тестов)
   - Условный рендеринг
   - Значения по умолчанию
   - Эмиссия событий
   - Кастомные сообщения

7. **LoadingSpinner** (7 тестов)
   - Размеры спиннера
   - Отображение сообщения
   - Количество колец

8. **App** (4 теста)
   - Рендеринг компонентов
   - Загрузка данных
   - Обработка ошибок API
   - Валидация пустого ввода

**Всего: 42 теста** ✅

## 🛠️ Технологии

- **Vitest** - быстрый тестовый раннер, совместимый с Vite
- **@vue/test-utils** - официальная утилита для тестирования Vue компонентов
- **happy-dom** - легковесная DOM реализация для тестов
- **@testing-library/vue** - утилиты для тестирования Vue компонентов

## 📝 Написание новых тестов

### Пример теста компонента:

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        prop1: 'value1'
      }
    })

    expect(wrapper.text()).toContain('expected text')
  })
})
```

### Тестирование событий:

```javascript
it('emits event on click', async () => {
  const wrapper = mount(MyComponent)
  await wrapper.find('button').trigger('click')
  
  expect(wrapper.emitted('myEvent')).toBeTruthy()
  expect(wrapper.emitted('myEvent')[0]).toEqual(['value'])
})
```

### Мокирование зависимостей:

```javascript
import { vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

it('calls API', async () => {
  axios.get.mockResolvedValue({ data: { result: 'test' } })
  // ... тест
})
```

## 🔧 Конфигурация

Конфигурация тестов находится в `vitest.config.js`:

- **environment**: `happy-dom` - легковесная DOM реализация
- **globals**: `true` - глобальные функции (describe, it, expect)
- **setupFiles**: `./tests/setup.js` - файл настройки

## 📊 Результаты

Все тесты должны проходить успешно перед коммитом. При запуске `npm run test:run` вы должны увидеть:

```
✓ Test Files  8 passed (8)
✓ Tests  42 passed (42)
```

## 🐛 Отладка тестов

Если тест не проходит:

1. Проверьте сообщение об ошибке в консоли
2. Используйте `console.log()` для отладки
3. Запустите тесты в watch режиме: `npm test`
4. Используйте UI для визуальной отладки: `npm run test:ui`

## 📚 Дополнительные ресурсы

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils Guide](https://test-utils.vuejs.org/guide/)
- [Testing Vue Components](https://vuejs.org/guide/scaling-up/testing.html)
