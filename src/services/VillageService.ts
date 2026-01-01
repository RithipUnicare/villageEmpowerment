import apiClient from '../api/client';
import { ApiResponse, Village, VillageRequest } from '../types';

export const VillageService = {
  getAll: async (): Promise<ApiResponse<Village[]>> => {
    const response = await apiClient.get('/villages');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Village>> => {
    const response = await apiClient.get(`/villages/${id}`);
    return response.data;
  },

  create: async (data: VillageRequest): Promise<ApiResponse<Village>> => {
    const response = await apiClient.post('/villages', data);
    return response.data;
  },

  update: async (
    id: number,
    data: VillageRequest,
  ): Promise<ApiResponse<Village>> => {
    const response = await apiClient.put(`/villages/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<string>> => {
    const response = await apiClient.delete(`/villages/${id}`);
    return response.data;
  },
};
