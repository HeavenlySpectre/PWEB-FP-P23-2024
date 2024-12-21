<template>
    <div class="user-landing-page">
      <h1>Welcome to Your Dashboard</h1>
      <h2>History Tagihan Anda</h2>
      <ul>
        <li v-for="payment in paymentHistory" :key="payment._id">
          <p><strong>Tagihan:</strong> {{ payment.total_bill }}</p>
          <p><strong>Metode Pembayaran:</strong> {{ payment.payment_method }}</p>
          <p><strong>Periode Sewa:</strong> {{ payment.rent_periods }} bulan</p>
          <ul>
            <li v-for="invoice in payment.invoice_history" :key="invoice._id">
              <p><strong>Jumlah:</strong> {{ invoice.bill }}</p>
              <p><strong>Tanggal:</strong> {{ new Date(invoice.created_at).toLocaleDateString() }}</p>
            </li>
          </ul>
        </li>
      </ul>
      <nav>
        <router-link to="/user/dashboard">Go to Dashboard</router-link>
      </nav>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserLandingPage',
    data() {
      return {
        paymentHistory: [], // Data untuk menyimpan history tagihan dari backend
      };
    },
    async mounted() {
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        const response = await axios.get('http://localhost:5000/api/payments/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.paymentHistory = response.data; // Simpan hasil response ke data
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .user-landing-page {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .user-landing-page h1 {
    color: #2c3e50;
  }
  
  .user-landing-page ul {
    list-style-type: none;
    padding: 0;
  }
  
  .user-landing-page li {
    background: #f9f9f9;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  nav {
    margin-top: 20px;
  }
  </style>
  