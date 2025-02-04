import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const metadata = {
  title: 'Study Notes | 100XStudyHub',
  description: 'Access comprehensive study notes and materials for various subjects.',
};

export default function NotesPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Study Notes</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access comprehensive study notes to enhance your understanding of various subjects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* This will be populated with data from the database */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Advanced Physics Notes</CardTitle>
            <CardDescription>Comprehensive notes on quantum mechanics</CardDescription>
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