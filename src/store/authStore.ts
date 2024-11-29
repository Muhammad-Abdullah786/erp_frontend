// /src/stores/authStore.ts
import { create } from "zustand";

interface AuthState {
  token: string | null;
  client: any;
  setAuthData: (token: string, client: any) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>((set: any) => ({
  token: null,
  client: null,
  setAuthData: (token: any, client: any) => set({ token, client }),
  clearAuthData: () => set({ token: null, client: null }),
}));
