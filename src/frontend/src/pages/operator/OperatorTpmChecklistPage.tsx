import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import WireframeSection from '../../components/common/WireframeSection';
import PrimaryActionBar from '../../components/common/PrimaryActionBar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Camera } from 'lucide-react';
import { DEMO_MACHINES, TPM_CHECKLIST_ITEMS, TpmChecklistItem } from '@/lib/demoData';

interface ChecklistItemState extends TpmChecklistItem {
  checked: boolean;
  remark: string;
}

export default function OperatorTpmChecklistPage() {
  const navigate = useNavigate();
  
  // Initialize checklist state with all items
  const [checklistItems, setChecklistItems] = useState<ChecklistItemState[]>(
    TPM_CHECKLIST_ITEMS.map(item => ({
      ...item,
      checked: false,
      remark: '',
    }))
  );

  const toggleItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const updateRemark = (id: string, remark: string) => {
    setChecklistItems(items =>
      items.map(item => (item.id === id ? { ...item, remark } : item))
    );
  };

  const allChecked = checklistItems.every(item => item.checked);

  const handleComplete = () => {
    navigate({ to: '/operator/tpm/confirm' });
  };

  // Group items by category for organized display
  const groupedItems = checklistItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItemState[]>);

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => navigate({ to: '/operator' })} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <h2 className="text-3xl font-bold mb-6">TPM Checklist</h2>

      <WireframeSection title="Machine Information">
        <div className="space-y-2">
          <p className="text-lg"><strong>Machine:</strong> {DEMO_MACHINES[0].name}</p>
          <p className="text-lg"><strong>Line:</strong> {DEMO_MACHINES[0].line}</p>
        </div>
      </WireframeSection>

      {Object.entries(groupedItems).map(([category, items]) => (
        <WireframeSection key={category} title={category}>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="space-y-2 pb-3 border-b last:border-b-0">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="h-6 w-6 mt-0.5"
                  />
                  <div className="flex-1">
                    <Label htmlFor={item.id} className="text-base cursor-pointer leading-relaxed">
                      {item.label}
                    </Label>
                  </div>
                </div>
                <div className="ml-9">
                  <Input
                    value={item.remark}
                    onChange={(e) => updateRemark(item.id, e.target.value)}
                    placeholder="Add remark (optional)"
                    className="text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </WireframeSection>
      ))}

      <WireframeSection title="Photo Proof (Optional)">
        <Button variant="outline" size="lg" className="w-full h-14 gap-2">
          <Camera className="h-5 w-5" />
          Attach Photo
        </Button>
        <p className="text-sm text-muted-foreground mt-2">Upload a photo of completed work (optional)</p>
      </WireframeSection>

      <PrimaryActionBar>
        <Button
          onClick={handleComplete}
          disabled={!allChecked}
          size="lg"
          className="w-full h-14 text-lg"
        >
          Complete TPM Checklist
        </Button>
      </PrimaryActionBar>
    </div>
  );
}
