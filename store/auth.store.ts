import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserDto } from './user.store';

type AuthState = {
  user: UserDto | null;
  token: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  setAuth: (user: UserDto, token: string) => void;
  clearAuth: () => void;
  updateUser: (partial: Partial<UserDto>) => void;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    set => ({
      ...initialState,

      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),

      clearAuth: () => set(initialState),

      updateUser: partial =>
        set(state => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
