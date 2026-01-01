export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Village {
  id: number;
  name: string;
  district: string;
  state: string;
  population: number;
  description: string;
}

export interface VillageRequest {
  name: string;
  district: string;
  state: string;
  population: number;
  description: string;
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'RESOLVED' | 'IN_PROGRESS';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  villageId: number;
  reporterId: number;
  createdAt: string;
}

export interface IssueRequest {
  title: string;
  description: string;
  priority: string;
  villageId: number;
}

export interface Scheme {
  id: number;
  title: string;
  description: string;
  category: string;
  benefits: string;
  eligibility: string;
  isActive: boolean;
}

export interface Facility {
  id: number;
  name: string;
  type: string;
  description: string;
  villageId: number;
  status: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  villageId?: number;
}

export interface LoginResponse {
  token: string;
  role: string;
  username: string;
  id: string;
}

export interface DashboardStats {
  totalVillages: number;
  totalIssues: number;
  resolvedIssues: number;
  pendingIssues: number;
  activeSchemes: number;
}
