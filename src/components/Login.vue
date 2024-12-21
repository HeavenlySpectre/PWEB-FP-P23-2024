<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input 
            type="text" 
            id="username"
            v-model="username" 
            required 
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password"
            v-model="password" 
            required 
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const loading = ref(false);
    const router = useRouter();
    const authStore = useAuthStore();

    const login = async () => {
      try {
        loading.value = true;
        error.value = '';

        const response = await axios.post('http://localhost:5000/api/login', {
          username: username.value,
          password: password.value
        });

        // Store auth data
        authStore.setToken(response.data.token);
        authStore.setUser({
          id: response.data.userId,
          username: response.data.username,
          role: response.data.role
        });

        // Redirect based on role
        if (response.data.role === 'ADMIN') {
          router.push('/admin/dashboard');
        } else {
          router.push('/user/dashboard');
        }
      } catch (err) {
        console.error('Login error:', err);
        error.value = err.response?.data?.message || 'Login failed. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      error,
      loading,
      login
    };
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 15rem);
  margin-top: 50px;
}

.login-card {
  background: #242424;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  color: #ffffff;
}

input:focus {
  outline: none;
  border-color: #FFD700;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #FFD700;
  border: none;
  border-radius: 4px;
  color: #000000;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background: #FFC700;
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.error {
  color: #ff4444;
  text-align: center;
  margin-top: 1rem;
}
</style>
