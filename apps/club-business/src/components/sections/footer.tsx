import { Instagram, Facebook } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-6">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} Club Business. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
