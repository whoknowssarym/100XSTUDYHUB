import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedResources from '@/components/FeaturedResources';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Statistics from '@/components/Statistics';
import SubjectAreas from '@/components/SubjectAreas';
import Newsletter from '@/components/Newsletter';

export const metadata = {
  title: 'Home | 100XStudyHub - Your Gateway to Academic Excellence',
  description: 'Discover a vast collection of study materials, past papers, and comprehensive notes to excel in your academic journey.',
};

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <Statistics />
      <Categories />
      <SubjectAreas />
      <FeaturedResources />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}