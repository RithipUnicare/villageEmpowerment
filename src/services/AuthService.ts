import apiClient from '../api/client';
import { ApiResponse } from '../types';
import { StorageService } from '../utils/storage';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

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
    if (response.data?.accessToken && response.data?.refreshToken) {
      await StorageService.saveTokens(
        response.data.accessToken,
        response.data.refreshToken,
      );
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
