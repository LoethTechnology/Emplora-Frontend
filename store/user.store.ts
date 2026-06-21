import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserDto = {
  id: string;
  email: string;
  email_verified_at: string | null;
  first_name: string;
  last_name: string;
  linkedin_profile_url: string | null;
  created_at: string;
  updated_at: string;
};

type UserState = {
  user: UserDto | null;
};

type UserActions = {
  setUser: (user: UserDto) => void;
  clearUser: () => void;
  updateUser: (partial: Partial<UserDto>) => void;
};

const initialState: UserState = {
  user: null,
};

export const useUserStore = create<UserState & UserActions>()(
  persist(
    set => ({
      ...initialState,
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
      updateUser: partial =>
        set(state => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ user: state.user }),
    }
  )
);
