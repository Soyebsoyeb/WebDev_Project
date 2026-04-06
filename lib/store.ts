import { create } from 'zustand';

interface UserState {
  user: { name: string, email: string } | null;
  role: 'renter' | 'admin' | null;
  login: (role: 'renter' | 'admin') => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { name: 'Demo User', email: 'demo@rentique.co' }, // Mock logged in state
  role: 'renter',
  login: (role) => set({ role, user: { name: 'Demo User', email: 'demo@rentique.co' } }),
  logout: () => set({ role: null, user: null }),
}));

interface UIState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
