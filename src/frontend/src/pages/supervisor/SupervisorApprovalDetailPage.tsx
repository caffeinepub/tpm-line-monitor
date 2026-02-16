import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import WireframeSection from '../../components/common/WireframeSection';
import PrimaryActionBar from '../../components/common/PrimaryActionBar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { DEMO_MACHINES, DEMO_TPM_SUBMISSION } from '@/lib/demoData';

export default function SupervisorApprovalDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/supervisor/approvals/$id' });
  const [remarks, setRemarks] = useState('');

  const handleApprove = () => {
    navigate({ to: '/supervisor/approvals' });
  };

  const handleReject = () => {
    navigate({ to: '/supervisor/approvals' });
  };

  // Group checklist items by category
  const groupedItems = DEMO_TPM_SUBMISSION.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof DEMO_TPM_SUBMISSION>);

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => navigate({ to: '/supervisor/approvals' })} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Approvals
      </Button>

      <h2 className="text-3xl font-bold mb-6">TPM Approval Detail</h2>

      <WireframeSection title="Submission Information">
        <div className="space-y-2">
          <p className="text-lg"><strong>Machine:</strong> {DEMO_MACHINES[0].name}</p>
          <p className="text-lg"><strong>Operator:</strong> John Smith</p>
          <p className="text-lg"><strong>Date:</strong> February 16, 2026</p>
          <p className="text-lg"><strong>Time:</strong> 10:30 AM</p>
        </div>
      </WireframeSection>

      {Object.entries(groupedItems).map(([category, items]) => (
        <WireframeSection key={category} title={`${category} Checklist`}>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="space-y-1 pb-3 border-b last:border-b-0">
                <div className="flex items-start space-x-3">
                  <Checkbox id={item.id} checked={item.checked} disabled className="h-5 w-5 mt-0.5" />
                  <Label htmlFor={item.id} className="text-base leading-relaxed">
                    {item.label}
                  </Label>
                </div>
                {item.remark && (
                  <div className="ml-8 text-sm text-muted-foreground bg-muted px-3 py-2 rounded">
                    <span className="font-medium">Remark:</span> {item.remark}
                  </div>
                )}
              </div>
            ))}
          </div>
        </WireframeSection>
      ))}

      <WireframeSection title="Photo Proof">
        <div className="bg-muted rounded-lg p-8 text-center">
          <p className="text-muted-foreground">Photo preview placeholder</p>
          <p className="text-sm text-muted-foreground mt-2">(No photo attached)</p>
        </div>
      </WireframeSection>

      <WireframeSection title="Supervisor Remarks (Optional)">
        <div className="space-y-2">
          <Label htmlFor="remarks" className="text-base">Add your remarks</Label>
          <Textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter any comments or feedback..."
            className="min-h-[100px] text-base"
          />
        </div>
      </WireframeSection>

      <PrimaryActionBar>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleReject}
            variant="destructive"
            size="lg"
            className="h-14 text-lg gap-2"
          >
            <XCircle className="h-5 w-5" />
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            size="lg"
            className="h-14 text-lg gap-2"
          >
            <CheckCircle className="h-5 w-5" />
            Approve
          </Button>
        </div>
      </PrimaryActionBar>
    </div>
  );
}
