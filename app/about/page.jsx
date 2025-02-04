export const metadata = {
  title: 'About Us | 100XStudyHub',
  description: 'Learn about our mission to provide quality educational resources to students worldwide.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About 100XStudyHub</h1>
        
        <div className="prose prose-lg">
          <p className="text-lg text-muted-foreground mb-6">
            100XStudyHub is dedicated to making quality education accessible to students worldwide. We believe in the power of well-organized, comprehensive study materials to transform the learning experience.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            To provide students with high-quality, accessible educational resources that enhance their learning journey and academic success.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Comprehensive study materials across various subjects</li>
            <li>Past examination papers with detailed solutions</li>
            <li>Well-structured course handouts</li>
            <li>Regular updates with new content</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Quality: We ensure all materials meet high academic standards</li>
            <li>Accessibility: Making education available to everyone</li>
            <li>Innovation: Constantly improving our resources and platform</li>
            <li>Community: Building a supportive learning environment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}