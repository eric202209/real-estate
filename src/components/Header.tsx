'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mounted] = useState(true);

  // Mount immediately to prevent hydration mismatch
  // This avoids the need for useEffect which triggers lint warnings

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
