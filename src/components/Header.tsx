'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">🏠 DreamHome Realty</div>
            <nav className="nav">
              <div className="nav-link">Home</div>
              <div className="nav-link">Listings</div>
              <div className="nav-link">About</div>
              <div className="nav-link">Contact</div>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/listings', label: 'Listings' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            🏠 DreamHome Realty
          </Link>
          <nav className="nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
