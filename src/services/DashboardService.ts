import apiClient from '../api/client';
import { ApiResponse, DashboardStats } from '../types';

export const DashboardService = {
  getAdminStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await apiClient.get('/dashboard/admin');
    return response.data;
  },

  getVillageStats: async (
    villageId: number,
  ): Promise<ApiResponse<DashboardStats>> => {
    const response = await apiClient.get(`/dashboard/village/${villageId}`);
    return response.data;
  },
};
