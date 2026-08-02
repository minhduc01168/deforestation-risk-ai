"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Mail } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname === '/map') {
    return null;
  }

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="mb-4 md:mb-0">
          <span className="text-xl font-bold text-green-700">VIGIL</span>
          <p className="text-sm text-gray-500 mt-2 max-w-xs" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t('footer.description')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-600">
          <a href="mailto:vigil.greenorg@gmail.com" className="flex items-center gap-2 hover:text-green-600 transition-colors">
            <Mail size={16} />
            <span>vigil.greenorg@gmail.com</span>
          </a>
          <a href="https://www.facebook.com/share/18yn8UxqPE/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook VIGIL</span>
          </a>
          <span className="text-xs text-gray-400">
            {t('footer.rights')}
          </span>
        </div>
      </div>
    </footer>
  );
}
