import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Activity } from 'lucide-react';
import { DEMO_MACHINES } from '@/lib/demoData';

export default function OperatorHomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Operator Home</h2>
        <p className="text-muted-foreground text-lg">Select a machine to update status or complete TPM checklist</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => navigate({ to: '/operator/status' })}>
          <CardHeader>
            <Activity className="h-12 w-12 text-primary mb-2" />
            <CardTitle className="text-xl">Update Machine Status</CardTitle>
            <CardDescription>Record running, idle, or breakdown status</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => navigate({ to: '/operator/tpm' })}>
          <CardHeader>
            <ClipboardCheck className="h-12 w-12 text-primary mb-2" />
            <CardTitle className="text-xl">TPM Checklist</CardTitle>
            <CardDescription>Complete cleaning, lubrication, and inspection</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Machine</CardTitle>
          <CardDescription>Choose a machine to work with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {DEMO_MACHINES.map((machine) => (
              <Button
                key={machine.id}
                variant="outline"
                size="lg"
                className="h-auto p-4 justify-start text-left"
                onClick={() => navigate({ to: '/operator/status' })}
              >
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-lg">{machine.name}</span>
                  <span className="text-sm text-muted-foreground">{machine.line}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
