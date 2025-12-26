import { Instagram, Youtube, Music2 } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Music2, label: "Spotify", href: "#" },
];

const navLinks = [
  { label: "Music", href: "#music" },
  { label: "Tour", href: "#tour" },
  { label: "About", href: "#about" },
  { label: "Merch", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CLUB BUSINESS
        </h3>

        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <nav className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-muted-foreground">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} Club Business. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
