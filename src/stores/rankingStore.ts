import productService, { type IRanking } from '@/services/services';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRankingStore = defineStore('ranking', () => {
  const rankings = ref<IRanking[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchRankings() {
    loading.value = true;
    error.value = null;
    try {
      rankings.value = await productService.getAllRankings();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch rankings';
      console.error('Error fetching rankings:', err);
    } finally {
      loading.value = false;
    }
  }

  async function addRanking(ranking: Omit<IRanking, 'id'>) {
    try {
      const newRanking = await productService.createRanking(ranking);
      rankings.value.push(newRanking);
      return newRanking;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to create ranking';
      console.error('Error creating ranking:', err);
      throw err;
    }
  }

  async function updateRanking(id: number, ranking: Partial<IRanking>) {
    try {
      const updatedRanking = await productService.updateRanking(id, ranking);
      const index = rankings.value.findIndex((r: IRanking) => r.id === id);
      if (index !== -1) {
        rankings.value[index] = updatedRanking;
      }
      return updatedRanking;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to update ranking';
      console.error('Error updating ranking:', err);
      throw err;
    }
  }

  async function deleteRanking(id: number) {
    try {
      await productService.deleteRanking(id);
      rankings.value = rankings.value.filter((r: IRanking) => r.id !== id);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to delete ranking';
      console.error('Error deleting ranking:', err);
      throw err;
    }
  }

  return {
    rankings,
    loading,
    error,
    fetchRankings,
    addRanking,
    updateRanking,
    deleteRanking,
  };
});
