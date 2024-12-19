<template>
    <div class="user-reports">
      <ul>
        <li v-for="report in reports" :key="report._id">
          <p>Message: {{ report.message }}</p>
          <p>Date: {{ formatDate(report.created_at) }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const reports = ref([]);
  
      onMounted(async () => {
        try {
          const response = await axios.get('/api/reports/user');
          reports.value = response.data;
        } catch (error) {
          console.error('Error fetching user reports:', error);
        }
      });
  
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
      };
  
      return { reports, formatDate };
    }
  };
  </script>