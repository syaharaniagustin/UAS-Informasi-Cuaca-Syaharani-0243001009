<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Forgot Password</h2>
      <p class="subtitle">Enter your email to receive a reset link</p>
      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" placeholder="Enter your registered email" required />
        </div>
        <button type="submit">Send Reset Link</button>
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
    name: 'ForgotPasswordForm',
    setup() {
        const email = ref('');

        const handleForgotPassword = () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                alert('Email tidak valid');
                return;
            }
            alert('Success');
            window.location.href = '/reset-password';
        };

        return { email, handleForgotPassword };
    }
}
</script>

<style scoped>
/* Background Cerah */
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

h2 { margin-bottom: 10px; color: #0d1b2a; }
.subtitle { font-size: 0.9rem; opacity: 0.8; margin-bottom: 20px; }

.form-group {
  margin-bottom: 1.5rem;
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