import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusPill from '../../components/common/StatusPill';
import { ChevronRight } from 'lucide-react';

export default function MaintenanceJobsListPage() {
  const navigate = useNavigate();

  const jobs = [
    {
      id: '1',
      machine: 'Rolling Mill #2',
      line: 'Line A',
      status: 'open' as const,
      reportedTime: '2026-02-16 10:45 AM',
      assignedTo: 'Tech Team A',
    },
    {
      id: '2',
      machine: 'Cutting Machine #1',
      line: 'Line B',
      status: 'in-progress' as const,
      reportedTime: '2026-02-16 08:30 AM',
      assignedTo: 'Tech Team B',
    },
    {
      id: '3',
      machine: 'Welding Station #1',
      line: 'Line C',
      status: 'open' as const,
      reportedTime: '2026-02-15 04:15 PM',
      assignedTo: 'Tech Team A',
    },
  ];

  const getStatusPill = (status: string) => {
    switch (status) {
      case 'open':
        return <StatusPill status="error" label="Open" />;
      case 'in-progress':
        return <StatusPill status="warning" label="In Progress" />;
      case 'closed':
        return <StatusPill status="success" label="Closed" />;
      default:
        return <StatusPill status="idle" label="Unknown" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Breakdown Jobs</h2>
        <p className="text-muted-foreground text-lg">Manage and track maintenance breakdown jobs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => navigate({ to: `/maintenance/job/${job.id}` })}
              >
                <div className="flex-1">
                  <p className="font-semibold text-lg">{job.machine}</p>
                  <p className="text-sm text-muted-foreground">Line: {job.line}</p>
                  <p className="text-sm text-muted-foreground">Reported: {job.reportedTime}</p>
                  <p className="text-sm text-muted-foreground">Assigned to: {job.assignedTo}</p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusPill(job.status)}
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
