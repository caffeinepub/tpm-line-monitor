import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusType = 'success' | 'warning' | 'error' | 'idle';

interface StatusPillProps {
  status: StatusType;
  label: string;
  className?: string;
}

export default function StatusPill({ status, label, className }: StatusPillProps) {
  const statusClasses = {
    success: 'status-success',
    warning: 'status-warning',
    error: 'status-error',
    idle: 'bg-muted text-muted-foreground',
  };

  return (
    <Badge className={cn('text-sm font-semibold px-3 py-1', statusClasses[status], className)}>
      {label}
    </Badge>
  );
}
