import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusPill from '../../components/common/StatusPill';
import { Activity, AlertTriangle, ClipboardCheck, Wrench } from 'lucide-react';
import { DEMO_MACHINES } from '@/lib/demoData';

export default function SupervisorDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Supervisor Dashboard</h2>
        <p className="text-muted-foreground text-lg">Real-time overview of production line performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Machines Running</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12 / 15</div>
            <StatusPill status="success" label="Good" className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">OEE Summary</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <StatusPill status="warning" label="Fair" className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Availability: 85% | Performance: 90% | Quality: 95%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Breakdowns</CardTitle>
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <StatusPill status="warning" label="Attention" className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Maintenance</CardTitle>
            <Wrench className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <StatusPill status="idle" label="Scheduled" className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">TPM Compliance</CardTitle>
            <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <StatusPill status="success" label="Excellent" className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '10:45 AM', event: `${DEMO_MACHINES[1].name} - Breakdown reported`, status: 'error' as const },
              { time: '10:30 AM', event: 'Operator John completed TPM checklist', status: 'success' as const },
              { time: '09:15 AM', event: `${DEMO_MACHINES[2].name} - Maintenance completed`, status: 'success' as const },
              { time: '08:00 AM', event: 'Shift started - 15 machines operational', status: 'idle' as const },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{activity.event}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <StatusPill status={activity.status} label={activity.status === 'error' ? 'Alert' : activity.status === 'success' ? 'Done' : 'Info'} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
