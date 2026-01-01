import apiClient from '../api/client';
import { ApiResponse, Facility } from '../types';

export const FacilityService = {
  add: async (data: any): Promise<ApiResponse<Facility>> => {
    const response = await apiClient.post('/facilities', data);
    return response.data;
  },

  update: async (id: number, data: any): Promise<ApiResponse<Facility>> => {
    const response = await apiClient.put(`/facilities/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<string>> => {
    const response = await apiClient.delete(`/facilities/${id}`);
    return response.data;
  },

  getByVillage: async (villageId: number): Promise<ApiResponse<Facility[]>> => {
    const response = await apiClient.get(`/facilities/village/${villageId}`);
    return response.data;
  },
};
