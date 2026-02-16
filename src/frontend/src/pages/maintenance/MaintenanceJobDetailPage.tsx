import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import WireframeSection from '../../components/common/WireframeSection';
import PrimaryActionBar from '../../components/common/PrimaryActionBar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function MaintenanceJobDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/maintenance/job/$id' });
  const [progress, setProgress] = useState('');
  const [repairTime, setRepairTime] = useState('');
  const [rootCause, setRootCause] = useState('');

  const handleCloseJob = () => {
    navigate({ to: '/maintenance' });
  };

  const canClose = progress && repairTime && rootCause;

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => navigate({ to: '/maintenance' })} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      <h2 className="text-3xl font-bold mb-6">Breakdown Job Detail</h2>

      <WireframeSection title="Job Information">
        <div className="space-y-2">
          <p className="text-lg"><strong>Machine:</strong> Rolling Mill #2</p>
          <p className="text-lg"><strong>Line:</strong> Line A</p>
          <p className="text-lg"><strong>Reported:</strong> February 16, 2026 at 10:45 AM</p>
          <p className="text-lg"><strong>Assigned to:</strong> Tech Team A</p>
          <p className="text-lg"><strong>Status:</strong> Open</p>
        </div>
      </WireframeSection>

      <WireframeSection title="Issue Description">
        <p className="text-base">
          Machine stopped unexpectedly during operation. Unusual grinding noise reported before shutdown.
          Operator noted vibration in main roller assembly.
        </p>
      </WireframeSection>

      <WireframeSection title="Update Progress">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="progress" className="text-base font-semibold">Progress Status</Label>
            <Select value={progress} onValueChange={setProgress}>
              <SelectTrigger id="progress" className="h-12 text-base">
                <SelectValue placeholder="Select progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="investigating" className="text-base">Investigating</SelectItem>
                <SelectItem value="parts-ordered" className="text-base">Parts Ordered</SelectItem>
                <SelectItem value="repairing" className="text-base">Repairing</SelectItem>
                <SelectItem value="testing" className="text-base">Testing</SelectItem>
                <SelectItem value="completed" className="text-base">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="repairTime" className="text-base font-semibold">Repair Time (minutes)</Label>
            <Input
              id="repairTime"
              type="number"
              value={repairTime}
              onChange={(e) => setRepairTime(e.target.value)}
              placeholder="Enter repair duration"
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rootCause" className="text-base font-semibold">Root Cause</Label>
            <Textarea
              id="rootCause"
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              placeholder="Describe the root cause of the breakdown..."
              className="min-h-[120px] text-base"
            />
          </div>
        </div>
      </WireframeSection>

      <PrimaryActionBar>
        <Button
          onClick={handleCloseJob}
          disabled={!canClose}
          size="lg"
          className="w-full h-14 text-lg"
        >
          Close Job
        </Button>
      </PrimaryActionBar>
    </div>
  );
}
