<template>
  <div class="search-box">
    <input v-model="city" @keyup.enter="$emit('search', city)" placeholder="Cari kota..." />
    <button @click="$emit('search', city)">Cari</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const city = ref('Bogor');
defineEmits(['search']);
</script>

<style scoped>
.search-box { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
input { padding: 12px 15px; border-radius: 12px; border: 1px solid rgba(0, 0, 0, 0.1); background: rgba(255, 255, 255, 0.5); color: #333; width: 70%; }
button { padding: 10px 20px; border-radius: 12px; border: none; background-color: #0d1b2a; color: white; font-weight: bold; cursor: pointer; }
</style>