"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-xl font-bold text-green-700">VIGIL</span>
          <p className="text-sm text-gray-500 mt-2 max-w-sm">
            {t('footer.description')}
          </p>
        </div>
        <div className="text-sm text-gray-400">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
