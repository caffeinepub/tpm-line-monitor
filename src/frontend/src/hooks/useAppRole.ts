import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppRole = 'operator' | 'supervisor' | 'maintenance' | 'admin';

interface AppRoleState {
  currentRole: AppRole | null;
  setRole: (role: AppRole) => void;
  clearRole: () => void;
}

export const useAppRoleStore = create<AppRoleState>()(
  persist(
    (set) => ({
      currentRole: null,
      setRole: (role) => set({ currentRole: role }),
      clearRole: () => set({ currentRole: null }),
    }),
    {
      name: 'tpm-app-role',
    }
  )
);

export function useAppRole() {
  const { currentRole, setRole, clearRole } = useAppRoleStore();
  
  return {
    role: currentRole,
    setRole,
    clearRole,
    isOperator: currentRole === 'operator',
    isSupervisor: currentRole === 'supervisor',
    isMaintenance: currentRole === 'maintenance',
    isAdmin: currentRole === 'admin',
  };
}
