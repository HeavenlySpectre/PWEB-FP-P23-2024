<template>
  <div class="dashboard">
    <nav class="top-nav">
      <div class="container nav-content">
        <div class="logo">
          <span>Kos</span>
          <span>P23</span>
        </div>
        <div class="nav-links">
          <router-link to="/admin/dashboard" class="active"
            >Dashboard</router-link
          >
          <router-link to="/admin/laporan/fasilitas"
            >Laporan Fasilitas</router-link
          >
          <router-link to="/admin/laporan/penghuni"
            >Laporan Penghuni</router-link
          >
          <button @click="logout" class="btn btn-logout">Logout</button>
        </div>
      </div>
    </nav>

    <main class="dashboard-content">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Kamar</h3>
            <div class="stat-value">{{ occupancyData.total || 10 }}</div>
            <div class="stat-label">Kamar</div>
          </div>
          <div class="stat-card">
            <h3>Kamar Terisi</h3>
            <div class="stat-value">{{ occupancyData.filled || 0 }}</div>
            <div class="stat-label">Kamar</div>
          </div>
          <div class="stat-card">
            <h3>Kamar Kosong</h3>
            <div class="stat-value">{{ occupancyData.empty || 0 }}</div>
            <div class="stat-label">Kamar</div>
          </div>
          <div class="stat-card">
            <h3>Okupansi</h3>
            <div class="stat-value">{{ calculateOccupancy }}%</div>
            <div class="stat-label">Terisi</div>
          </div>
        </div>

        <div class="charts-section">
          <div class="card payment-chart">
            <h3>Status Pembayaran</h3>
            <canvas id="paymentChart"></canvas>
          </div>

          <div class="card occupancy-trend">
            <h3>Tren Okupansi</h3>
            <canvas id="occupancyChart"></canvas>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  name: "DashboardView",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const occupancyData = ref({ filled: 0, empty: 0, total: 10 });
    const loading = ref(true);
    const error = ref(null);

    const calculateOccupancy = computed(() => {
      const total = occupancyData.value.total || 10;
      const filled = occupancyData.value.filled || 0;
      return Math.round((filled / total) * 100);
    });

    const fetchOccupancyData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/occupancy",
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        occupancyData.value = response.data;
      } catch (err) {
        error.value = "Failed to fetch occupancy data";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const logout = () => {
      authStore.logout();
      router.push("/login");
    };

    onMounted(() => {
      fetchOccupancyData();

      // Initialize Payment Chart
      const paymentCtx = document.getElementById("paymentChart");
      new Chart(paymentCtx, {
        type: "doughnut",
        data: {
          labels: ["Lunas", "Belum Lunas"],
          datasets: [
            {
              data: [70, 30],
              backgroundColor: ["#FFD700", "#E2E8F0"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#ffffff",
              },
            },
          },
        },
      });

      // Initialize Occupancy Trend Chart
      const occupancyCtx = document.getElementById("occupancyChart");
      new Chart(occupancyCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Okupansi (%)",
              data: [65, 70, 75, 80, 85, 90],
              borderColor: "#FFD700",
              backgroundColor: "rgba(255, 215, 0, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "#ffffff",
                callback: function (value) {
                  return value + "%";
                },
              },
            },
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "#ffffff",
              },
            },
          },
        },
      });
    });

    return {
      occupancyData,
      loading,
      error,
      logout,
      calculateOccupancy,
    };
  },
};
</script>

<style scoped>
.dashboard {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #242424;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffd700;
  margin: 0.5rem 0;
}

.stat-label {
  color: #888888;
  font-size: 0.875rem;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #242424;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.payment-chart,
.occupancy-trend {
  height: 400px;
  position: relative;
}

.btn-logout {
  background: #dc3545;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-logout:hover {
  background: #c82333;
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

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-section {
    grid-template-columns: 1fr;
  }

  .payment-chart,
  .occupancy-trend {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
