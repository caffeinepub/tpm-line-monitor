import { useState } from 'react';
import WireframeSection from '../../components/common/WireframeSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CheckCircle } from 'lucide-react';
import StatusPill from '../../components/common/StatusPill';

export default function AdminPlannedMaintenancePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [machine, setMachine] = useState('');
  const [frequency, setFrequency] = useState('');
  const [remarks, setRemarks] = useState('');

  const schedules = [
    { id: '1', machine: 'Rolling Mill #1', frequency: 'Daily', nextDue: '2026-02-17', status: 'pending' as const },
    { id: '2', machine: 'Cutting Machine #1', frequency: 'Weekly', nextDue: '2026-02-20', status: 'pending' as const },
    { id: '3', machine: 'Welding Station #1', frequency: 'Monthly', nextDue: '2026-03-01', status: 'completed' as const },
  ];

  const handleSaveSchedule = () => {
    setIsDialogOpen(false);
    setMachine('');
    setFrequency('');
  };

  const handleMarkComplete = (id: string) => {
    console.log('Marking complete:', id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Planned Maintenance</h2>
          <p className="text-muted-foreground text-lg">Schedule and track preventive maintenance activities</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Maintenance Schedule</DialogTitle>
              <DialogDescription>Create a new planned maintenance schedule</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="machine">Machine</Label>
                <Select value={machine} onValueChange={setMachine}>
                  <SelectTrigger id="machine">
                    <SelectValue placeholder="Select machine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Rolling Mill #1</SelectItem>
                    <SelectItem value="2">Rolling Mill #2</SelectItem>
                    <SelectItem value="3">Cutting Machine #1</SelectItem>
                    <SelectItem value="4">Welding Station #1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Frequency</Label>
                <RadioGroup value={frequency} onValueChange={setFrequency}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="cursor-pointer">Daily</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="cursor-pointer">Weekly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="cursor-pointer">Monthly</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleSaveSchedule} className="w-full">Save Schedule</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <WireframeSection title="Maintenance Schedules">
        <div className="space-y-3">
          {schedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{schedule.machine}</p>
                    <p className="text-sm text-muted-foreground">Frequency: {schedule.frequency}</p>
                    <p className="text-sm text-muted-foreground">Next Due: {schedule.nextDue}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill
                      status={schedule.status === 'completed' ? 'success' : 'warning'}
                      label={schedule.status === 'completed' ? 'Completed' : 'Pending'}
                    />
                    {schedule.status === 'pending' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Complete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Mark Maintenance Complete</DialogTitle>
                            <DialogDescription>Add remarks about the completed maintenance</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="remarks">Remarks</Label>
                              <Textarea
                                id="remarks"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Enter maintenance notes..."
                                className="min-h-[100px]"
                              />
                            </div>
                            <Button onClick={() => handleMarkComplete(schedule.id)} className="w-full">
                              Mark Complete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </WireframeSection>
    </div>
  );
}
