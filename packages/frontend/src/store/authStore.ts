// packages/frontend/src/store/authStore.ts
import { create } from 'zustand'

interface AuthState {
  isAuthModalOpen: boolean
  authMode: 'login' | 'signup'
  token: string | null
  rememberMe: boolean

  setAuthModalOpen: (b: boolean) => void
  setAuthMode: (m: 'login' | 'signup') => void
  setToken: (t: string | null) => void
  setRememberMe: (b: boolean) => void
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthModalOpen: false,
  authMode: 'login',
  token: null,
  rememberMe: false,

  setAuthModalOpen: b => set({ isAuthModalOpen: b }),
  setAuthMode: m => set({ authMode: m }),
  setToken: t => set({ token: t }),
  setRememberMe: b => set({ rememberMe: b }),
}))
