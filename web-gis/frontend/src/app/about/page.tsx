"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 } // Removed ease string due to type issues
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2
    }
  },
  viewport: { once: true, margin: "-100px" }
};

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center bg-green-900 overflow-hidden">
        {/* Placeholder image for hero background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/gialai_2026/thuc_dia_1.JPG')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            {t('about.hero_title')}
          </h1>
        </motion.div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 px-4 md:px-8 bg-white text-gray-800">
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">{t('about.brand_story_title')}</h2>
            <p className="text-lg md:text-xl text-amber-600 font-medium">{t('about.brand_story_subtitle')}</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>{t('about.brand_story_p1')}</p>
              <p>{t('about.brand_story_p2')}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>{t('about.brand_story_p3')}</p>
              <p>{t('about.brand_story_p4')}</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Field Trips Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50 text-gray-800">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800">{t('about.activities_title')}</h2>
          </motion.div>

          <div className="space-y-20">
            {/* Trip 1: Ninh Binh */}
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-video relative bg-gray-200">
                  <img 
                    src="/images/gialai_2026/thuc_dia_8.JPG" 
                    alt={t('about.trip_1_title')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-green-700">{t('about.trip_1_title')}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{t('about.trip_1_desc')}</p>
              </div>
            </motion.div>

            {/* Trip 2: Gia Lai */}
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="w-full md:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-video relative bg-gray-200">
                  <img 
                    src="/images/map_overview.png" 
                    alt={t('about.trip_2_title')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-amber-600">{t('about.trip_2_title')}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{t('about.trip_2_desc')}</p>
              </div>
            </motion.div>

            {/* Trip 3: Gia Lai */}
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-video relative bg-gray-200">
                  <img 
                    src="/images/gialai_2026/thuc_dia_6.JPG" 
                    alt={t('about.trip_3_title')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-green-700">{t('about.trip_3_title')}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{t('about.trip_3_desc')}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
