"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Map as MapIcon, ShieldCheck, Users, BookOpen } from 'lucide-react';
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), { ssr: false });

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-40">
          <InteractiveMap />
        </div>
        
        <motion.div 
          className="container mx-auto px-6 relative z-10 text-center max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight"
          >
            {t('landing.hero.title')}
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-green-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t('landing.hero.subtitle')}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link 
              href="/map" 
              className="inline-flex items-center space-x-3 bg-green-500 hover:bg-green-400 text-slate-900 font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-green-900/50 transition-all hover:-translate-y-1"
            >
              <span>{t('landing.hero.exploreBtn')}</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.5, duration: 1 } }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-green-400/70"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1.5 h-2 bg-current rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* VIGIL Map Info Section */}
      <section className="py-24 bg-white" id="about">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('landing.mapInfo.title')}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('landing.mapInfo.desc')}
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <MapIcon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{t('landing.mapInfo.feature1')}</h3>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{t('landing.mapInfo.feature2')}</h3>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{t('landing.mapInfo.feature3')}</h3>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Science & Research Section */}
      <section className="py-24 bg-slate-900 text-white" id="publication">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="md:w-1/2"
            >
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30">
                <BookOpen size={32} />
              </div>
              <h2 className="text-4xl font-bold mb-6">{t('landing.science.title')}</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {t('landing.science.desc')}
              </p>
              <Link 
                href="/publication" 
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-bold text-lg transition-colors group"
              >
                <span>{t('landing.science.btn')}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="md:w-1/2 w-full"
            >
                {/* Abstract scientific visualization placeholder */}
                <div className="aspect-video bg-slate-800 rounded-2xl border border-slate-700 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
                  <img src="/images/logo.png" alt="VIGIL Scientific Platform" className="relative z-10 w-32 h-32 object-contain opacity-80" />
                  <p className="mt-4 relative z-10 text-slate-400 font-medium">Core AI Architecture</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Field Activities Section */}
      <section className="py-24 bg-slate-50" id="activities">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('landing.activities.title')}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('landing.activities.desc')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-3">Gia Lai 2026</h3>
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/gialai_2026/thuc_dia_1.JPG" className="rounded-lg h-40 w-full object-cover hover:scale-105 transition-transform" alt="Thực địa Gia Lai 1" />
                <img src="/images/gialai_2026/thuc_dia_3.JPG" className="rounded-lg h-40 w-full object-cover hover:scale-105 transition-transform" alt="Thực địa Gia Lai 3" />
                <img src="/images/gialai_2026/thuc_dia_4.JPG" className="rounded-lg h-40 w-full object-cover hover:scale-105 transition-transform" alt="Thực địa Gia Lai 4" />
                <img src="/images/gialai_2026/thuc_dia_8.JPG" className="rounded-lg h-40 w-full object-cover hover:scale-105 transition-transform" alt="Thực địa Gia Lai 8" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-3">Ninh Bình 2025</h3>
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/ninhbinh_2025/Bản sao của IMG_0925.jpg" className="rounded-lg h-40 w-full object-cover hover:scale-105 transition-transform" alt="Thực địa Ninh Bình 1" />
                <img src="/images/ninhbinh_2025/Bản sao của IMG_1223.jpg" className="rounded-lg h-40 w-full object-cover hover:scale-105 transition-transform" alt="Thực địa Ninh Bình 2" />
                <img src="/images/ninhbinh_2025/Bản sao của IMG_1437.jpg" className="rounded-lg h-40 w-full object-cover hover:scale-105 transition-transform" alt="Thực địa Ninh Bình 3" />
                <img src="/images/ninhbinh_2025/Bản sao của IMG_1450.jpg" className="rounded-lg h-40 w-full object-cover hover:scale-105 transition-transform" alt="Thực địa Ninh Bình 4" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social / Facebook Feed Section */}
      <section className="py-24 bg-white" id="updates">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('landing.social.title')}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('landing.social.desc')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex justify-center"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 bg-white">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" 
                width="340" 
                height="500" 
                style={{ border: "none", overflow: "hidden" }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VIGIL Club Section */}
      <section className="py-24 bg-green-50" id="contact">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-600/30">
              <span className="text-3xl font-black">V</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('landing.club.title')}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              {t('landing.club.desc')}
            </p>
            <Link 
              href="/about" 
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-transform hover:-translate-y-1"
            >
              <span>{t('landing.club.btn')}</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
