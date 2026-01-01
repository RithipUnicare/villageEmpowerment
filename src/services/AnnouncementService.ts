import apiClient from '../api/client';
import { ApiResponse } from '../types';

export interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export const AnnouncementService = {
  getAll: async (): Promise<ApiResponse<Announcement[]>> => {
    const response = await apiClient.get('/announcements');
    return response.data;
  },

  create: async (
    data: Record<string, string>,
  ): Promise<ApiResponse<Announcement>> => {
    const response = await apiClient.post('/announcements', data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<string>> => {
    const response = await apiClient.delete(`/announcements/${id}`);
    return response.data;
  },
};
