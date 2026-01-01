import apiClient from '../api/client';
import { ApiResponse, LoginResponse } from '../types';

export const AuthService = {
  login: async (
    email: string,
    password: string,
  ): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (data: any): Promise<ApiResponse<string>> => {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  },

  requestPasswordReset: async (email: string): Promise<ApiResponse<string>> => {
    const response = await apiClient.post('/auth/request-password-reset', {
      email,
    });
    return response.data;
  },

  resetPassword: async (data: any): Promise<ApiResponse<string>> => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  refresh: async (
    token: string,
  ): Promise<ApiResponse<Record<string, string>>> => {
    const response = await apiClient.post('/auth/refresh', { token });
    return response.data;
  },
};
