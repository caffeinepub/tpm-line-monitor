import WireframeSection from '../../components/common/WireframeSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';

export default function SupervisorReportsPage() {
  const reports = [
    {
      title: 'Daily Machine Downtime Report',
      description: 'Detailed breakdown of machine downtime by reason and duration',
      date: 'February 16, 2026',
    },
    {
      title: 'Weekly TPM Compliance Report',
      description: 'TPM checklist completion rates by operator and machine',
      date: 'Week of February 10-16, 2026',
    },
    {
      title: 'Top 10 Breakdown Reasons',
      description: 'Most common causes of machine breakdowns this month',
      date: 'February 2026',
    },
    {
      title: 'MTBF / MTTR Trends',
      description: 'Mean Time Between Failures and Mean Time To Repair analysis',
      date: 'Last 30 days',
    },
    {
      title: 'Line-wise OEE Report',
      description: 'Overall Equipment Effectiveness by production line',
      date: 'February 2026',
    },
  ];

  const handleDownload = (reportTitle: string) => {
    console.log('Downloading:', reportTitle);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Reports & Analytics</h2>
        <p className="text-muted-foreground text-lg">Download production and maintenance reports</p>
      </div>

      <WireframeSection title="Available Reports">
        <div className="space-y-4">
          {reports.map((report, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {report.title}
                    </CardTitle>
                    <CardDescription className="mt-1">{report.description}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">Period: {report.date}</p>
                  </div>
                  <Button
                    onClick={() => handleDownload(report.title)}
                    size="lg"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </WireframeSection>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            Reports are generated in Excel format. PDF export will be available in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
