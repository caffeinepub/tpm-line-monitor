import { useState } from 'react';
import WireframeSection from '../../components/common/WireframeSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil } from 'lucide-react';
import StatusPill from '../../components/common/StatusPill';
import { DEMO_MACHINES } from '@/lib/demoData';

export default function AdminMachinesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [machineName, setMachineName] = useState('');
  const [machineLine, setMachineLine] = useState('');

  const machines = [
    { id: '1', name: DEMO_MACHINES[0].name, line: DEMO_MACHINES[0].line, status: 'running' as const },
    { id: '2', name: DEMO_MACHINES[1].name, line: DEMO_MACHINES[1].line, status: 'breakdown' as const },
    { id: '3', name: DEMO_MACHINES[2].name, line: DEMO_MACHINES[2].line, status: 'running' as const },
    { id: '4', name: DEMO_MACHINES[3].name, line: DEMO_MACHINES[3].line, status: 'idle' as const },
  ];

  const handleSaveMachine = () => {
    setIsDialogOpen(false);
    setMachineName('');
    setMachineLine('');
  };

  const getStatusPill = (status: string) => {
    switch (status) {
      case 'running':
        return <StatusPill status="success" label="Running" />;
      case 'idle':
        return <StatusPill status="warning" label="Idle" />;
      case 'breakdown':
        return <StatusPill status="error" label="Breakdown" />;
      default:
        return <StatusPill status="idle" label="Unknown" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Machine Management</h2>
          <p className="text-muted-foreground text-lg">Manage production machines and lines</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Machine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Machine</DialogTitle>
              <DialogDescription>Register a new machine in the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="machineName">Machine Name</Label>
                <Input
                  id="machineName"
                  value={machineName}
                  onChange={(e) => setMachineName(e.target.value)}
                  placeholder="Enter machine name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="machineLine">Production Line</Label>
                <Select value={machineLine} onValueChange={setMachineLine}>
                  <SelectTrigger id="machineLine">
                    <SelectValue placeholder="Select line" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Line A</SelectItem>
                    <SelectItem value="b">Line B</SelectItem>
                    <SelectItem value="c">Line C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveMachine} className="w-full">Save Machine</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <WireframeSection title="Machines List">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Machine Name</TableHead>
              <TableHead>Production Line</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {machines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell className="font-medium">{machine.name}</TableCell>
                <TableCell>{machine.line}</TableCell>
                <TableCell>{getStatusPill(machine.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WireframeSection>
    </div>
  );
}
