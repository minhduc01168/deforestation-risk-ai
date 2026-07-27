"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Globe, Facebook, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Mock API call
    setTimeout(() => {
      setStatus('success');
      // Reset form (in a real app we'd use controlled components or form ref)
      const form = e.target as HTMLFormElement;
      form.reset();
      
      // Reset status after a few seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1000);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A2B] mb-4">
            {t('contact.hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.hero_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info Column */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#2C5E3B] mb-6">
                {t('contact.info_title')}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-700 mt-1">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Email</h3>
                    <p className="text-gray-600 text-base">{t('contact.email').replace('Email: ', '')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-700 mt-1">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Website</h3>
                    <p className="text-gray-600 text-base">{t('contact.website').replace('Website: ', '')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-700 mt-1">
                    <Facebook size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Facebook</h3>
                    <a href="https://fb.com/vigil.project" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-base">
                      {t('contact.facebook').replace('Facebook: ', '')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder or additional info could go here */}
            <div className="bg-[#1E3A2B] rounded-2xl p-8 text-white text-center flex flex-col justify-center min-h-[200px]">
               <h3 className="text-xl font-bold mb-2">VIGIL Project</h3>
               <p className="text-green-100 opacity-80">Technology for Life</p>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } }
            }}
          >
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 h-full">
              <h2 className="text-2xl font-bold text-[#2C5E3B] mb-6">
                {t('contact.form_title')}
              </h2>
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center"
                >
                  <CheckCircle2 className="text-green-500 w-16 h-16 mb-4" />
                  <h3 className="text-xl font-medium text-green-800 mb-2">
                    {t('contact.success_message')}
                  </h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.label_name')}
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      placeholder={t('contact.label_name')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.label_email')}
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.label_mobile')}
                    </label>
                    <input 
                      type="tel" 
                      id="mobile" 
                      name="mobile" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      placeholder="0912345678"
                    />
                  </div>

                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.label_topic')}
                    </label>
                    <input 
                      type="text" 
                      id="topic" 
                      name="topic" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      placeholder={t('contact.label_topic')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.label_message')}
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-none"
                      placeholder={t('contact.label_message')}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition-all
                      ${status === 'loading' 
                        ? 'bg-green-400 cursor-not-allowed' 
                        : 'bg-[#2C5E3B] hover:bg-[#1E3A2B] active:scale-[0.98]'
                      }
                    `}
                  >
                    {status === 'loading' ? t('contact.btn_loading') : t('contact.btn_submit')}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
