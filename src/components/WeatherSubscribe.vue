<script setup>
import { ref } from 'vue'

const { city } = defineProps({
  city: {
    type: String,
    default: null,
  },
})

const params = [
  {
    name: 'Температура',
    desc: 'Резкие перепады',
  },
  {
    name: 'Влажность',
    desc: 'Высокая влажность',
  },
  {
    name: 'Ветер',
    desc: 'Порывы от 15 м/с',
  },
  {
    name: 'Давление',
    desc: 'Скачки давления',
  },
]

const selectedParams = ref([])
const emit = defineEmits(['selectedParams'])

function handleSelectedParams() {
  emit('selectedParams', {params: selectedParams.value, city: city})
}
</script>

<template>
  <div class="subscribe">
    <h3 class="subscribe__title">Подписка на погоду</h3>
    <p v-if="city" class="subscribe__hint">
      Подписка будет настроена для города: <strong>{{ city }}</strong>
    </p>

    <!-- параметры погоды -->
    <ul class="subscribe__params">
      <li v-for="param in params" :key="param.name" class="subscribe__param">
        <label class="subscribe__label">
          <input type="checkbox" class="subscribe__checkbox" v-model="selectedParams" :value="param.name"/>
          <span class="subscribe__param-info">
            <span class="subscribe__param-name">{{ param.name }}</span>
            <span class="subscribe__param-desc">{{ param.desc }}</span>
          </span>
        </label>
      </li>
    </ul>

    <button type="button" class="subscribe__btn" @click="handleSelectedParams">Подписаться</button>
  </div>
</template>

<style scoped>
.subscribe {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  flex: 1;
}

.subscribe__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
}

.subscribe__hint {
  font-size: 12px;
  color: var(--color-primary-dark);
  margin: 0;
  line-height: 1.4;
}

.subscribe__hint strong {
  color: var(--color-accent);
  font-weight: 500;
}

/* --- channel label --- */
.subscribe__channel-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.3px;
}

/* --- input --- */
.subscribe__input {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 13px;
  font-family: var(--font);
  background: rgba(0, 0, 0, 0.15);
  border: 1.5px solid transparent;
  border-radius: var(--radius-sm);
  outline: none;
  color: var(--color-primary);
  width: 100%;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.subscribe__input::placeholder {
  color: var(--color-primary-dark);
  opacity: 0.6;
}

.subscribe__input:focus {
  border-color: var(--color-accent);
  background: rgba(0, 0, 0, 0.22);
}

/* --- section label --- */
.subscribe__section-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-primary-dark);
  margin: 0;
}

/* --- param list --- */
.subscribe__params {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.subscribe__param {
  margin: 0;
}

.subscribe__label {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
  cursor: pointer;
  padding: 4px var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: background 0.15s ease;
}

.subscribe__label:hover {
  background: rgba(0, 0, 0, 0.1);
}

.subscribe__checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--color-primary-dark);
  border-radius: 4px;
  background: transparent;
  flex-shrink: 0;
  margin-top: 1px;
  cursor: pointer;
  position: relative;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.subscribe__checkbox:checked {
  border-color: var(--color-accent);
  background: var(--color-accent);
}

.subscribe__checkbox:checked::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 9px;
  border: solid var(--color-bg);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.subscribe__param-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.subscribe__param-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-primary);
  line-height: 1.3;
}

.subscribe__param-desc {
  font-size: 11px;
  color: var(--color-primary-dark);
  line-height: 1.3;
}

/* --- button --- */
.subscribe__btn {
  margin-top: auto;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 16px;
  font-family: var(--font);
  font-weight: 500;
  background: var(--gradient);
  color: var(--color-bg);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.subscribe__btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  opacity: 0.95;
}

.subscribe__btn:active {
  transform: translateY(0);
}
</style>
