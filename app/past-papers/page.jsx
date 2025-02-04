import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const metadata = {
  title: 'Past Papers | 100XStudyHub',
  description: 'Practice with previous examination papers across various subjects and topics.',
};

export default function PastPapersPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Past Examination Papers</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Practice with previous examination papers to prepare effectively for your exams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* This will be populated with data from the database */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Mathematics 2023</CardTitle>
            <CardDescription>Final examination paper with detailed solutions</CardDescription>
            <div className="mt-4">
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}