<template>
  <div class="login-container">
    
    <div class="form-box">
      <div class="brand-area">
        <img src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png" alt="weather icon" class="brand-icon" />
        <h2>Glaze Weather</h2>
        <p class="subtitle">Check your local weather in style</p>
      </div>

      <form @submit.prevent="handleLogin">
        
        <div class="form-group">
          <input type="text" id="username" v-model="username" placeholder="Username" required />
        </div>
        
        <div class="form-group">
          <input type="password" id="password" v-model="password" placeholder="Password" required />
        </div>
        
        <button type="submit">Login</button>
        
        <div class="extra-links">
          <p>Don't have an account? <router-link to="/register">Register</router-link></p>
          <p><router-link to="/forgot-password">Forgot Password?</router-link></p>
        </div>
        
      </form>
    </div>
    
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const API_BASE_URL = "http://localhost:3001/api/auth";

export default {
    name: 'LoginForm',
    setup() {
        const username = ref('');
        const password = ref('');
        const router = useRouter();
        const authStore = useAuthStore();

        const handleLogin = async () => {
            const usernameRegex = /^[A-Za-z]{3,}$/;
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!usernameRegex.test(username.value)) {
                alert('Username minimal 3 huruf dan tidak boleh mengandung angka');
                return;
            }

            if (!passwordRegex.test(password.value)) {
                alert('Password minimal 8 karakter, mengandung huruf kapital dan angka');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value,
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    alert(result.message || 'Login gagal.');
                    return;
                }

                authStore.login(username.value);
                alert(result.message || 'Login berhasil.');
                router.push('/dashboard');
            } catch (_error) {
                alert('Backend belum berjalan atau terjadi kesalahan jaringan.');
            }
        };

        return { username, password, handleLogin };
    }
}
</script>

<style scoped>
/* Background Cerah (Sesuai Dashboard) */
.login-container {
  background: linear-gradient(135deg, #74c3e8 0%, #e6d3c3 100%);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

/* Kotak Form Putih Transparan (Glassmorphism Cerah) */
.form-box {
  width: 90%;
  max-width: 400px;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Styling Input Cerah */
input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.5);
  color: #333;
  outline: none;
  box-sizing: border-box;
}

input::placeholder {
  color: #666;
}

/* Tombol Submit */
button {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background-color: #0d1b2a;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #1b263b;
}

/* Merapikan link */
.extra-links {
  margin-top: 20px;
  font-size: 0.9rem;
}

.extra-links p {
  margin: 8px 0;
}

.extra-links a {
  color: #0077be;
  font-weight: bold;
  text-decoration: none;
}

.extra-links a:hover {
  text-decoration: underline;
}

/* Branding */
.brand-area {
  margin-bottom: 30px;
}

.brand-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.brand-area h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #0d1b2a;
}

.subtitle {
  font-size: 0.85rem;
  opacity: 0.8;
  margin-top: 5px;
}
</style>