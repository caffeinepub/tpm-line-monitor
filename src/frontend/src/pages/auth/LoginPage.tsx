import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Factory } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { identity, login, isLoggingIn } = useInternetIdentity();

  useEffect(() => {
    if (identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Factory className="h-20 w-20 text-primary" />
          </div>
          <CardTitle className="text-3xl">TPM Line Monitor</CardTitle>
          <CardDescription className="text-base mt-2">
            Total Productive Maintenance tracking for steel processing plants
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="w-full text-lg h-16"
          >
            {isLoggingIn ? 'Signing in...' : 'Sign In'}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Secure authentication for operators, supervisors, maintenance technicians, and administrators
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
