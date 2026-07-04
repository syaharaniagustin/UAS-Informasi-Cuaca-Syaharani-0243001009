import { ref } from 'vue';

export function useWeather() {
  const weather = ref(null);
  const forecast = ref([]);

  const fetchData = async (city) => {
    try {
      // Fetch cuaca
      const resW = await fetch(`http://localhost:3001/api/weather?city=${city}`);
      if (!resW.ok) throw new Error('Kota tidak ditemukan');
      weather.value = await resW.json();

      // Fetch forecast
      const resF = await fetch(`http://localhost:3001/api/forecast?city=${city}`);
      const dataF = await resF.json();
      forecast.value = dataF.list.slice(0, 3);
    } catch (e) { 
      console.error("Error:", e.message);
      alert(e.message); // Notifikasi ke user
    }
  };

  return { weather, forecast, fetchData };
}