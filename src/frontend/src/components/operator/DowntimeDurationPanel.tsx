import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface DowntimeDurationPanelProps {
  duration: string;
}

export default function DowntimeDurationPanel({ duration }: DowntimeDurationPanelProps) {
  if (!duration) return null;

  return (
    <Card className="bg-muted">
      <CardContent className="p-4">
        <Label className="text-base font-semibold">Downtime Duration</Label>
        <p className="text-2xl font-bold text-primary mt-2">{duration}</p>
      </CardContent>
    </Card>
  );
}
