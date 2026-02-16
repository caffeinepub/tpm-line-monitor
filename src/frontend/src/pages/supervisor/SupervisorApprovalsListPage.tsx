import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusPill from '../../components/common/StatusPill';
import { ChevronRight } from 'lucide-react';
import { DEMO_MACHINES } from '@/lib/demoData';

export default function SupervisorApprovalsListPage() {
  const navigate = useNavigate();

  const approvals = [
    { id: '1', operator: 'John Smith', machine: DEMO_MACHINES[0].name, date: '2026-02-16', time: '10:30 AM', status: 'pending' as const },
    { id: '2', operator: 'Sarah Johnson', machine: DEMO_MACHINES[2].name, date: '2026-02-16', time: '09:15 AM', status: 'pending' as const },
    { id: '3', operator: 'Mike Davis', machine: DEMO_MACHINES[3].name, date: '2026-02-16', time: '08:45 AM', status: 'pending' as const },
    { id: '4', operator: 'Lisa Brown', machine: DEMO_MACHINES[1].name, date: '2026-02-15', time: '04:30 PM', status: 'approved' as const },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">TPM Approvals</h2>
        <p className="text-muted-foreground text-lg">Review and approve operator TPM submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {approvals.map((approval) => (
              <div
                key={approval.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => navigate({ to: `/supervisor/approvals/${approval.id}` })}
              >
                <div className="flex-1">
                  <p className="font-semibold text-lg">{approval.machine}</p>
                  <p className="text-sm text-muted-foreground">
                    Operator: {approval.operator} • {approval.date} at {approval.time}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill
                    status={approval.status === 'pending' ? 'warning' : 'success'}
                    label={approval.status === 'pending' ? 'Pending' : 'Approved'}
                  />
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
