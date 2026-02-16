import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAppRole } from '../../hooks/useAppRole';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, User } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export default function UserIdentityBadge() {
  const { clear, identity } = useInternetIdentity();
  const { role, clearRole } = useAppRole();
  const { data: profile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    clearRole();
    queryClient.clear();
  };

  if (!identity) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-muted-foreground" />
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">
            {profile?.name || 'User'}
          </span>
          {role && (
            <Badge variant="secondary" className="text-xs capitalize">
              {role}
            </Badge>
          )}
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="gap-2"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
