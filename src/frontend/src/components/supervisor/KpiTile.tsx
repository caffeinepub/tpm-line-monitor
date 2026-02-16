import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusPill, { StatusType } from '../common/StatusPill';
import { LucideIcon } from 'lucide-react';

interface KpiTileProps {
  title: string;
  value: string;
  status: StatusType;
  statusLabel: string;
  icon?: LucideIcon;
  subtitle?: string;
}

export default function KpiTile({ title, value, status, statusLabel, icon: Icon, subtitle }: KpiTileProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <StatusPill status={status} label={statusLabel} className="mt-2" />
        {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
