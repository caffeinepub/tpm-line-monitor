import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import WireframeSection from '../../components/common/WireframeSection';
import PrimaryActionBar from '../../components/common/PrimaryActionBar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { DEMO_MACHINES } from '@/lib/demoData';

type MachineStatus = 'running' | 'idle' | 'breakdown' | '';

export default function OperatorStatusUpdatePage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<MachineStatus>('');
  const [startTime, setStartTime] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [downtimeReason, setDowntimeReason] = useState('');
  const [downtimeDuration, setDowntimeDuration] = useState('');

  useEffect(() => {
    if (startTime && stopTime) {
      const start = new Date(`2000-01-01T${startTime}`);
      const stop = new Date(`2000-01-01T${stopTime}`);
      const diffMs = stop.getTime() - start.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      setDowntimeDuration(diffMins > 0 ? `${diffMins} minutes` : '0 minutes');
    } else {
      setDowntimeDuration('');
    }
  }, [startTime, stopTime]);

  const handleSubmit = () => {
    navigate({ to: '/operator/status/confirm' });
  };

  const canSubmit = status && startTime && (status !== 'breakdown' || (stopTime && downtimeReason));

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => navigate({ to: '/operator' })} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <h2 className="text-3xl font-bold mb-6">Update Machine Status</h2>

      <WireframeSection title="Machine Information">
        <div className="space-y-2">
          <p className="text-lg"><strong>Machine:</strong> {DEMO_MACHINES[0].name}</p>
          <p className="text-lg"><strong>Line:</strong> {DEMO_MACHINES[0].line}</p>
        </div>
      </WireframeSection>

      <WireframeSection title="Status Details">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-base font-semibold">Machine Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as MachineStatus)}>
              <SelectTrigger id="status" className="h-14 text-lg">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="running" className="text-lg py-3">Running</SelectItem>
                <SelectItem value="idle" className="text-lg py-3">Idle</SelectItem>
                <SelectItem value="breakdown" className="text-lg py-3">Breakdown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime" className="text-base font-semibold">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="h-14 text-lg"
            />
          </div>

          {status === 'breakdown' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="stopTime" className="text-base font-semibold">Stop Time</Label>
                <Input
                  id="stopTime"
                  type="time"
                  value={stopTime}
                  onChange={(e) => setStopTime(e.target.value)}
                  className="h-14 text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-base font-semibold">Downtime Reason</Label>
                <Select value={downtimeReason} onValueChange={setDowntimeReason}>
                  <SelectTrigger id="reason" className="h-14 text-lg">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mechanical" className="text-lg py-3">Mechanical Failure</SelectItem>
                    <SelectItem value="electrical" className="text-lg py-3">Electrical Issue</SelectItem>
                    <SelectItem value="material" className="text-lg py-3">Material Shortage</SelectItem>
                    <SelectItem value="quality" className="text-lg py-3">Quality Issue</SelectItem>
                    <SelectItem value="other" className="text-lg py-3">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {downtimeDuration && (
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-base font-semibold">Downtime Duration</Label>
                  <p className="text-2xl font-bold text-primary mt-2">{downtimeDuration}</p>
                </div>
              )}
            </>
          )}
        </div>
      </WireframeSection>

      <PrimaryActionBar>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          size="lg"
          className="w-full h-14 text-lg"
        >
          Submit Status Update
        </Button>
      </PrimaryActionBar>
    </div>
  );
}
