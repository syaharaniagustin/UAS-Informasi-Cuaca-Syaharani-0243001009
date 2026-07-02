<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Reset Password</h2>
      <form @submit.prevent="handleResetpassword">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your registered email" required />
        </div>
        
        <div class="form-group">
          <label for="password">New Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your new password" required />
        </div>      
        
        <div class="form-group">
          <label for="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirm your new password" required />
        </div>

        <button type="submit">Reset Password</button>
        
        <div class="extra-links">
          <p>Back to login <router-link to="/login">Login</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'ResetPasswordForm',
    setup() {
        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');

        const handleResetpassword = () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

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
            alert('Success');
        };

        return { email, password, confirmPassword, handleResetpassword };
    }
}
</script>

<style scoped>
/* Background Cerah (Sesuai Dashboard) */
.auth-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #74c3e8 0%, #e6d3c3 100%);
  color: #333;
  font-family: 'Segoe UI', sans-serif;
}

/* Kotak Form Cerah (Glassmorphism) */
.auth-box {
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

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

/* Input Cerah */
input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.5);
  color: #333;
  box-sizing: border-box;
}

input::placeholder { color: #666; }

/* Tombol Cerah */
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
  margin-top: 10px;
}

button:hover { background-color: #1b263b; }

/* Link navigasi */
.extra-links {
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.extra-links a {
  color: #0077be;
  text-decoration: none;
  font-weight: bold;
}

.extra-links a:hover { text-decoration: underline; }
</style>