import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface AuthState {
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
      logout: () => set({ userInfo: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
