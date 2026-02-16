import { ReactNode, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAppRole } from '../../hooks/useAppRole';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import RoleNav from '../navigation/RoleNav';
import UserIdentityBadge from '../user/UserIdentityBadge';
import BecomeAdminButton from '../auth/BecomeAdminButton';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const { identity } = useInternetIdentity();
  const { role, setRole, clearRole } = useAppRole();
  const { data: isBackendAdmin, isLoading: adminCheckLoading } = useIsCallerAdmin();
  
  const isLoginPage = location.pathname === '/login';
  const showNav = identity && role && !isLoginPage;

  // Sync app role with backend admin status
  useEffect(() => {
    if (!identity || adminCheckLoading) return;

    // If backend says user is admin but app role is not admin, upgrade to admin
    if (isBackendAdmin && role && role !== 'admin') {
      setRole('admin');
    }

    // If backend says user is NOT admin but app role is admin, downgrade
    if (isBackendAdmin === false && role === 'admin') {
      clearRole();
    }
  }, [isBackendAdmin, role, identity, adminCheckLoading, setRole, clearRole]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight">TPM Line Monitor</h1>
          </div>
          {identity && (
            <div className="flex items-center gap-3">
              <BecomeAdminButton />
              <UserIdentityBadge />
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      {showNav && <RoleNav />}

      {/* Main Content */}
      <main className="flex-1 container px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-6 mt-auto">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} TPM Line Monitor. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'tpm-line-monitor'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
