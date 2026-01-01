import apiClient from '../api/client';
import { ApiResponse, Issue, IssueRequest } from '../types';

export const IssueService = {
  raise: async (data: IssueRequest): Promise<ApiResponse<Issue>> => {
    const response = await apiClient.post('/issues', data);
    return response.data;
  },

  getByVillage: async (villageId: number): Promise<ApiResponse<Issue[]>> => {
    const response = await apiClient.get(`/issues/village/${villageId}`);
    return response.data;
  },

  getMyIssues: async (): Promise<ApiResponse<Issue[]>> => {
    const response = await apiClient.get('/issues/me');
    return response.data;
  },

  updateStatus: async (
    id: number,
    status: string,
  ): Promise<ApiResponse<Issue>> => {
    const response = await apiClient.put(
      `/issues/${id}/status?status=${status}`,
    );
    return response.data;
  },
};
