import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '100XStudyHub - Premier Educational Resource Platform',
  description: 'Access high-quality study materials, past papers, and comprehensive notes. Join thousands of students achieving academic excellence with our curated educational resources.',
  keywords: 'study materials, past papers, educational resources, academic excellence, study notes, exam preparation',
  openGraph: {
    title: '100XStudyHub - Your Path to Academic Success',
    description: 'Discover a vast collection of study materials and resources to excel in your academic journey.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '100XStudyHub - Premier Educational Resources',
    description: 'Your one-stop platform for quality educational materials.',
    images: ['/twitter-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://100xstudyhub.com" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}