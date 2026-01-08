<script setup>
const props = defineProps({ name: String })
</script>
<template>
  <div class="city-name">{{ props.name }}</div>
</template>
<style scoped>
.city-name {
  font-size: 28px;
  font-weight: 700;
  color: #1e3a8a; /* насыщенный синий цвет */
  text-align: center;
  margin: 20px 0;
  letter-spacing: 1px;
}
</style>
