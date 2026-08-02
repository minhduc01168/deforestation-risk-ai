"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, ChevronUp, Download, FileText, CheckCircle, Layers, BookOpen, BarChart3, Database, Compass } from 'lucide-react';

export default function PublicationPage() {
  const { t, language } = useLanguage();
  const isVi = language === 'vi';

  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);

  // Sections mapped directly to t() locale strings to preserve original paper content 100%
  const sections = [
    {
      id: 'abstract',
      title: t('publication.abstract_title'),
      icon: BookOpen,
      paragraphs: [
        t('publication.abstract_p1'),
        t('publication.abstract_p2'),
        t('publication.abstract_p3'),
        t('publication.abstract_p4'),
      ]
    },
    {
      id: 'methodology',
      title: t('publication.methodology_title'),
      icon: Layers,
      paragraphs: [
        t('publication.methodology_p1')
      ]
    },
    {
      id: 'datasets',
      title: t('publication.datasets_title'),
      icon: Database,
      paragraphs: [
        t('publication.datasets_p1')
      ]
    },
    {
      id: 'results',
      title: t('publication.results_title'),
      icon: BarChart3,
      paragraphs: [
        t('publication.results_p1')
      ],
      images: [
        {
          src: '/images/Figure3_ROC_split.png',
          alt: 'ROC curves for train-test split',
          caption: isVi ? 'Hình 1. Đường cong ROC cho tập huấn luyện - kiểm tra.' : 'Figure 1. ROC curves for the provided train-test split.'
        },
        {
          src: '/images/Figure6_RF_importance.png',
          alt: 'Random forest feature importance',
          caption: isVi ? 'Hình 2. Mức độ quan trọng của đặc trưng trong Rừng ngẫu nhiên.' : 'Figure 2. Random forest feature importance.'
        }
      ]
    },
    {
      id: 'future',
      title: t('publication.future_title'),
      icon: Compass,
      paragraphs: [
        t('publication.future_p1')
      ]
    }
  ];

  const filteredSections = selectedSection === 'all'
    ? sections
    : sections.filter(s => s.id === selectedSection);

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        {/* ─── Hero Section ─── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold mb-4 border"
            style={{ backgroundColor: '#e8f5ee', color: '#005e38', borderColor: 'rgba(0,94,56,0.3)' }}>
            <FileText size={14} />
            <span>{isVi ? 'Công Bố Khoa Học' : 'Scientific Publication'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight" style={{ color: '#005e38' }}>
            {t('publication.hero_title')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-3">
            {t('publication.hero_subtitle')}
          </p>
          <p className="text-sm md:text-base font-semibold" style={{ color: '#c98d26' }}>
            {t('publication.authors')}
          </p>
        </motion.div>

        {/* ─── Main Paper Card Header ─── */}
        <motion.div
          className="bg-white rounded-2xl border shadow-lg overflow-hidden mb-8"
          style={{ borderColor: 'rgba(0,94,56,0.15)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle size={12} /> {isVi ? 'Đã chấp nhận (Accepted)' : 'Accepted'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                MDPI Remote Sensing · Q1
              </span>
              <span className="ml-auto text-sm font-bold text-gray-400">2025</span>
            </div>

            <h2 className="text-xl md:text-2xl font-black mb-3 leading-snug" style={{ color: '#005e38' }}>
              An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution
            </h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {["Gia Lai Province", "K'Bang", "Mang Yang", "Random Forest", "Logistic Regression", "Google Earth Engine"].map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: '#e8f5ee', color: '#005e38' }}>
                  ◆ {tag}
                </span>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t" style={{ borderColor: 'rgba(0,94,56,0.1)' }}>
              <button
                onClick={() => setDetailsOpen(o => !o)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all shadow-sm"
                style={detailsOpen
                  ? { borderColor: '#F4D668', backgroundColor: '#F4D668', color: '#005e38' }
                  : { borderColor: '#005e38', backgroundColor: '#005e38', color: '#ffffff' }
                }
              >
                {detailsOpen
                  ? <><ChevronUp size={16} /> {isVi ? 'Ẩn chi tiết bài báo' : 'Hide details'}</>
                  : <><ChevronDown size={16} /> {isVi ? 'Xem chi tiết bài báo' : 'View details'}</>
                }
              </button>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-400 rounded-xl text-sm font-medium cursor-not-allowed opacity-70 border border-gray-200"
              >
                {t('publication.btn_mdpi')}
              </a>

              <a
                href="https://docs.google.com/document/d/1JPZjtsy4qORovDqZiaxUhsZKXE2jxmHW/edit?usp=sharing&ouid=104681234416147542434&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-sm hover:opacity-90 ml-auto"
                style={{ backgroundColor: '#005e38' }}
              >
                <Download size={15} />
                <span>{t('publication.btn_download')}</span>
              </a>
            </div>
          </div>

          {/* ─── Collapsible Details ─── */}
          <AnimatePresence>
            {detailsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                {/* Section Dropdown / Navigation Filter */}
                <div className="bg-gray-50 p-4 md:px-8 border-t border-b flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
                  style={{ borderColor: 'rgba(0,94,56,0.1)' }}>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
                      {isVi ? 'Mục xem:' : 'Filter section:'}
                    </span>
                  </div>

                  {/* Dropdown selector for sections */}
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(o => !o)}
                      className="w-full sm:w-64 flex items-center justify-between px-4 py-2 rounded-xl border bg-white font-semibold text-sm shadow-sm transition-all"
                      style={{ borderColor: '#005e38', color: '#005e38' }}
                    >
                      <span className="truncate pr-2">
                        {selectedSection === 'all'
                          ? (isVi ? 'Tất cả các mục (Full paper)' : 'All Sections')
                          : sections.find(s => s.id === selectedSection)?.title
                        }
                      </span>
                      <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 z-30 w-full sm:w-64 mt-1 bg-white border rounded-xl shadow-xl overflow-hidden"
                          style={{ borderColor: '#005e38' }}
                        >
                          <button
                            onClick={() => { setSelectedSection('all'); setDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-semibold border-b transition-colors ${
                              selectedSection === 'all' ? 'bg-[#005e38] text-white' : 'text-gray-700 hover:bg-[#e8f5ee]'
                            }`}
                          >
                            {isVi ? 'Tất cả các mục' : 'All Sections'}
                          </button>
                          {sections.map(s => (
                            <button
                              key={s.id}
                              onClick={() => { setSelectedSection(s.id); setDropdownOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium border-b last:border-0 transition-colors ${
                                selectedSection === s.id ? 'bg-[#005e38] text-white' : 'text-gray-700 hover:bg-[#e8f5ee]'
                              }`}
                            >
                              {s.title}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Section Content Display */}
                <div className="p-6 md:p-8 space-y-10">
                  {filteredSections.map((sec) => {
                    const IconComponent = sec.icon;
                    return (
                      <section key={sec.id} className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: '#e8f5ee', color: '#005e38' }}>
                            <IconComponent size={20} />
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#005e38' }}>
                            {sec.title}
                          </h3>
                        </div>

                        <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                          {sec.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>

                        {/* Figures under Results */}
                        {sec.images && sec.images.length > 0 && (
                          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sec.images.map((img, idx) => (
                              <div key={idx} className="flex flex-col items-center">
                                <img
                                  src={img.src}
                                  alt={img.alt}
                                  className="rounded-xl shadow-md max-w-full h-auto border border-gray-200"
                                />
                                <span className="text-xs md:text-sm text-gray-500 mt-2 italic text-center">
                                  {img.caption}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
