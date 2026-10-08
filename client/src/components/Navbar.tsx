import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import logo from '@/content/images/anchor_logo.webp'


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'MINISTRIES', href: '/ministries' },
    { label: 'MEDIA', href: '/media' },
    { label: 'EVENTS', href: '/events' },
    { label: 'GIVING', href: '/giving' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
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
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="text-sm font-semibold text-deep-blue hover:text-gold transition-colors duration-200">
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
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className="block px-4 py-2 text-sm font-semibold text-deep-blue hover:bg-gold hover:text-white transition-colors rounded"
                    onClick={() => setIsOpen(false)}
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
