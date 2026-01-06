import apiClient from '../api/client';
import { ApiResponse, LoginResponse } from '../types';
import { StorageService } from '../utils/storage';

export const AuthService = {
  login: async (
    mobileNumber: string,
    password: string,
  ): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post('/auth/login', {
      mobileNumber,
      password,
    });

    // Store tokens after successful login
    // The response structure is { success: true, message: "...", data: { accessToken: "...", refreshToken: "..." } }
    if (response.data?.success && response.data?.data) {
      const { accessToken, refreshToken } = response.data.data;
      if (accessToken && refreshToken) {
        await StorageService.saveTokens(accessToken, refreshToken);
      }
    }

    return response.data;
  },

  logout: async (): Promise<void> => {
    await StorageService.clearTokens();
    // App.tsx will automatically detect the cleared tokens and navigate to login
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
