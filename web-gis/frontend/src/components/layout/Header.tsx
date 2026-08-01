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

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/map', label: t('nav.map') },
    { href: '/about', label: t('nav.about') },
    { href: '/publication', label: t('nav.publication') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <img 
            src="/images/logo.png" 
            alt="VIGIL" 
            className="h-9 w-9 object-contain group-hover:scale-105 transition-transform" 
          />
          <span className="text-2xl font-black text-green-700 tracking-tight">VIGIL</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-green-100 text-green-800 shadow-sm'
                    : 'text-gray-600 hover:text-green-700 hover:bg-gray-100/80'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 p-0.5 shadow-sm">
            <button 
              onClick={() => language !== 'vi' && toggleLanguage()}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all ${
                language === 'vi' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              VI
            </button>
            <button 
              onClick={() => language !== 'en' && toggleLanguage()}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all ${
                language === 'en' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-green-700 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 py-3 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
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
