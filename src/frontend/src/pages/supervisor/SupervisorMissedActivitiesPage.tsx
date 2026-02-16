import { useState } from 'react';
import WireframeSection from '../../components/common/WireframeSection';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import StatusPill from '../../components/common/StatusPill';

export default function SupervisorMissedActivitiesPage() {
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const missedActivities = [
    { machine: 'Rolling Mill #2', operator: 'Mike Davis', activity: 'TPM Checklist', date: '2026-02-15' },
    { machine: 'Cutting Machine #1', operator: 'Sarah Johnson', activity: 'Lubrication', date: '2026-02-14' },
    { machine: 'Welding Station #1', operator: 'John Smith', activity: 'Inspection', date: '2026-02-14' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Missed Activities</h2>
        <p className="text-muted-foreground text-lg">Track incomplete TPM activities by line and date</p>
      </div>

      <WireframeSection title="Filters">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="line" className="text-base">Production Line</Label>
            <Select value={selectedLine} onValueChange={setSelectedLine}>
              <SelectTrigger id="line" className="h-12">
                <SelectValue placeholder="Select line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lines</SelectItem>
                <SelectItem value="a">Line A</SelectItem>
                <SelectItem value="b">Line B</SelectItem>
                <SelectItem value="c">Line C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-base">Date</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-12"
            />
          </div>
        </div>
      </WireframeSection>

      <WireframeSection title="Missed Activities List">
        <div className="space-y-3">
          {missedActivities.map((activity, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">{activity.machine}</p>
                    <p className="text-sm text-muted-foreground">Operator: {activity.operator}</p>
                    <p className="text-sm text-muted-foreground">Activity: {activity.activity}</p>
                    <p className="text-sm text-muted-foreground">Date: {activity.date}</p>
                  </div>
                  <StatusPill status="error" label="Missed" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </WireframeSection>
    </div>
  );
}
