// Demo data for TPM Line Monitor application
// Single source of truth for machine names and checklist items

export interface DemoMachine {
  id: string;
  name: string;
  line: string;
}

export interface TpmChecklistItem {
  id: string;
  category: string;
  label: string;
}

export interface TpmChecklistItemWithRemark extends TpmChecklistItem {
  checked: boolean;
  remark?: string;
}

// Four production machines as specified
export const DEMO_MACHINES: DemoMachine[] = [
  { id: '1', name: 'HR CTL 800', line: 'Line A' },
  { id: '2', name: 'NWCTL', line: 'Line A' },
  { id: '3', name: 'Stretch Leveller', line: 'Line B' },
  { id: '4', name: 'HR Slitting', line: 'Line C' },
];

// Expanded TPM checklist with more items across categories
export const TPM_CHECKLIST_ITEMS: TpmChecklistItem[] = [
  // Cleaning (6 items)
  { id: 'c1', category: 'Cleaning', label: 'Clean machine exterior surfaces' },
  { id: 'c2', category: 'Cleaning', label: 'Remove debris and scrap from work area' },
  { id: 'c3', category: 'Cleaning', label: 'Clean control panel and display screens' },
  { id: 'c4', category: 'Cleaning', label: 'Clean safety guards and covers' },
  { id: 'c5', category: 'Cleaning', label: 'Wipe down emergency stop buttons' },
  { id: 'c6', category: 'Cleaning', label: 'Clean floor around machine base' },
  
  // Lubrication (5 items)
  { id: 'l1', category: 'Lubrication', label: 'Lubricate all moving parts and joints' },
  { id: 'l2', category: 'Lubrication', label: 'Check and top up oil levels' },
  { id: 'l3', category: 'Lubrication', label: 'Grease bearings and bushings' },
  { id: 'l4', category: 'Lubrication', label: 'Check hydraulic fluid levels' },
  { id: 'l5', category: 'Lubrication', label: 'Inspect lubrication points for blockages' },
  
  // Inspection (7 items)
  { id: 'i1', category: 'Inspection', label: 'Check for unusual sounds or vibrations' },
  { id: 'i2', category: 'Inspection', label: 'Inspect for oil or fluid leaks' },
  { id: 'i3', category: 'Inspection', label: 'Verify all safety guards are secure' },
  { id: 'i4', category: 'Inspection', label: 'Check belt tension and condition' },
  { id: 'i5', category: 'Inspection', label: 'Inspect electrical connections and cables' },
  { id: 'i6', category: 'Inspection', label: 'Verify emergency stop functionality' },
  { id: 'i7', category: 'Inspection', label: 'Check for loose bolts or fasteners' },
];

// Demo TPM submission for supervisor approval with remarks
export const DEMO_TPM_SUBMISSION: TpmChecklistItemWithRemark[] = TPM_CHECKLIST_ITEMS.map((item) => ({
  ...item,
  checked: true,
  remark: 
    item.id === 'c2' ? 'Removed metal shavings from conveyor area' :
    item.id === 'l2' ? 'Oil level was low, topped up to maximum' :
    item.id === 'i1' ? 'Slight vibration noticed on roller bearing, monitoring' :
    item.id === 'i7' ? 'Tightened 3 bolts on mounting bracket' :
    undefined,
}));
