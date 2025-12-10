import productService, { type ICampaign } from '@/services/services';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCampaignStore = defineStore('campaign', () => {
  const campaigns = ref<ICampaign[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCampaigns() {
    loading.value = true;
    error.value = null;
    try {
      campaigns.value = await productService.getAllCampaigns();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch campaigns';
      console.error('Error fetching campaigns:', err);
    } finally {
      loading.value = false;
    }
  }

  async function addCampaign(campaign: Omit<ICampaign, 'id'>) {
    try {
      const newCampaign = await productService.createCampaign(campaign);
      campaigns.value.push(newCampaign);
      return newCampaign;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to create campaign';
      console.error('Error creating campaign:', err);
      throw err;
    }
  }

  async function updateCampaign(id: number, campaign: Partial<ICampaign>) {
    try {
      const updatedCampaign = await productService.updateCampaign(id, campaign);
      const index = campaigns.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        campaigns.value[index] = updatedCampaign;
      }
      return updatedCampaign;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to update campaign';
      console.error('Error updating campaign:', err);
      throw err;
    }
  }

  async function deleteCampaign(id: number) {
    try {
      await productService.deleteCampaign(id);
      campaigns.value = campaigns.value.filter((c) => c.id !== id);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to delete campaign';
      console.error('Error deleting campaign:', err);
      throw err;
    }
  }

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
  };
});
