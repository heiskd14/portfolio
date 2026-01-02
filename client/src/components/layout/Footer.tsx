import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold font-display mb-6">Let's build something amazing together</h2>
        
        <div className="flex justify-center gap-6 mb-8">
          <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} label="GitHub" />
          <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
          <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} label="Twitter" />
          <SocialLink href="mailto:hello@example.com" icon={<Mail className="w-5 h-5" />} label="Email" />
        </div>

        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-3 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:-translate-y-1 border border-border"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
