import apiClient from '../api/client';
import { ApiResponse, User } from '../types';

export interface UserEditRequest {
  id: number;
  username?: string;
  email?: string;
  role?: string;
  villageId?: number;
}

export const UserService = {
  getAll: async (): Promise<ApiResponse<User[]>> => {
    const response = await apiClient.get('/user');
    return response.data;
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get('/user/me');
    return response.data;
  },

  edit: async (data: UserEditRequest): Promise<ApiResponse<string>> => {
    const response = await apiClient.put('/user/edit', data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<string>> => {
    const response = await apiClient.delete(`/user/${id}`);
    return response.data;
  },
};
