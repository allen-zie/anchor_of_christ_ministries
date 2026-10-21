import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, Menu, X } from 'lucide-react';
import logo from '@/content/images/anchor_logo.webp'


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChurchOpen, setIsChurchOpen] = useState(false);
  const [location] = useLocation();
  const scrollToPageTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  const currentPath = location.split('?')[0].split('#')[0] || '/';

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'MINISTRIES', href: '/ministries' },
    { label: 'MEDIA', href: '/media' },
    { label: 'EVENTS', href: '/events' },
    { label: 'GIVING', href: '/giving' },
    { label: 'CONTACT', href: '/contact' },
  ];
  const isChurchActive = currentPath === '/about' || currentPath === '/the-prophet';
  const closeMenus = () => {
    setIsOpen(false);
    setIsChurchOpen(false);
    scrollToPageTop();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" onClick={scrollToPageTop}>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  <img
                    src={logo}
                    alt="TAOCIM LOGO"
                    className="Logo"
                  />
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold text-deep-blue leading-tight">
                  THE ANCHOR OF CHRIST                 </h1>
                <p className="text-xs text-gold">INTERNATIONAL MINISTRIES</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.slice(0, 1).map((item) => (
              <Link key={item.href} href={item.href}>
                <a onClick={scrollToPageTop} className={`text-sm font-semibold transition-colors duration-200 ${currentPath === item.href ? 'border-b-2 border-gold pb-2 text-gold' : 'text-deep-blue hover:text-gold'}`} aria-current={currentPath === item.href ? 'page' : undefined}>
                  {item.label}
                </a>
              </Link>
            ))}

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsChurchOpen((open) => !open)}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 ${isChurchActive ? 'border-b-2 border-gold pb-2 text-gold' : 'text-deep-blue hover:text-gold'}`}
                aria-haspopup="menu"
                aria-expanded={isChurchOpen}
              >
                ABOUT US <ChevronDown className={`h-4 w-4 transition-transform ${isChurchOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {isChurchOpen && (
                <div className="absolute left-1/2 top-full z-[70] mt-4 w-52 -translate-x-1/2 rounded-2xl border border-gold/20 bg-white p-2 shadow-2xl" role="menu">
                  <Link href="/about">
                    <a onClick={closeMenus} className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${currentPath === '/about' ? 'bg-gold/15 text-gold' : 'text-deep-blue hover:bg-gold/10 hover:text-gold'}`} role="menuitem">The Church</a>
                  </Link>
                  <Link href="/the-prophet">
                    <a onClick={closeMenus} className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${currentPath === '/the-prophet' ? 'bg-gold/15 text-gold' : 'text-deep-blue hover:bg-gold/10 hover:text-gold'}`} role="menuitem">The Prophet</a>
                  </Link>
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>
                <a onClick={scrollToPageTop} className={`text-sm font-semibold transition-colors duration-200 ${currentPath === item.href ? 'border-b-2 border-gold pb-2 text-gold' : 'text-deep-blue hover:text-gold'}`} aria-current={currentPath === item.href ? 'page' : undefined}>
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Donate Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-all duration-200 transform hover:scale-105">
              DONATE ❤️
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-deep-blue hover:text-gold transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-light-gray border-t border-gray-200 py-4">
            <div className="flex flex-col gap-2">
              {navItems.slice(0, 1).map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`block rounded px-4 py-2 text-sm font-semibold transition-colors ${currentPath === item.href ? 'bg-gold/15 text-gold' : 'text-deep-blue hover:bg-gold hover:text-white'}`}
                    aria-current={currentPath === item.href ? 'page' : undefined}
                    onClick={() => { setIsOpen(false); scrollToPageTop(); }}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <button
                type="button"
                onClick={() => setIsChurchOpen((open) => !open)}
                className={`flex items-center justify-between rounded px-4 py-2 text-left text-sm font-semibold transition-colors ${isChurchActive ? 'bg-gold/15 text-gold' : 'text-deep-blue hover:bg-gold hover:text-white'}`}
                aria-haspopup="menu"
                aria-expanded={isChurchOpen}
              >
                <span>ABOUT US</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isChurchOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {isChurchOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-gold/30 pl-3" role="menu">
                  <Link href="/about">
                    <a onClick={closeMenus} className={`block rounded px-4 py-2 text-sm font-semibold transition-colors ${currentPath === '/about' ? 'bg-gold/15 text-gold' : 'text-deep-blue hover:bg-gold hover:text-white'}`} role="menuitem">The Church</a>
                  </Link>
                  <Link href="/the-prophet">
                    <a onClick={closeMenus} className={`block rounded px-4 py-2 text-sm font-semibold transition-colors ${currentPath === '/the-prophet' ? 'bg-gold/15 text-gold' : 'text-deep-blue hover:bg-gold hover:text-white'}`} role="menuitem">The Prophet</a>
                  </Link>
                </div>
              )}
              {navItems.slice(1).map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`block rounded px-4 py-2 text-sm font-semibold transition-colors ${currentPath === item.href ? 'bg-gold/15 text-gold' : 'text-deep-blue hover:bg-gold hover:text-white'}`}
                    aria-current={currentPath === item.href ? 'page' : undefined}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <button className="mx-4 mt-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-all duration-200 w-fit">
                DONATE ❤️
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
