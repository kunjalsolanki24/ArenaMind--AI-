import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'Fan' | 'Volunteer' | 'Organizer' | null;

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (user: UserProfile) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
