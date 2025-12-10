import apiClient from './api';

export interface IProduct {
  id: number;
  name: string;
  address: string;
  rating: number;
  totalReview: number;
  status: {
    value: number;
    type: 'neutral' | 'positive' | 'negative';
  };
}

export interface IStats {
  title: string;
  value: string;
  icon: string;
}

export interface ICampaign {
  id: number;
  name: string;
  status: 'active' | 'draft' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  reach: number;
  engagement: number;
  conversions: number;
  conversionRate: number;
}

export interface IRanking {
  id: number;
  title: string;
  status: 'in-progress' | 'completed';
  reward: string;
  topPerformer: string;
  progress: number;
  startDate: string;
  endDate: string;
  daysLeft: number;
  timeLeft: string;
}

class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    const response = await apiClient.get('/products');
    return response.data;
  }

  async getProductById(id: number): Promise<IProduct> {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  }

  async createProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
    const response = await apiClient.post('/products', product);
    return response.data;
  }

  async updateProduct(
    id: number,
    product: Partial<IProduct>
  ): Promise<IProduct> {
    const response = await apiClient.patch(`/products/${id}`, product);
    return response.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }

  async getStats(): Promise<IStats[]> {
    const response = await apiClient.get('/stats');
    return response.data;
  }

  async getAllCampaigns(): Promise<ICampaign[]> {
    const response = await apiClient.get('/campaigns');
    return response.data;
  }

  async getCampaignById(id: number): Promise<ICampaign> {
    const response = await apiClient.get(`/campaigns/${id}`);
    return response.data;
  }

  async createCampaign(campaign: Omit<ICampaign, 'id'>): Promise<ICampaign> {
    const response = await apiClient.post('/campaigns', campaign);
    return response.data;
  }

  async updateCampaign(
    id: number,
    campaign: Partial<ICampaign>
  ): Promise<ICampaign> {
    const response = await apiClient.patch(`/campaigns/${id}`, campaign);
    return response.data;
  }

  async deleteCampaign(id: number): Promise<void> {
    await apiClient.delete(`/campaigns/${id}`);
  }

  async getAllRankings(): Promise<IRanking[]> {
    const response = await apiClient.get('/rankings');
    return response.data;
  }

  async getRankingById(id: number): Promise<IRanking> {
    const response = await apiClient.get(`/rankings/${id}`);
    return response.data;
  }

  async createRanking(ranking: Omit<IRanking, 'id'>): Promise<IRanking> {
    const response = await apiClient.post('/rankings', ranking);
    return response.data;
  }

  async updateRanking(
    id: number,
    ranking: Partial<IRanking>
  ): Promise<IRanking> {
    const response = await apiClient.patch(`/rankings/${id}`, ranking);
    return response.data;
  }

  async deleteRanking(id: number): Promise<void> {
    await apiClient.delete(`/rankings/${id}`);
  }
}

export default new ProductService();
