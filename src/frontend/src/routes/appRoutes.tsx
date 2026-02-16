import { AppRole } from '../hooks/useAppRole';

export interface RouteConfig {
  path: string;
  label: string;
  roles: AppRole[];
  icon?: string;
}

export const routes: RouteConfig[] = [
  // Operator routes
  {
    path: '/operator',
    label: 'Home',
    roles: ['operator'],
  },
  {
    path: '/operator/status',
    label: 'Update Status',
    roles: ['operator'],
  },
  {
    path: '/operator/tpm',
    label: 'TPM Checklist',
    roles: ['operator'],
  },
  // Supervisor routes
  {
    path: '/supervisor',
    label: 'Dashboard',
    roles: ['supervisor'],
  },
  {
    path: '/supervisor/approvals',
    label: 'Approvals',
    roles: ['supervisor'],
  },
  {
    path: '/supervisor/missed',
    label: 'Missed Activities',
    roles: ['supervisor'],
  },
  {
    path: '/supervisor/reports',
    label: 'Reports',
    roles: ['supervisor'],
  },
  // Maintenance routes
  {
    path: '/maintenance',
    label: 'Breakdown Jobs',
    roles: ['maintenance'],
  },
  // Admin routes
  {
    path: '/admin/users',
    label: 'Users',
    roles: ['admin'],
  },
  {
    path: '/admin/machines',
    label: 'Machines',
    roles: ['admin'],
  },
  {
    path: '/admin/maintenance',
    label: 'Planned Maintenance',
    roles: ['admin'],
  },
];

export function getRoutesForRole(role: AppRole | null): RouteConfig[] {
  if (!role) return [];
  return routes.filter((route) => route.roles.includes(role));
}
