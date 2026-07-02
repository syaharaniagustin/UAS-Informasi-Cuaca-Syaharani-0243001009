<template>
  <div class="dashboard">
    <div class="weather-box">
      <!-- Header Branding -->
      <div class="brand">
        <span class="logo">🌤️</span>
        <h2>Glaze Weather</h2>
      </div>
      <p>Hello, {{ authStore.username }}</p>

      <!-- Search Bar -->
      <div class="search-box">
        <input v-model="city" @keyup.enter="handleSearch" placeholder="Cari kota..." />
        <button @click="handleSearch">Cari</button>
      </div>

      <!-- Jam Saat Ini -->
      <div class="current-time">
        <p>{{ currentTime }}</p>
      </div>

      <!-- Cuaca Utama -->
      <div v-if="weather" class="weather-result">
        <h3>{{ weather.name }}, {{ weather.sys.country }}</h3>
        <p class="temp">{{ Math.round(weather.main.temp) }}°C</p>
        <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" />
        <p class="desc">{{ weather.weather[0].description }}</p>

        <!-- Detail Cuaca -->
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

      <!-- Prakiraan Cuaca -->
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

      <button class="logout-button" @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const city = ref('Bogor');
const weather = ref(null);
const forecast = ref([]);
const currentTime = ref('');
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherData = async () => {
  if (!city.value) return;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) throw new Error('Kota tidak ditemukan');
    weather.value = await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

const getForecastData = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    forecast.value = data.list.slice(0, 3);
  } catch (error) {
    console.error("Gagal memuat forecast");
  }
};

const handleSearch = () => {
  getWeatherData();
  getForecastData();
};

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
};

onMounted(() => {
  getWeatherData();
  getForecastData();
  updateTime();
  setInterval(updateTime, 1000);
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
/* Latar Belakang Cerah */
.dashboard {
  background: linear-gradient(135deg, #74c3e8 0%, #e6d3c3 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #333; /* Teks diubah jadi gelap agar kontras dengan background cerah */
  font-family: 'Segoe UI', sans-serif;
}

/* Kotak Glassmorphism dengan warna putih transparan */
.weather-box {
  width: 95%;
  max-width: 450px;
  padding: 35px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.brand { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px; }
.temp { font-size: 2.5rem; font-weight: bold; margin: 5px 0; }
.desc { text-transform: capitalize; margin-top: -10px; }

.extra-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
}

.info-item .value { font-weight: bold; font-size: 1.1rem; margin: 0; }
.info-item .label { font-size: 0.7rem; color: #555; margin: 0; }

.search-box { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
input { padding: 12px 15px; border-radius: 12px; border: 1px solid rgba(0, 0, 0, 0.1); background: rgba(255, 255, 255, 0.5); color: #333; width: 70%; }
.search-box button { padding: 10px 20px; border-radius: 12px; border: none; background-color: #0d1b2a; color: white; font-weight: bold; cursor: pointer; }
.logout-button { margin-top: 25px; width: 100%; padding: 12px; border: none; border-radius: 12px; background-color: rgba(229, 62, 62, 0.8); color: white; font-weight: bold; cursor: pointer; }
.forecast-container { margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(0, 0, 0, 0.1); }
.forecast-list { display: flex; justify-content: space-around; margin-top: 10px; }
.forecast-item { display: flex; flex-direction: column; align-items: center; font-size: 0.8rem; }
.current-time { font-size: 1.2rem; font-weight: bold; margin: 10px 0; color: #0077be; }
</style>