<template>
  <div class="forecast-container" v-if="forecast.length > 0">
    <p>Prakiraan per 3 jam:</p>
    <div class="forecast-list">
      <div v-for="(item, index) in forecast" :key="index" class="forecast-item">
        <span>{{ item.dt_txt.slice(11, 13) }}:00</span>
        <img :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`" width="30" />
        <span>{{ Math.round(item.main.temp) }}°C</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['forecast']);
</script>

<style scoped>
.forecast-container { margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(0, 0, 0, 0.1); }
.forecast-list { display: flex; justify-content: space-around; margin-top: 10px; }
.forecast-item { display: flex; flex-direction: column; align-items: center; font-size: 0.8rem; }
</style>