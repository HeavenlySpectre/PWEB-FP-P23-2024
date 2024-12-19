import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('../views/admin/DashboardView.vue'),
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/penghuni/:id',
    name: 'penghuni-detail',
    component: () => import('../views/admin/PenghuniDetailView.vue'),
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/laporan/fasilitas',
    name: 'laporan-fasilitas',
    component: () => import('../views/admin/FasilitasReportView.vue'),
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/laporan/penghuni',
    name: 'laporan-penghuni',
    component: () => import('../views/admin/PenghuniReportView.vue'),
    meta: { requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAdmin) {
    if (!authStore.token || authStore.user?.role !== 'ADMIN') {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
