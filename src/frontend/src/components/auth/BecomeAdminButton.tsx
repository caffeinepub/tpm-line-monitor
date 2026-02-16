import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { useAppRole } from '../../hooks/useAppRole';
import { Button } from '@/components/ui/button';
import { Shield, ExternalLink, Copy, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function BecomeAdminButton() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading } = useIsCallerAdmin();
  const { setRole } = useAppRole();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const adminUrl = `${currentUrl}/?caffeineAdminToken=your-secret-token-here`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(adminUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBecomeAdmin = () => {
    if (isAdmin) {
      setRole('admin');
      navigate({ to: '/admin/users' });
      setDialogOpen(false);
    }
  };

  if (isLoading) {
    return null;
  }

  // If already admin in backend, show quick access button
  if (isAdmin) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleBecomeAdmin}
        className="gap-2"
      >
        <Shield className="h-4 w-4" />
        Access Admin
      </Button>
    );
  }

  // If not admin, show dialog with instructions
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Shield className="h-4 w-4" />
          Become Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Become Administrator
          </DialogTitle>
          <DialogDescription>
            To become an administrator, you need to use a special admin token URL parameter.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              <strong>How it works:</strong> The first time you visit the app with the admin token parameter,
              you'll be automatically granted admin privileges. This is a one-time setup process.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <label className="text-sm font-medium">Step 1: Copy this URL template</label>
            <div className="flex gap-2">
              <code className="flex-1 p-3 bg-muted rounded text-xs break-all">
                {adminUrl}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyUrl}
                className="shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Step 2: Replace the token</label>
            <p className="text-sm text-muted-foreground">
              Replace <code className="bg-muted px-1 py-0.5 rounded">your-secret-token-here</code> with
              your actual admin token. This token should be kept secure and not shared.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Step 3: Visit the URL</label>
            <p className="text-sm text-muted-foreground">
              Open the modified URL in your browser. You'll be automatically granted admin privileges
              and can then access all admin features.
            </p>
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              <strong>Note:</strong> If you don't have an admin token, you'll need to obtain it from
              your deployment configuration or system administrator. The token is set during canister deployment.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Reload Page
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
