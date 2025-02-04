import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Users, BookOpen, Clock } from 'lucide-react';

const features = [
  {
    title: 'Extensive Resource Library',
    description: 'Access thousands of study materials, past papers, and notes',
    icon: BookOpen,
  },
  {
    title: 'Regular Updates',
    description: 'New resources added daily to keep you up to date',
    icon: Clock,
  },
  {
    title: 'High-Quality Content',
    description: 'Carefully curated and verified study materials',
    icon: Download,
  },
  {
    title: 'Community Driven',
    description: 'Join thousands of students helping each other succeed',
    icon: Users,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose 100XStudyHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon className="h-8 w-8 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}