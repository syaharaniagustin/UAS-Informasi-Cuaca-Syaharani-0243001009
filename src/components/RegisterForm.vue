<template>
  <div class="login-container">
    <div class="form-box">
      <div class="brand-area">
        <img src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png" alt="weather icon" class="brand-icon" />
        <h2>Glaze Weather</h2>
        <p class="subtitle">Join us to get your weather forecast</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <input type="text" id="username" v-model="username" placeholder="Username" required />
        </div>
        
        <div class="form-group">
          <input type="email" id="email" v-model="email" placeholder="Email" required />
        </div>
        
        <div class="form-group">
          <input type="password" id="password" v-model="password" placeholder="Password" required />
        </div>
        
        <div class="form-group">
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password" required />
        </div>
        
        <button type="submit">Register</button>
        
        <div class="extra-links">
          <p>Already have an account? <router-link to="/login">Login here</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const API_BASE_URL = 'http://localhost:3001/api/auth';

export default {
    name: 'RegisterForm',
    setup() {
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');
        const router = useRouter();

        const handleRegister = async () => {
            const usernameRegex = /^[A-Za-z]{3,}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!usernameRegex.test(username.value)) {
                alert('Username minimal 3 huruf dan tidak boleh mengandung angka');
                return;
            }
            if (!emailRegex.test(email.value)) {
                alert('Email tidak valid');
                return;
            }
            if (!passwordRegex.test(password.value)) {
                alert('Password minimal 8 karakter, mengandung huruf kapital dan angka');
                return;
            }
            if (password.value !== confirmPassword.value) {
                alert('Password dan Confirm Password tidak sama');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username.value,
                        email: email.value,
                        password: password.value,
                        confirmPassword: confirmPassword.value,
                    }),
                });

                const result = await response.json();
                if (!response.ok) {
                    alert(result.message || 'Registrasi gagal.');
                    return;
                }

                alert('Registrasi berhasil! Silakan login.');
                router.push('/login');
            } catch (error) {
                alert('Terjadi kesalahan jaringan.');
            }
        };

        return { username, email, password, confirmPassword, handleRegister };
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

/* Kotak Form Cerah (Glassmorphism) */
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

/* Input cerah */
input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.5);
  color: #333;
  box-sizing: border-box;
}

input::placeholder { color: #666; }

/* Tombol cerah */
button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 12px;
  background-color: #0d1b2a;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover { background-color: #1b263b; }

/* Link cerah */
.extra-links { margin-top: 15px; font-size: 0.9rem; }
.extra-links a { color: #0077be; font-weight: bold; text-decoration: none; }
.extra-links a:hover { text-decoration: underline; }

/* Branding */
.brand-area { margin-bottom: 30px; }
.brand-icon { width: 60px; margin-bottom: 10px; }
.brand-area h2 { margin: 0; font-size: 1.8rem; color: #0d1b2a; }
.subtitle { font-size: 0.85rem; opacity: 0.8; margin-top: 5px; }
</style>