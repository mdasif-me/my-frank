import RootLayout from '@/layouts/RootLayout.vue';
import CompetitorAnalysis from '@/pages/analysis/Index.vue';
import Billings from '@/pages/billings/Index.vue';
import MyCampaigns from '@/pages/campaigns/Index.vue';
import Home from '@/pages/home/Index.vue';
import MyNetwork from '@/pages/network/Index.vue';
import ReviewManagement from '@/pages/review/Index.vue';
import Rewards from '@/pages/rewards/Index.vue';
import Settings from '@/pages/settings/Index.vue';
import Team from '@/pages/team/Index.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: RootLayout,
    children: [
      { path: '/', name: 'Home', component: Home },
      {
        path: '/review-management',
        name: 'Review Management',
        component: ReviewManagement,
      },
      { path: '/team-members', name: 'Team Members', component: Team },
      { path: '/my-campaigns', name: 'My Campaigns', component: MyCampaigns },
      { path: '/rewards', name: 'Rewards', component: Rewards },
      {
        path: '/competitor-analysis',
        name: 'Competitor Analysis',
        component: CompetitorAnalysis,
      },
      { path: '/plan-billings', name: 'Plan & Billings', component: Billings },
      { path: '/my-network', name: 'My Network', component: MyNetwork },
      { path: '/settings', name: 'Settings', component: Settings },
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
