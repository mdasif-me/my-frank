import productService, { type IStats } from '@/services/services';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStatsStore = defineStore('stats', () => {
  const stats = ref<IStats[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchStats() {
    loading.value = true;
    error.value = null;
    try {
      stats.value = await productService.getStats();
    } catch (err) {
      error.value = 'Failed to fetch stats';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    stats,
    loading,
    error,
    fetchStats,
  };
});
