import apiClient from '../api/client';
import { ApiResponse, Scheme } from '../types';

export const SchemeService = {
  getAll: async (): Promise<ApiResponse<Scheme[]>> => {
    const response = await apiClient.get('/schemes');
    return response.data;
  },

  getActive: async (): Promise<ApiResponse<Scheme[]>> => {
    const response = await apiClient.get('/schemes/active');
    return response.data;
  },

  create: async (data: any): Promise<ApiResponse<Scheme>> => {
    const response = await apiClient.post('/schemes', data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<string>> => {
    const response = await apiClient.delete(`/schemes/${id}`);
    return response.data;
  },
};
