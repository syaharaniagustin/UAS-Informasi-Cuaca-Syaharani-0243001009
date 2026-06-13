<template>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <label for="register" class="register-label">Don't have an account? <a href="/register">Register</a></label>
        <label for="forgot-password" class="register-label"><a href="/forgot-password">Forgot Password?</a></label>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    name: 'LoginForm',
    setup() {
        const username = ref('');
        const password = ref('');

        const handleLogin = () => {

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

            alert('success');
        };

        return { username, password, handleLogin };
    }
}
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ffaac4;
    border-radius: 8px;
    background-color: #ffffff;
}
.register-label{
    display: block;
    margin-top: 1rem;
    text-align: center;
}
.form-group {
    margin-bottom: 1rem;
}
label {
    display: block;
    margin-bottom: 0.5rem;
}
input {
    width: 100%;
    padding: 0.5rem;        
    border: 1px solid #ffaac4;
    border-radius: 4px;
}
button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #7ada77; 
    color: white;
    font-size: 1rem;
    cursor: pointer;
}
button:hover {
    background-color: #38a173;
}                    
</style>