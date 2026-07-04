<template>
  <div v-if="weather" class="weather-result">
    <h3>{{ weather.name }}, {{ weather.sys.country }}</h3>
    <p class="temp">{{ Math.round(weather.main.temp) }}°C</p>
    <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" />
    <p class="desc">{{ weather.weather[0].description }}</p>
    <div class="extra-info">
      <div class="info-item">
        <p class="value">{{ weather.main.humidity }}%</p>
        <p class="label">Humidity</p>
      </div>
      <div class="info-item">
        <p class="value">{{ weather.wind.speed }} m/s</p>
        <p class="label">Wind</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['weather']);
</script>

<style scoped>
.weather-result { text-align: center; }
.temp { font-size: 2.5rem; font-weight: bold; margin: 5px 0; }
.desc { text-transform: capitalize; margin-top: -10px; }
.extra-info {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;
  padding: 15px 20px; background: rgba(255, 255, 255, 0.3); border-radius: 15px;
}
.info-item .value { font-weight: bold; font-size: 1.1rem; margin: 0; }
.info-item .label { font-size: 0.7rem; color: #555; margin: 0; }
</style>