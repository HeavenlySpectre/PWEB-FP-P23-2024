<template>
    <div class="dashboard-user">
      <nav class="top-nav">
        <div class="container nav-content">
          <div class="logo">
            <span>Kos</span>
            <span>P23</span>
          </div>
          <div class="nav-links">
            <router-link to="/user/dashboard" class="active">Dashboard</router-link>
            <router-link to="/user/sewa">Sewa Kamar</router-link>
            <router-link to="/user/pembayaran">Pembayaran</router-link>
            <router-link to="/user/laporan-fasilitas">Laporan Fasilitas</router-link>
            <router-link to="/user/laporan-penghuni">Laporan Penghuni</router-link>
            <button @click="logout" class="btn btn-logout">Logout</button>
          </div>
        </div>
      </nav>
  
      <main class="dashboard-content">
        <div class="container">
          <h1>Detail Kamar</h1>
  
          <!-- Room Details Card -->
          <div class="stat-card">
            <h2>Spesifikasi Kamar</h2>
            <p><strong>Luas Kamar:</strong> 4 x 5 m²</p>
            <p><strong>Include:</strong> TV, Meja Belajar, Kursi Belajar, Tempat Tidur Ukuran Queen</p>
  
            <h3>Fitur Tambahan</h3>
            <div class="extra-features">
              <label>
                <input type="checkbox" v-model="services.laundry" @change="updateTotalPrice" />
                Laundry (+ Rp 100.000)
              </label>
              <label>
                <input type="checkbox" v-model="services.cleaning" @change="updateTotalPrice" />
                Cleaning Service (+ Rp 150.000)
              </label>
              <label>
                <input type="checkbox" v-model="services.catering" @change="updateTotalPrice" />
                Catering (+ Rp 200.000)
              </label>
            </div>
  
            <h3>Pilihan Periode Sewa</h3>
            <p>Periode Sewa: 
              <select v-model="selectedPeriod" @change="updateTotalPrice">
                <option value="3">3 Bulan</option>
                <option value="6">6 Bulan</option>
              </select>
            </p>
  
            <h3>Harga</h3>
            <p><strong>Harga Per Bulan:</strong> Rp {{ room.price }}</p>
            <p><strong>Total Harga:</strong> Rp {{ totalPrice }}</p>
  
            <div class="action-buttons">
              <router-link :to="`/user/sewa/bayar?periode=${selectedPeriod}`" class="btn btn-primary">Pilih dan Bayar</router-link>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RoomDetails',
    data() {
      return {
        room: {
          price: 1000000, // Harga per bulan
        },
        selectedPeriod: 3, // Default periode sewa 3 bulan
        services: {
          laundry: false,
          cleaning: false,
          catering: false,
        },
        totalPrice: 1000000 * 3, // Harga default (3 bulan)
      };
    },
    methods: {
      updateTotalPrice() {
        let additionalCost = 0;
  
        if (this.services.laundry) {
          additionalCost += 100000;
        }
        if (this.services.cleaning) {
          additionalCost += 150000;
        }
        if (this.services.catering) {
          additionalCost += 200000;
        }
  
        // Menghitung total harga berdasarkan periode sewa dan layanan tambahan
        this.totalPrice = (this.room.price * this.selectedPeriod) + additionalCost;
      },
      logout() {
        // Implement logout logic
      },
    },
  };
  </script>
  
  <style scoped>

  .h1 {
    
  }
  .dashboard-user {
    min-height: 100vh;
    background: #1a1a1a;
    color: #ffffff;
  }
  
  .top-nav {
    background: #242424;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffd700;
    display: flex;
    gap: 0.5rem;
  }
  
  .nav-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  
  .nav-links a {
    color: #ffffff;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.3s ease;
  }
  
  .nav-links a:hover {
    background: rgba(255, 215, 0, 0.1);
  }
  
  .nav-links a.active {
    background: rgba(255, 215, 0, 0.2);
    color: #ffd700;
  }
  
  .dashboard-content {
    padding-top: 80px;
    min-height: calc(100vh - 64px);
  }
  
  .stat-card {
    background: #242424;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .stat-card h2,
  .stat-card h3 {
    color: #ffd700;
    margin-bottom: 1rem;
  }
  
  .stat-card ul {
    padding-left: 20px;
  }
  
  .stat-card ul li {
    margin-bottom: 0.5rem;
  }
  
  .extra-features {
    margin-bottom: 1rem;
  }
  
  .extra-features label {
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1rem;
    color: #ddd;
  }
  
  .action-buttons {
    margin-top: 1.5rem;
  }
  
  .btn-primary {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #218838;
  }
  
  .select-period {
    margin-top: 1rem;
  }
  
  h3 {
    color: #ffffff;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
  
    .container {
      padding: 0 1rem;
    }
  }
  </style>
  