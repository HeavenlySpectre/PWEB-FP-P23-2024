<template>
    <nav class="navbar">
      <div class="brand">
        <router-link to="/facility" class="title">KOS P23</router-link>
      </div>
  
      <div class="user-menu">
        <router-link to="/" class="login-link">Login</router-link>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const username = ref('');
  const userRole = ref('');
  const dropdownOpen = ref(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      username.value = response.data.username;
      userRole.value = response.data.role;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  onMounted(() => {
    fetchUserData();
  });

  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
  };
  
  const emit = defineEmits(['logout']);
  const logout = () => {
    emit('logout');
    dropdownOpen.value = false;
  };
  </script>
  
  <style>
  .navbar {
    background-color: #242424;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .brand {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .title {
    color: #FFD700;
    text-decoration: none;
  }
  
  .user-menu {
    position: relative;
    color: white;
    font-size: 1.125rem;
  }
  
  .username-button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    outline: none;
  }
  
  .dropdown {
    position: absolute;
    right: 0;
    margin-top: 0.5rem;
    width: 12rem;
    background-color: white;
    border-radius: 0.375rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 20;
  }
  
  .dropdown-item {
    display: block;
    padding: 0.5rem 1rem;
    color: #2d3748;
    text-decoration: none;
  }
  
  .dropdown-item:hover {
    background-color: #edf2f7;
  }
  
  .logout-button {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    color: #2d3748;
    cursor: pointer;
  }
  
  .login-link {
    color: white;
    text-decoration: none;
  }
  </style>
