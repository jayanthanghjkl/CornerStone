import Link from "next/link";
import { Laptop, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "New arrivals", href: "/shop?sort=newest" },
    { label: "Sale", href: "/shop?sale=true" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-h-10 max-w-7xl px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
        {}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-5 lg:gap-12">
          {}
=======
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-5 lg:gap-12">
          {/* Brand column */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Laptop className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Corner<span className="text-primary">stone</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Cornerstone provides premium, high-performance products for creators, 
              developers, and professionals. Experience the next generation of computing.
            </p>
<<<<<<< HEAD
            {}
=======
            {/* Socials */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

<<<<<<< HEAD
          {}
=======
          {/* Link columns */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
