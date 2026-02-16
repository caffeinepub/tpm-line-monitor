import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OperatorTpmConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[60vh]">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-20 w-20 text-success" />
          </div>
          <CardTitle className="text-3xl">TPM Checklist Completed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-lg text-muted-foreground">
            Your TPM activities have been recorded and submitted for supervisor review.
          </p>
          <Button
            onClick={() => navigate({ to: '/operator' })}
            size="lg"
            className="w-full h-14 text-lg"
          >
            Done
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
