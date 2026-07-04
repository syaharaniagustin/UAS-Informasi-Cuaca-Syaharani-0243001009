<template>
  <div class="dashboard">
    <div class="weather-box">
      <div class="brand">🌤️ <h2>Glaze Weather</h2></div>
      <p>Hello, {{ authStore.username }}</p>

      <SearchBar @search="handleSearch" />
      <div class="current-time"><p>{{ currentTime }}</p></div>
      <WeatherDisplay :weather="weather" />
      <ForecastList :forecast="forecast" />
      
      <button class="logout-button" @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useWeather } from '../composables/useWeather'; // Import composable-nya
import SearchBar from '../components/SearchBar.vue';
import WeatherDisplay from '../components/WeatherDisplay.vue';
import ForecastList from '../components/ForecastList.vue';

const router = useRouter();
const authStore = useAuthStore();
const { weather, forecast, fetchData } = useWeather(); // Gunakan composable
const currentTime = ref('');

const updateTime = () => currentTime.value = new Date().toLocaleTimeString('id-ID');

onMounted(() => {
  fetchData('Bogor'); // Data awal
  setInterval(updateTime, 1000);
});

const handleLogout = () => { authStore.logout(); router.push('/login'); };
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
  color: #333; 
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