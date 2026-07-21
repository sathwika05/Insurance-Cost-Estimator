import { useState, useEffect } from 'react';
import { Activity, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Predictor', href: '#predictor' },
  { label: 'About Model', href: '#about' },
  { label: 'Performance', href: '#performance' },
  { label: 'Dataset', href: '#dataset' },
];

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) {
    const offset = 64; // nav height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#predictor');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const sections = NAV_LINKS.map((l) => l.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]);
        if (el && el.getBoundingClientRect().top <= 80) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-200 bg-card ${
        scrolled ? 'shadow-sm border-b border-border' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleNav('#predictor')}
          className="flex items-center gap-2.5 focus:outline-none"
          aria-label="Home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </span>
          <span className="hidden font-semibold text-foreground sm:block">
            Insurance Predictor
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                active === href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className={`block w-full rounded-md px-4 py-3 text-left text-sm font-medium transition-colors ${
                active === href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
