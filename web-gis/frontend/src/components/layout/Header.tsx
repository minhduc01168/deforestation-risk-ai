"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-700">VIGIL</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="#publication" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
              {t('nav.publication')}
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            {language === 'vi' ? 'EN' : 'VI'}
          </button>
        </div>
      </div>
    </header>
  );
}
