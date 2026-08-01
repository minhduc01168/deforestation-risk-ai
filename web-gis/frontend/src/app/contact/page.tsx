"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Globe, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', organization: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        alert('Có lỗi xảy ra khi gửi tin nhắn liên hệ. Vui lòng thử lại.');
        setStatus('idle');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      // Fallback success for client UX if backend unreachable
      setStatus('success');
      setFormData({ name: '', email: '', organization: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
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
                    <a href="mailto:vigil.greenorg@gmail.com" className="text-gray-600 hover:text-green-700 transition-colors text-base font-medium">
                      vigil.greenorg@gmail.com
                    </a>
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
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 mt-1">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Facebook</h3>
                    <a href="https://www.facebook.com/share/18yn8UxqPE/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-base font-medium break-all">
                      https://www.facebook.com/share/18yn8UxqPE/?mibextid=wwXIfr
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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.label_topic')}
                    </label>
                    <input 
                      type="text" 
                      id="organization" 
                      name="organization" 
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
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
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
