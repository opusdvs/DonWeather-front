<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="copyright">
    <p class="copyright-text">
      © {{ currentYear }} DonWeather. Все права защищены.
    </p>
  </div>
</template>

<style scoped>
.copyright {
  padding: var(--spacing-md) 0;
  text-align: center;
  width: 100%;
}

.copyright-text {
  font-size: 13px;
  color: var(--color-primary-dark);
  opacity: 0.6;
  margin: 0;
  font-weight: 400;
}
</style>
