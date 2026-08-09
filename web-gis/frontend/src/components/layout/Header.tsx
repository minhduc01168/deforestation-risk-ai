"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FIX #2: "Về VIGIL" moved before "Bản đồ VIGIL"
  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/map', label: t('nav.map') },
    { href: '/publication', label: t('nav.publication') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 shadow-md" style={{ backgroundColor: '#005e38' }}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Brand Logo — Logo VIGIL với khung nền trắng nổi bật chống bị chìm màu */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-white p-1 rounded-xl shadow-md flex items-center justify-center h-10 w-10 border border-white/40 group-hover:scale-105 transition-transform flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="VIGIL Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-extrabold text-xl tracking-wider text-white group-hover:text-yellow-300 transition-colors drop-shadow-sm">
            VIGIL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/80 hover:text-yellow-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-white/30 bg-white/10 p-0.5 shadow-sm">
            <button
              onClick={() => language !== 'vi' && toggleLanguage()}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all ${
                language === 'vi' ? 'bg-white text-[#005e38] shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              VI
            </button>
            <button
              onClick={() => language !== 'en' && toggleLanguage()}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all ${
                language === 'en' ? 'bg-white text-[#005e38] shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-yellow-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-1 animate-fadeIn" style={{ backgroundColor: '#004229' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-yellow-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
