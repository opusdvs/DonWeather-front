<script setup>
const contacts = [
  {
    label: 'Email',
    value: 'ktp211zdv@yandex.ru',
    href: 'mailto:developer@example.com'
  },
  {
    label: 'Telegram',
    value: '@opus_dv',
    href: 'https://t.me/opus_dv'
  },
  {
    label: 'Max',
    value: 'Donatas',
    href: 'https://max.ru/u/f9LHodD0cOKMW0g-thLg-318GyeFf5mZlRxEuIGLDrgMq07x5oEtTBGVMcI'
  }
]
</script>

<template>
  <div class="developer-contacts">
    <h3 class="contacts-title">Контакты разработчика</h3>
    <div class="contacts-list">
      <a
        v-for="contact in contacts"
        :key="contact.label"
        :href="contact.href"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-item"
      >
        <div class="contact-info">
          <span class="contact-label">{{ contact.label }}</span>
          <span class="contact-value">{{ contact.value }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.developer-contacts {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  width: 100%;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.developer-contacts:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  background: var(--color-bg-hover);
}

.contacts-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.contacts-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.contact-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  transition: background 0.3s ease, transform 0.2s ease;
}

.contact-item:hover {
  background: var(--color-bg-hover);
  transform: translateX(4px);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.contact-label {
  font-size: 12px;
  color: var(--color-primary-dark);
  font-weight: 400;
  opacity: 0.7;
}

.contact-value {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 500;
}
</style>
