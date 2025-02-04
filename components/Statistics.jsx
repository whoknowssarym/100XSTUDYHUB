'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Users, BookOpen, GraduationCap } from 'lucide-react';
import CountUp from 'react-countup';

const stats = [
  {
    title: 'Total Downloads',
    value: 50000,
    icon: Download,
    suffix: '+',
  },
  {
    title: 'Active Users',
    value: 10000,
    icon: Users,
    suffix: '+',
  },
  {
    title: 'Study Materials',
    value: 2000,
    icon: BookOpen,
    suffix: '+',
  },
  {
    title: 'Success Stories',
    value: 500,
    icon: GraduationCap,
    suffix: '+',
  },
];

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('statistics-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="statistics-section" className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-none bg-background/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
                  {isVisible && (
                    <div className="text-3xl font-bold text-primary">
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        suffix={stat.suffix}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}