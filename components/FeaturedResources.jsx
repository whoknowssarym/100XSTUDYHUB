'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

export default function FeaturedResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch('/api/resources');
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        const data = await response.json();
        // Ensure we have an array, even if empty
        setResources(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!resources.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No resources available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular study materials, carefully curated to help you excel in your studies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {resource.subject_name} • {resource.category_name}
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
                <div className="mt-4 space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {resource.download_count.toLocaleString()} downloads
                  </div>
                  <Button className="w-full" onClick={() => window.open(resource.file_url)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  );
}