import { useNavigate } from '@tanstack/react-router';
import { useAppRole } from '../../hooks/useAppRole';
import { getRoutesForRole } from '../../routes/appRoutes';
import { Button } from '@/components/ui/button';

export default function RoleNav() {
  const navigate = useNavigate();
  const { role } = useAppRole();
  const routes = getRoutesForRole(role);

  if (!role || routes.length === 0) return null;

  return (
    <nav className="border-b bg-card">
      <div className="container px-4">
        <div className="flex gap-2 overflow-x-auto py-3">
          {routes.map((route) => (
            <Button
              key={route.path}
              variant="ghost"
              size="lg"
              onClick={() => navigate({ to: route.path })}
              className="whitespace-nowrap min-w-[120px] text-base"
            >
              {route.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
