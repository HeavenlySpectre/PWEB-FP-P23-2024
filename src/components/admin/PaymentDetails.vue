<template>
    <div class="payment-details">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Memuat data pembayaran...</p>
      </div>
  
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchPaymentDetails" class="btn btn-primary">Coba Lagi</button>
      </div>
  
      <div v-else-if="!paymentDetails" class="empty-state">
        <div class="empty-icon">💰</div>
        <h3>Data Tidak Ditemukan</h3>
        <p>Detail pembayaran tidak tersedia.</p>
      </div>
  
      <div v-else class="payment-content">
        <div class="payment-header">
          <h3>Detail Pembayaran</h3>
          <span :class="['status-badge', paymentDetails.status.toLowerCase()]">
            {{ getStatusLabel(paymentDetails.status) }}
          </span>
        </div>
  
        <div class="payment-info">
          <div class="info-group">
            <h4>Informasi Sewa</h4>
            <div class="info-item">
              <span class="label">Periode Sewa:</span>
              <span class="value">{{ paymentDetails.rent_periods }} Bulan</span>
            </div>
            <div class="info-item">
              <span class="label">Metode Pembayaran:</span>
              <span class="value">{{ getPaymentMethod(paymentDetails.payment_method) }}</span>
            </div>
          </div>
  
          <div class="info-group">
            <h4>Layanan</h4>
            <div class="services-list">
              <div class="service-item">
                <span class="label">Kamar</span>
                <span class="value">{{ formatPrice(getRoomPrice(paymentDetails.rent_periods)) }}</span>
              </div>
              <template v-if="paymentDetails.services">
                <div 
                  v-for="service in paymentDetails.services" 
                  :key="service"
                  class="service-item"
                >
                  <span class="label">{{ getServiceLabel(service) }}</span>
                  <span class="value">{{ formatPrice(getServicePrice(service, paymentDetails.rent_periods)) }}</span>
                </div>
              </template>
            </div>
          </div>
  
          <div class="info-group total">
            <div class="info-item">
              <span class="label">Total Pembayaran:</span>
              <span class="value total-amount">{{ formatPrice(paymentDetails.total_bill) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  
  export default {
    name: 'PaymentDetails',
    props: {
      userId: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const authStore = useAuthStore();
      const loading = ref(true);
      const error = ref(null);
      const paymentDetails = ref(null);
  
      const PRICES = {
        ROOM: {
          THREE_MONTHS: 6000000,
          SIX_MONTHS: 12000000
        },
        LAUNDRY: {
          THREE_MONTHS: 600000,
          SIX_MONTHS: 1200000
        },
        CLEANING: {
          THREE_MONTHS: 300000,
          SIX_MONTHS: 600000
        },
        CATERING: {
          THREE_MONTHS: 3000000,
          SIX_MONTHS: 6000000
        }
      };
  
      const getStatusLabel = (status) => {
        const labels = {
          'PENDING': 'Menunggu Pembayaran',
          'PAID': 'Lunas',
          'OVERDUE': 'Terlambat'
        };
        return labels[status] || status;
      };
  
      const getPaymentMethod = (method) => {
        const methods = {
          'QRIS': 'QRIS',
          'BANK_TRANSFER': 'Transfer Bank'
        };
        return methods[method] || method;
      };
  
      const getServiceLabel = (service) => {
        const labels = {
          'LAUNDRY': 'Laundry',
          'CLEANING': 'Cleaning Service',
          'CATERING': 'Catering'
        };
        return labels[service] || service;
      };
  
      const getRoomPrice = (periods) => {
        return periods === 3 ? PRICES.ROOM.THREE_MONTHS : PRICES.ROOM.SIX_MONTHS;
      };
  
      const getServicePrice = (service, periods) => {
        const priceKey = periods === 3 ? 'THREE_MONTHS' : 'SIX_MONTHS';
        return PRICES[service]?.[priceKey] || 0;
      };
  
      const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(price);
      };
  
      const fetchPaymentDetails = async () => {
        try {
          loading.value = true;
          error.value = null;
          const response = await axios.get(`http://localhost:5000/api/payments/${props.userId}`, {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          });
          paymentDetails.value = response.data;
        } catch (err) {
          error.value = 'Gagal memuat detail pembayaran. Silakan coba lagi.';
          console.error('Error fetching payment details:', err);
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(() => {
        fetchPaymentDetails();
      });
  
      return {
        loading,
        error,
        paymentDetails,
        getStatusLabel,
        getPaymentMethod,
        getServiceLabel,
        getRoomPrice,
        getServicePrice,
        formatPrice,
        fetchPaymentDetails
      };
    }
  };
  </script>
  
  <style scoped>
  .payment-details {
    background: #242424;
    border-radius: 12px;
    padding: 1.5rem;
    color: #ffffff;
  }
  
  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: 2rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left-color: #FFD700;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .payment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .status-badge.pending {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
  }
  
  .status-badge.paid {
    background: rgba(40, 167, 69, 0.2);
    color: #28a745;
  }
  
  .status-badge.overdue {
    background: rgba(220, 53, 69, 0.2);
    color: #dc3545;
  }
  
  .payment-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .info-group {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1.5rem;
  }
  
  .info-group:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  .info-group h4 {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem;
  }
  
  .info-item,
  .service-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .value {
    font-weight: 500;
  }
  
  .total {
    margin-top: 1rem;
  }
  
  .total-amount {
    font-size: 1.25rem;
    color: #FFD700;
    font-weight: bold;
  }
  
  .btn-primary {
    background: #FFD700;
    color: #000000;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .btn-primary:hover {
    background: #FFC700;
  }
  
  .empty-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 768px) {
    .payment-details {
      padding: 1rem;
    }
  
    .payment-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
  </style>
  