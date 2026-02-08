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
    <span class="contacts-label">Dev:</span>
    <a
      v-for="contact in contacts"
      :key="contact.label"
      :href="contact.href"
      target="_blank"
      rel="noopener noreferrer"
      class="contact-link"
      :title="contact.value"
    >{{ contact.label }}</a>
  </div>
</template>

<style scoped>
.developer-contacts {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--color-bg-card);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  box-shadow: var(--shadow-sm);
}

.contacts-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary-dark);
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: 2px;
}

.contact-link {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-primary-dark);
  text-decoration: none;
  padding: 2px 8px;
  border-radius: 4px;
  transition: color 0.2s ease, background 0.2s ease;
  white-space: nowrap;
}

.contact-link:hover {
  color: var(--color-accent);
  background: rgba(144, 217, 224, 0.08);
}
</style>
