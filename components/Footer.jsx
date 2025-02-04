import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:grid md:grid-cols-4 md:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6" />
              <span className="text-lg font-bold">100XStudyHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering students with quality educational resources for academic success.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/past-papers" className="text-sm text-muted-foreground hover:text-primary">Past Papers</Link></li>
              <li><Link href="/notes" className="text-sm text-muted-foreground hover:text-primary">Study Notes</Link></li>
              <li><Link href="/handouts" className="text-sm text-muted-foreground hover:text-primary">Handouts</Link></li>
              <li><Link href="/guides" className="text-sm text-muted-foreground hover:text-primary">Quick Guides</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Twitter</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Facebook</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Instagram</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 100XStudyHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}