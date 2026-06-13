<template>
    <div class="resetpassword-form">
        <h2>Reset Password</h2>
        <form @submit.prevent="handleResetpassword">
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" placeholder="Enter your register email" required />
        </div>
         <div class="form-group">
            <label for="password">New Password:</label>
            <input type="password" id="password" v-model="password" placeholder="Enter your new password" required />
        </div>      
        <div class="form-group">
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>

        <button type="submit">Reset Password</button>
        <label for="login" class="register-label">Back to login <a href="/login">Login</a></label>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    name: 'ResetPasswordForm',
    setup() {
        const username = ref('');
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

            alert('success');
        };

        return {
            username,
            email,
            password,
            confirmPassword,
            handleResetpassword
        };
    }
}
</script>
<style scoped>
.register-label{
    display: block;
    margin-top: 1rem;
    text-align: center;
}
.register-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
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
    border: 1px solid #ccc;
    border-radius: 4px;
}
button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #42b983; 
    color: white;
    font-size: 1rem;
    cursor: pointer;
}
button:hover {
    background-color: #38a173;
}                    
</style>