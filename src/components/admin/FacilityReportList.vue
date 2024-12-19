<template>
    <div class="facility-reports">
      <ul>
        <li v-for="report in reports" :key="report._id">
          <p>User: {{ report.user.username }}</p>
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
          const response = await axios.get('/api/reports/facility');
          reports.value = response.data;
        } catch (error) {
          console.error('Error fetching facility reports:', error);
        }
      });
  
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
      };
  
      return { reports, formatDate };
    }
  };
  </script>