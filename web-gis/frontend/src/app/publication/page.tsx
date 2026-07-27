"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function PublicationPage() {
  const { t } = useLanguage();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const sections = [
    {
      id: "abstract",
      title: t('publication.abstract_title'),
      content: [
        t('publication.abstract_p1'),
        t('publication.abstract_p2'),
        t('publication.abstract_p3'),
        t('publication.abstract_p4')
      ]
    },
    {
      id: "methodology",
      title: t('publication.methodology_title'),
      content: [
        t('publication.methodology_p1')
      ]
    },
    {
      id: "datasets",
      title: t('publication.datasets_title'),
      content: [
        t('publication.datasets_p1')
      ]
    },
    {
      id: "results",
      title: t('publication.results_title'),
      content: [
        t('publication.results_p1')
      ]
    },
    {
      id: "future",
      title: t('publication.future_title'),
      content: [
        t('publication.future_p1')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-gray-800 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A2B] mb-6">
            {t('publication.hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('publication.hero_subtitle')}
          </p>
          <p className="text-md font-medium text-[#2C5E3B] mt-4">
            {t('publication.authors')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="px-6 py-3 bg-gray-200 text-gray-500 rounded-lg font-medium cursor-not-allowed opacity-70"
            >
              {t('publication.btn_mdpi')}
            </a>
            <a 
              href="https://docs.google.com/document/d/1JPZjtsy4qORovDqZiaxUhsZKXE2jxmHW/edit?usp=sharing&ouid=104681234416147542434&rtpof=true&sd=true" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#2C5E3B] hover:bg-[#1E3A2B] text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              {t('publication.btn_download')}
            </a>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section, index) => (
            <motion.section 
              key={section.id}
              className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" } 
                }
              }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2C5E3B] mb-6 pb-4 border-b border-gray-100">
                {section.title}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
              
              {section.id === 'results' && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center">
                    <img 
                      src="/images/Figure3_ROC_split.png" 
                      alt="ROC Split" 
                      className="rounded-lg shadow-md max-w-full h-auto border border-gray-200"
                    />
                    <span className="text-sm text-gray-500 mt-2 italic">Figure 1. ROC curves for the provided train-test split.</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img 
                      src="/images/Figure6_RF_importance.png" 
                      alt="RF Feature Importance" 
                      className="rounded-lg shadow-md max-w-full h-auto border border-gray-200"
                    />
                    <span className="text-sm text-gray-500 mt-2 italic">Figure 2. Random forest feature importance.</span>
                  </div>
                </div>
              )}
            </motion.section>
          ))}
        </div>

      </div>
    </div>
  );
}
