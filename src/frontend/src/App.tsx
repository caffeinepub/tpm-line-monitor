import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/layout/AppShell';
import AuthGate from './components/auth/AuthGate';
import LoginPage from './pages/auth/LoginPage';
import RoleLandingPage from './pages/auth/RoleLandingPage';
import OperatorHomePage from './pages/operator/OperatorHomePage';
import OperatorStatusUpdatePage from './pages/operator/OperatorStatusUpdatePage';
import OperatorStatusConfirmationPage from './pages/operator/OperatorStatusConfirmationPage';
import OperatorTpmChecklistPage from './pages/operator/OperatorTpmChecklistPage';
import OperatorTpmConfirmationPage from './pages/operator/OperatorTpmConfirmationPage';
import SupervisorDashboardPage from './pages/supervisor/SupervisorDashboardPage';
import SupervisorApprovalsListPage from './pages/supervisor/SupervisorApprovalsListPage';
import SupervisorApprovalDetailPage from './pages/supervisor/SupervisorApprovalDetailPage';
import SupervisorMissedActivitiesPage from './pages/supervisor/SupervisorMissedActivitiesPage';
import SupervisorReportsPage from './pages/supervisor/SupervisorReportsPage';
import MaintenanceJobsListPage from './pages/maintenance/MaintenanceJobsListPage';
import MaintenanceJobDetailPage from './pages/maintenance/MaintenanceJobDetailPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminMachinesPage from './pages/admin/AdminMachinesPage';
import AdminPlannedMaintenancePage from './pages/admin/AdminPlannedMaintenancePage';

const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: RoleLandingPage,
});

const operatorHomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operator',
  component: OperatorHomePage,
});

const operatorStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operator/status',
  component: OperatorStatusUpdatePage,
});

const operatorStatusConfirmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operator/status/confirm',
  component: OperatorStatusConfirmationPage,
});

const operatorTpmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operator/tpm',
  component: OperatorTpmChecklistPage,
});

const operatorTpmConfirmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/operator/tpm/confirm',
  component: OperatorTpmConfirmationPage,
});

const supervisorDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/supervisor',
  component: SupervisorDashboardPage,
});

const supervisorApprovalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/supervisor/approvals',
  component: SupervisorApprovalsListPage,
});

const supervisorApprovalDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/supervisor/approvals/$id',
  component: SupervisorApprovalDetailPage,
});

const supervisorMissedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/supervisor/missed',
  component: SupervisorMissedActivitiesPage,
});

const supervisorReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/supervisor/reports',
  component: SupervisorReportsPage,
});

const maintenanceJobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/maintenance',
  component: MaintenanceJobsListPage,
});

const maintenanceJobDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/maintenance/job/$id',
  component: MaintenanceJobDetailPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/users',
  component: AdminUsersPage,
});

const adminMachinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/machines',
  component: AdminMachinesPage,
});

const adminMaintenanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/maintenance',
  component: AdminPlannedMaintenancePage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  indexRoute,
  operatorHomeRoute,
  operatorStatusRoute,
  operatorStatusConfirmRoute,
  operatorTpmRoute,
  operatorTpmConfirmRoute,
  supervisorDashboardRoute,
  supervisorApprovalsRoute,
  supervisorApprovalDetailRoute,
  supervisorMissedRoute,
  supervisorReportsRoute,
  maintenanceJobsRoute,
  maintenanceJobDetailRoute,
  adminUsersRoute,
  adminMachinesRoute,
  adminMaintenanceRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthGate>
        <RouterProvider router={router} />
      </AuthGate>
      <Toaster />
    </ThemeProvider>
  );
}
