"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Map as MapIcon, ShieldCheck, Users, BookOpen, Heart, Sparkles, CheckCircle2, Trees, Camera, Globe, ChevronRight } from 'lucide-react';
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
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Hero Section with Parallax Background */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-8 pb-16">
        {/* Ambient background image and map opacity */}
        <div className="absolute inset-0 opacity-30 mix-blend-luminosity">
          <InteractiveMap />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-0"></div>

        <motion.div 
          className="container mx-auto px-6 relative z-10 text-center max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Top Eco Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full mb-8 shadow-inner backdrop-blur-md">
            <Sparkles size={16} className="text-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-300">
              {language === 'vi' ? 'Dự Án AI Cảnh Báo Phá Rừng Việt Nam' : 'Vietnam Deforestation AI Risk Project'}
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-300"
          >
            {language === 'vi' ? 'VIGIL - CÔNG NGHỆ THỨC GIẤC, ĐẠI NGÀN BÌNH YÊN' : 'VIGIL - AWAKENING TECHNOLOGY, PEACEFUL FORESTS'}
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            {language === 'vi' 
              ? 'Ứng dụng phân tích ảnh vệ tinh tiên tiến và học máy AI để khoanh vùng rủi ro phá rừng tại Gia Lai, hỗ trợ bảo vệ những cánh rừng tự nhiên.'
              : 'Applying satellite remote sensing and AI machine learning to monitor forest risks in Gia Lai, protecting natural ecosystems.'}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/map" 
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-lg px-9 py-4 rounded-full shadow-2xl shadow-emerald-900/50 transition-all hover:-translate-y-1 group"
            >
              <span>{t('landing.hero.exploreBtn')}</span>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900/80 hover:bg-slate-800 text-amber-400 border border-amber-400/40 font-bold text-base px-7 py-4 rounded-full shadow-lg backdrop-blur-md transition-all hover:-translate-y-1"
            >
              <BookOpen size={18} />
              <span>{language === 'vi' ? 'Tìm Hiểu Dự Án' : 'Learn About Project'}</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Authentic Project Feature Cards */}
      <section className="relative z-20 -mt-16 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 p-7 rounded-3xl shadow-2xl text-white flex items-center gap-6 hover:scale-[1.02] hover:border-emerald-400/60 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors shadow-lg">
              <Trees size={32} />
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400 tracking-tight">
                {language === 'vi' ? 'Ô Lưới 1 km²' : '1 km² Grid'}
              </div>
              <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mt-1">
                {language === 'vi' ? 'Phân Giải Nguy Cơ Phá Rừng' : 'Deforestation Risk Grid Resolution'}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 p-7 rounded-3xl shadow-2xl text-white flex items-center gap-6 hover:scale-[1.02] hover:border-emerald-400/60 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow-lg">
              <ShieldCheck size={32} />
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400 tracking-tight">
                {language === 'vi' ? '10% Nguy Cơ Cao' : 'Top 10% Risk'}
              </div>
              <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mt-1">
                {language === 'vi' ? 'Ngưỡng Khoanh Vùng Cảnh Báo Ưu Tiên' : 'Priority Risk Alert Threshold'}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 p-7 rounded-3xl shadow-2xl text-white flex items-center gap-6 hover:scale-[1.02] hover:border-emerald-400/60 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400 flex-shrink-0 group-hover:bg-teal-400 group-hover:text-slate-950 transition-colors shadow-lg">
              <Users size={32} />
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400 tracking-tight">
                {language === 'vi' ? 'Cộng Đồng' : 'Community'}
              </div>
              <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mt-1">
                {language === 'vi' ? 'Ghi Nhận Báo Cáo Thực Địa' : 'Community Field Reporting'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Action & Field Report Section (Authentic Action Box) */}
      <section className="py-20 bg-slate-950 relative overflow-hidden" id="pledge">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 rounded-3xl border border-emerald-500/40 p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-extrabold">
                <Heart size={14} className="fill-amber-400" />
                <span>{language === 'vi' ? 'Hành Động Cùng VIGIL' : 'Action With VIGIL'}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {language === 'vi' ? 'BẢO VỆ ĐẠI NGÀN GIA LAI' : 'PROTECT GIA LAI FORESTS'}
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                {language === 'vi' 
                  ? 'Chung tay cùng lực lượng kiểm lâm và cộng đồng địa phương gửi báo cáo thực địa kèm hình ảnh trực tiếp trên bản đồ GIS.'
                  : 'Join rangers and local communities by submitting field reports directly on the GIS map.'}
              </p>
            </div>

            <div className="flex-shrink-0 text-center bg-slate-900/90 p-6 rounded-2xl border border-slate-700/80 shadow-xl min-w-[280px]">
              <div className="text-xl font-bold text-white mb-2">
                {language === 'vi' ? 'Gửi Báo Cáo Thực Địa' : 'Submit Field Report'}
              </div>
              <p className="text-xs text-slate-400 mb-5">
                {language === 'vi' ? 'Định vị GPS & Tải ảnh thực địa' : 'GPS location & photo upload'}
              </p>

              <Link
                href="/map"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 hover:scale-105 transition-all shadow-lg"
              >
                <MapIcon size={18} />
                <span>{language === 'vi' ? 'Mở Bản Đồ & Báo Cáo' : 'Open Map & Report'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rich Field Photography Gallery (High Visual Impact) */}
      <section className="py-24 bg-slate-950" id="activities">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-extrabold mb-4">
              <Camera size={14} />
              <span>{language === 'vi' ? 'Hình Ảnh Thực Địa 2025 - 2026' : 'Field Expeditions 2025 - 2026'}</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">{t('landing.activities.title')}</h2>
            <p className="text-slate-400 text-lg">
              {t('landing.activities.desc')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Expedition Card 1 - Gia Lai */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span>Gia Lai 2026</span>
                </h3>
                <span className="text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full font-bold border border-emerald-800">K'Bang & Mang Yang</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden group h-44">
                  <img src="/images/gialai_2026/thuc_dia_1.JPG" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gia Lai Field 1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3 text-xs text-slate-100 font-semibold leading-snug">
                    {language === 'vi' ? 'Khảo sát hiện trạng rừng K\'Bang' : 'K\'Bang Forest Canopy Survey'}
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden group h-44">
                  <img src="/images/gialai_2026/thuc_dia_3.JPG" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gia Lai Field 3" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3 text-xs text-slate-100 font-semibold leading-snug">
                    {language === 'vi' ? 'Khảo sát điểm mất rừng thực địa' : 'Field Deforestation Inspection'}
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden group h-44">
                  <img src="/images/gialai_2026/thuc_dia_6.JPG" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gia Lai Field 6" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3 text-xs text-slate-100 font-semibold leading-snug">
                    {language === 'vi' ? 'Đối chiếu dữ liệu tại Mang Yang' : 'Mang Yang Field Data Verification'}
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden group h-44">
                  <img src="/images/gialai_2026/thuc_dia_8.JPG" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gia Lai Field 8" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3 text-xs text-slate-100 font-semibold leading-snug">
                    {language === 'vi' ? 'Làm việc cùng kiểm lâm địa phương' : 'Ranger & Field Team Collaboration'}
                  </div>
                </div>
              </div>
            </div>

            {/* Expedition Card 2 - Ninh Bình */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                  <span>Ninh Bình 2025</span>
                </h3>
                <span className="text-xs text-blue-400 bg-blue-950 px-2.5 py-1 rounded-full font-bold border border-blue-800">
                  {language === 'vi' ? 'Vườn QG Cúc Phương' : 'Cuc Phuong Nat. Park'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden group h-44">
                  <img src="/images/ninhbinh_2025/nb_1.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Ninh Binh Field 1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3 text-xs text-slate-100 font-semibold leading-snug">
                    {language === 'vi' ? 'Hệ sinh thái rừng đá vôi Cúc Phương' : 'Cuc Phuong Karst Ecosystem'}
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden group h-44">
                  <img src="/images/ninhbinh_2025/nb_2.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Ninh Binh Field 2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3 text-xs text-slate-100 font-semibold leading-snug">
                    {language === 'vi' ? 'Khảo sát thảm thực vật & độ che phủ' : 'Vegetation & Canopy Cover Audit'}
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden group h-44">
                  <img src="/images/ninhbinh_2025/nb_3.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Ninh Binh Field 3" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3 text-xs text-slate-100 font-semibold leading-snug">
                    {language === 'vi' ? 'Thu thập mẫu đối chứng chỉ số thực vật' : 'Vegetation Index Field Calibration'}
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden group h-44">
                  <img src="/images/ninhbinh_2025/nb_4.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Ninh Binh Field 4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3 text-xs text-slate-100 font-semibold leading-snug">
                    {language === 'vi' ? 'Đội ngũ nghiên cứu VIGIL tại thực địa' : 'VIGIL Research Team Fieldwork'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Social Media & Community Hub Cards (Replaces Blank FB Iframe) */}
      <section className="py-24 bg-slate-900 text-white" id="community">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-extrabold mb-4">
              <Globe size={14} />
              <span>{language === 'vi' ? 'Kết Nối & Cộng Đồng' : 'Community & Social Hub'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              {language === 'vi' ? 'KẾT NỐI VỚI VIGIL' : 'CONNECT WITH VIGIL'}
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              {language === 'vi' 
                ? 'Theo dõi các bài viết, chuyến khảo sát thực địa và kết quả nghiên cứu mới nhất của dự án VIGIL.'
                : 'Follow news, field trip updates and research publications from the VIGIL project.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Facebook Card */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between hover:border-blue-500/50 transition-all group">
              <div>
                <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Globe size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Facebook Fanpage</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {language === 'vi' 
                    ? 'Cập nhật tin tức, hình ảnh thực địa và các chiến dịch truyền thông bảo vệ rừng tự nhiên.'
                    : 'Get official news, field photos, and forest protection campaigns.'}
                </p>
              </div>
              <a
                href="https://www.facebook.com/share/18yn8UxqPE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 text-sm"
              >
                <span>{language === 'vi' ? 'Ghé thăm Fanpage Facebook' : 'Visit Facebook Page'}</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Email Contact Card */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
              <div>
                <div className="w-14 h-14 bg-emerald-600/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {language === 'vi' ? 'Email Hợp Tác' : 'Collaboration Email'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-mono">
                  vigil.greenorg@gmail.com
                </p>
                <p className="text-xs text-slate-500 mb-6">
                  {language === 'vi' 
                    ? 'Liên hệ trao đổi chuyên môn, hợp tác dữ liệu viễn thám và đóng góp dự án.'
                    : 'Contact us for academic collaboration and remote sensing data sharing.'}
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 text-sm"
              >
                <span>{language === 'vi' ? 'Đến Trang Liên Hệ' : 'Go to Contact Page'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Publication Card */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between hover:border-amber-500/50 transition-all group">
              <div>
                <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <BookOpen size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {language === 'vi' ? 'Công Bố Khoa Học' : 'Scientific Publications'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {language === 'vi' 
                    ? 'Xem báo cáo phương pháp luận mô hình Random Forest và tập dữ liệu vệ tinh.'
                    : 'Explore Random Forest methodology reports and satellite datasets.'}
                </p>
              </div>
              <Link
                href="/publication"
                className="w-full py-3.5 px-5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 text-sm"
              >
                <span>{language === 'vi' ? 'Xem Trang Xuất Bản' : 'View Publication Page'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
