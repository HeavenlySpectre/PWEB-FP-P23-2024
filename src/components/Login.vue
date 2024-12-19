<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
        successMessage: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5000/api/login', {
            username: this.username,
            password: this.password
          });
  
          // Assuming the response contains a token and user role
          const { token, role } = response.data;
  
          // Store the token in local storage
          localStorage.setItem('token', token);
  
          // Store user role in local storage or state management
          localStorage.setItem('role', role);
  
          // Redirect to the dashboard
          this.$router.push('/dashboard'); // Adjust the route as necessary
  
          // Optionally, you can also set a success message
          this.successMessage = 'Login successful!';
        } catch (error) {
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error('Login error:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  </style>