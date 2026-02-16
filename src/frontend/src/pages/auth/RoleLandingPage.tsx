import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAppRole, AppRole } from '../../hooks/useAppRole';
import { useGetCallerUserProfile, useSaveCallerUserProfile, useIsCallerAdmin } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Wrench, ClipboardCheck, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function RoleLandingPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { role, setRole } = useAppRole();
  const { data: profile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: isBackendAdmin, isLoading: adminCheckLoading } = useIsCallerAdmin();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState('');

  const showProfileSetup = identity && !profileLoading && isFetched && profile === null;
  const showRoleSelection = identity && profile !== null && !role;

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/login' });
      return;
    }

    if (role) {
      const roleRoutes: Record<AppRole, string> = {
        operator: '/operator',
        supervisor: '/supervisor',
        maintenance: '/maintenance',
        admin: '/admin/users',
      };
      navigate({ to: roleRoutes[role] });
    }
  }, [identity, role, navigate]);

  const handleSaveProfile = async () => {
    if (!name.trim()) return;
    await saveProfile.mutateAsync({ name: name.trim() });
  };

  const handleSelectRole = (selectedRole: AppRole) => {
    // Only allow selecting admin if backend confirms admin status
    if (selectedRole === 'admin' && !isBackendAdmin) {
      return;
    }
    setRole(selectedRole);
  };

  if (profileLoading || !isFetched) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading profile...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showProfileSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome!</CardTitle>
            <CardDescription>Please enter your name to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="h-12 text-base"
              />
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={!name.trim() || saveProfile.isPending}
              size="lg"
              className="w-full h-12"
            >
              {saveProfile.isPending ? 'Saving...' : 'Continue'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showRoleSelection) {
    const roles: Array<{ 
      value: AppRole; 
      label: string; 
      icon: typeof User; 
      description: string;
      requiresAdmin?: boolean;
    }> = [
      {
        value: 'operator',
        label: 'Operator',
        icon: User,
        description: 'Update machine status and complete TPM checklists',
      },
      {
        value: 'supervisor',
        label: 'Supervisor',
        icon: ClipboardCheck,
        description: 'Monitor dashboard, approve activities, and view reports',
      },
      {
        value: 'maintenance',
        label: 'Maintenance Technician',
        icon: Wrench,
        description: 'Handle breakdown jobs and maintenance tasks',
      },
      {
        value: 'admin',
        label: 'Administrator',
        icon: Shield,
        description: 'Manage users, machines, and maintenance schedules',
        requiresAdmin: true,
      },
    ];

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Select Your Role</CardTitle>
            <CardDescription>Choose your role to access the appropriate features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!adminCheckLoading && !isBackendAdmin && (
              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Note:</strong> Administrator role is restricted. Use the "Become Admin" button
                  in the header to gain admin access if you have the required credentials.
                </AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((roleOption) => {
                const Icon = roleOption.icon;
                const isDisabled = roleOption.requiresAdmin && !isBackendAdmin;
                return (
                  <Button
                    key={roleOption.value}
                    variant="outline"
                    onClick={() => handleSelectRole(roleOption.value)}
                    disabled={isDisabled || adminCheckLoading}
                    className="h-auto p-6 flex flex-col items-start gap-3 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold text-lg flex items-center gap-2">
                        {roleOption.label}
                        {isDisabled && (
                          <span className="text-xs font-normal text-muted-foreground">(Restricted)</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground font-normal">
                        {roleOption.description}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
