import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { UserService } from '../services/UserService';

export interface UserProfile {
  id: number;
  name: string;
  mobileNumber: string;
  email: string;
  roles: string;
}

interface UserContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isSuperAdmin: boolean;
  fetchUserProfile: () => Promise<void>;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await UserService.getMe();
      if (response.success && response.data) {
        // Map the response data to UserProfile
        const userProfile: UserProfile = {
          id: response.data.id,
          name: response.data.name,
          mobileNumber: response.data.mobileNumber,
          email: response.data.email,
          roles: response.data.roles,
        };
        setUser(userProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { StorageService } = require('../utils/storage');
      const hasToken = await StorageService.isAuthenticated();
      if (hasToken && !user && !isLoading) {
        fetchUserProfile();
      }
    };
    checkUser();
  }, [user, isLoading]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const isSuperAdmin =
    !!user?.roles?.toUpperCase().includes('SUPERADMIN') ||
    !!user?.roles?.toUpperCase().includes('ADMIN');

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isSuperAdmin,
        fetchUserProfile,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
