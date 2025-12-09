import RootLayout from '@/layouts/RootLayout.vue';
import Home from '@/pages/Home.vue';
import ReviewManagement from '@/pages/ReviewManagement.vue';
import Settings from '@/pages/Settings.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: RootLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      {
        path: '/review-management',
        name: 'Review Management',
        component: ReviewManagement,
      },
      { path: 'settings', name: 'Settings', component: Settings },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
});

export default router;
