"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, ChevronUp, ExternalLink, Download, FileText, CheckCircle, Clock } from 'lucide-react';

// ─── Paper data ──────────────────────────────────────────────────────────────

const PAPERS = [
  {
    id: 'paper-2025',
    status: 'accepted' as const,
    journal: 'MDPI Remote Sensing',
    journalBadge: 'Q1',
    year: 2025,
    titleEn: 'An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution',
    titleVi: 'Pipeline Học Máy Có Khả Năng Diễn Giải Cho Dự Báo Nguy Cơ Mất Rừng Tại Việt Nam Độ Phân Giải 1 km',
    authorsEn: 'Pham Duy Long · Nguyen Vu Huy · Nguyen Duc Anh · Do Nhat Quang · Dam Anh Thu · Tran Dang An',
    authorsVi: 'Phạm Duy Long · Nguyễn Vũ Huy · Nguyễn Đức Anh · Đỗ Nhật Quang · Đàm Anh Thư · Trần Đăng An',
    locationTags: ["Gia Lai Province", "K'Bang", "Mang Yang"],
    methodTags: ["Random Forest", "Logistic Regression"],
    dataTags: ["Hansen", "SRTM", "CHIRPS", "Sentinel-2"],
    mdpiUrl: '#',
    downloadUrl: 'https://docs.google.com/document/d/1JPZjtsy4qORovDqZiaxUhsZKXE2jxmHW/edit?usp=sharing&ouid=104681234416147542434&rtpof=true&sd=true',
    citation: `@article{pham2025vigil,
  title={An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution},
  author={Pham, Duy Long and Nguyen, Vu Huy and Nguyen, Duc Anh and Do, Nhat Quang and Dam, Anh Thu and Tran, Dang An},
  journal={Remote Sensing},
  publisher={MDPI},
  year={2025},
  note={Accepted for publication, Q1, Scopus-indexed}
}`,
    sections: {
      abstract: {
        en: [
          "Deforestation monitoring requires reliable historical mapping and actionable risk signals that can be translated into operational priorities. This study presents a reproducible, grid-based machine-learning pipeline for deforestation-risk prediction and warning-zone generation in Gia Lai Province, Vietnam.",
          "The workflow is developed in K'Bang District and evaluated for geographic transferability in Mang Yang District. Public datasets are harmonized at a 1 km × 1 km grid-cell resolution, including Hansen Global Forest Change forest-cover and loss layers, SRTM elevation and slope, CHIRPS rainfall, and Sentinel-2 optical bands and vegetation/disturbance indices for the 2023 reporting year.",
          "A transparent baseline score is compared with logistic regression and random forest models. On the provided train-test split, logistic regression achieved AUC = 0.931, AP = 0.926, F1 = 0.881, and Capture@10% = 0.190; random forest achieved AUC = 0.942, AP = 0.914, F1 = 0.878, and Capture@10% = 0.184.",
          "For cross-district transfer to Mang Yang, random forest maintained AUC = 0.883 and Capture@10% = 0.271, confirming geographic generalization. Warning-zone maps flag the top 10% highest-risk cells and are validated against ranger patrol records, providing a direct operational output for forest rangers and conservation planners."
        ],
        vi: [
          "Giám sát mất rừng đòi hỏi bản đồ lịch sử đáng tin cậy và các tín hiệu rủi ro có thể chuyển hóa thành ưu tiên hành động thực tế. Nghiên cứu này trình bày một pipeline học máy có thể tái tạo, dựa trên lưới ô để dự báo nguy cơ mất rừng và tạo vùng cảnh báo tại tỉnh Gia Lai, Việt Nam.",
          "Quy trình được phát triển tại huyện K'Bang và đánh giá khả năng chuyển giao địa lý sang huyện Mang Yang. Các bộ dữ liệu công cộng được chuẩn hóa theo độ phân giải ô lưới 1 km × 1 km, bao gồm Hansen Global Forest Change, SRTM, CHIRPS và các chỉ số quang học Sentinel-2 cho năm 2023.",
          "Điểm nguy cơ cơ sở được so sánh với hồi quy logistic và mô hình rừng ngẫu nhiên. Trên tập train-test, hồi quy logistic đạt AUC = 0,931, AP = 0,926, F1 = 0,881; rừng ngẫu nhiên đạt AUC = 0,942, AP = 0,914, F1 = 0,878.",
          "Khi chuyển giao sang huyện Mang Yang, rừng ngẫu nhiên duy trì AUC = 0,883 và Capture@10% = 0,271, xác nhận khả năng tổng quát hóa địa lý. Bản đồ vùng cảnh báo đánh dấu 10% ô lưới có nguy cơ cao nhất và được xác thực với hồ sơ tuần tra kiểm lâm."
        ]
      },
      results: {
        en: [
          "Both logistic regression and random forest substantially improve discrimination relative to the baseline score. Logistic regression coefficients indicate the direction of association between standardized predictors and deforestation risk, while random forest feature importance highlights predictors that strongly contribute to the model's decisions.",
          "Random forest achieved AUC = 0.942 on the test set. For cross-district transfer to Mang Yang, random forest maintained AUC = 0.883 and Capture@10% = 0.271, confirming geographic generalization.",
        ],
        vi: [
          "Cả hồi quy logistic và rừng ngẫu nhiên đều cải thiện đáng kể khả năng phân biệt so với điểm nguy cơ cơ sở. Hệ số hồi quy logistic cho thấy hướng tương quan, trong khi mức độ quan trọng của đặc trưng trong rừng ngẫu nhiên làm nổi bật các yếu tố đóng góp mạnh.",
          "Rừng ngẫu nhiên đạt AUC = 0,942 trên tập kiểm tra. Khi chuyển giao sang Mang Yang, mô hình duy trì AUC = 0,883 và Capture@10% = 0,271, xác nhận khả năng tổng quát hóa địa lý.",
        ]
      },
      methodology: {
        en: [
          "01. Multi-Source Data Integration. Our pipeline leverages the computational power of Google Earth Engine to harmonize disparate geospatial datasets. The core challenge addressed is the alignment of heterogeneous spatial and temporal resolutions—from 10m Sentinel-2 bands to 30m SRTM terrain data—into a standardized 1 km resolution analytical master table.",
          "02. Feature Engineering. Vegetation indices (NDVI, EVI, NBR, NDWI), disturbance proxies, terrain derivatives (slope, aspect, curvature), and road network proximity from OpenStreetMap are computed for each 1 km grid cell. A binary outcome label is assigned based on Hansen loss-year data for the target reporting period.",
          "03. Modeling & Validation. Three approaches are compared: a transparent baseline risk score, logistic regression for interpretability, and a Random Forest ensemble for performance. Models are trained on K'Bang and transferred to Mang Yang to assess geographic generalizability."
        ],
        vi: [
          "01. Tích hợp dữ liệu đa nguồn. Pipeline tận dụng sức mạnh tính toán của Google Earth Engine để đồng bộ hóa các tập dữ liệu không gian địa lý từ nhiều nguồn khác nhau với độ phân giải không đồng nhất — từ dải phổ Sentinel-2 (10m) đến dữ liệu địa hình SRTM (30m) — vào bảng phân tích chuẩn hóa 1 km.",
          "02. Kỹ thuật đặc trưng. Các chỉ số thực vật (NDVI, EVI, NBR, NDWI), đại lượng đại diện nhiễu loạn, đặc trưng địa hình và khoảng cách đến mạng lưới đường (OpenStreetMap) được tính toán cho từng ô lưới 1 km. Nhãn kết quả nhị phân được gán dựa trên dữ liệu lossyear của Hansen.",
          "03. Mô hình hóa & Xác thực. Ba phương pháp được so sánh: điểm nguy cơ cơ sở, hồi quy logistic và Random Forest. Mô hình huấn luyện tại K'Bang và chuyển giao sang Mang Yang để kiểm tra khả năng tổng quát hóa địa lý."
        ]
      },
      datasets: {
        en: [
          "All inputs are public datasets accessed and processed within Google Earth Engine (GEE). The pipeline integrates: Hansen Global Forest Change (forest baseline + loss history), SRTM terrain (elevation + slope), CHIRPS rainfall, and Sentinel-2 optical predictors for the 2023 reporting year.",
          "Geospatial processing involves 3 steps: (i) define district boundaries and generate a 1 km analysis grid; (ii) compute outcome labels from the Hansen lossyear layer with a forest baseline mask applied; (iii) aggregate predictor layers into grid cells using summary statistics. The final feature table contains 6,000+ grid cells with ~25 features each."
        ],
        vi: [
          "Toàn bộ đầu vào là dữ liệu công cộng được truy cập và xử lý trên Google Earth Engine (GEE). Pipeline tích hợp: Hansen Global Forest Change (cơ sở rừng + lịch sử mất rừng), địa hình SRTM, lượng mưa CHIRPS và dữ liệu quang học Sentinel-2 cho năm 2023.",
          "Xử lý không gian gồm 3 bước: (i) xác định ranh giới huyện và tạo lưới phân tích 1 km; (ii) tính nhãn kết quả từ lớp lossyear của Hansen; (iii) tổng hợp các lớp đặc trưng vào ô lưới bằng thống kê tóm tắt. Bảng đặc trưng cuối cùng gồm 6.000+ ô lưới với ~25 đặc trưng mỗi ô."
        ]
      },
      citation: {
        en: [],
        vi: []
      }
    }
  },
  {
    id: 'paper-2026',
    status: 'upcoming' as const,
    journal: 'TBD',
    journalBadge: '',
    year: 2026,
    titleEn: 'Scaling Deforestation Risk Prediction to National Coverage — Vietnam',
    titleVi: 'Mở Rộng Bản Đồ Dự Báo Nguy Cơ Mất Rừng Lên Quy Mô Toàn Quốc — Việt Nam',
    authorsEn: 'VIGIL Research Team',
    authorsVi: 'Nhóm Nghiên Cứu VIGIL',
    locationTags: ["Vietnam (National)"],
    methodTags: ["Random Forest", "Time-series Analysis"],
    dataTags: ["Hansen", "Sentinel-2", "OpenStreetMap"],
    mdpiUrl: '',
    downloadUrl: '',
    citation: '',
    sections: {
      abstract: { en: ["This paper is currently in preparation. Check back for updates."], vi: ["Bài báo đang trong quá trình chuẩn bị. Vui lòng theo dõi cập nhật."] },
      results: { en: ["Coming soon."], vi: ["Sắp ra mắt."] },
      methodology: { en: ["Coming soon."], vi: ["Sắp ra mắt."] },
      datasets: { en: ["Coming soon."], vi: ["Sắp ra mắt."] },
      citation: { en: [], vi: [] }
    }
  }
];

type TabKey = 'abstract' | 'results' | 'methodology' | 'datasets' | 'citation';

const TABS_EN: { key: TabKey; label: string }[] = [
  { key: 'abstract', label: 'Abstract' },
  { key: 'results', label: 'Results' },
  { key: 'methodology', label: 'Methodology' },
  { key: 'datasets', label: 'Datasets' },
  { key: 'citation', label: 'Citation' },
];

const TABS_VI: { key: TabKey; label: string }[] = [
  { key: 'abstract', label: 'Tóm tắt' },
  { key: 'results', label: 'Kết quả' },
  { key: 'methodology', label: 'Phương pháp' },
  { key: 'datasets', label: 'Dữ liệu' },
  { key: 'citation', label: 'Trích dẫn' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PublicationPage() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const [selectedId, setSelectedId] = useState(PAPERS[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('abstract');
  const [detailsLang, setDetailsLang] = useState<'en' | 'vi'>(isVi ? 'vi' : 'en');
  const [citationCopied, setCitationCopied] = useState(false);

  const paper = PAPERS.find(p => p.id === selectedId)!;
  const tabs = isVi ? TABS_VI : TABS_EN;

  const handleSelectPaper = (id: string) => {
    setSelectedId(id);
    setDropdownOpen(false);
    setDetailsOpen(false);
    setActiveTab('abstract');
  };

  const handleCopyCitation = () => {
    if (paper.citation) {
      navigator.clipboard.writeText(paper.citation);
      setCitationCopied(true);
      setTimeout(() => setCitationCopied(false), 2000);
    }
  };

  const sectionContent = paper.sections[activeTab][detailsLang];

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        {/* ─── Page header ─── */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold mb-3 border"
            style={{ backgroundColor: '#e8f5ee', color: '#005e38', borderColor: 'rgba(0,94,56,0.3)' }}>
            <FileText size={13} />
            <span>{isVi ? 'Danh sách bài nghiên cứu' : 'Publications list'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#005e38' }}>
            {isVi ? 'Công Bố Khoa Học' : 'Scientific Publications'}
          </h1>
          <p className="text-gray-500 text-base">
            {isVi
              ? 'Các nghiên cứu học thuật từ dự án VIGIL về giám sát và dự báo nguy cơ mất rừng.'
              : 'Peer-reviewed research from the VIGIL project on forest loss monitoring and risk prediction.'}
          </p>
        </motion.div>

        {/* ─── Dropdown chọn paper ─── */}
        <motion.div className="relative mb-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            {isVi ? 'Chọn bài nghiên cứu' : 'Select paper'}
          </p>
          {/* Dropdown trigger */}
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 bg-white text-left font-semibold text-sm transition-all"
            style={{ borderColor: dropdownOpen ? '#005e38' : '#d1d5db', color: '#1e293b' }}
          >
            <span className="truncate pr-4">
              {isVi ? paper.titleVi : paper.titleEn}
            </span>
            <ChevronDown size={18} className={`flex-shrink-0 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute z-30 w-full mt-1 bg-white border rounded-xl shadow-2xl overflow-hidden"
                style={{ borderColor: '#005e38' }}
              >
                {PAPERS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPaper(p.id)}
                    className={`w-full text-left px-4 py-3.5 text-sm font-medium border-b last:border-0 transition-colors flex items-center gap-3 ${
                      p.id === selectedId ? 'text-white' : 'text-gray-700 hover:bg-[#e8f5ee]'
                    }`}
                    style={p.id === selectedId ? { backgroundColor: '#005e38' } : {}}
                  >
                    <span className="flex-1">{isVi ? p.titleVi : p.titleEn} — {p.year}</span>
                    {p.id === selectedId && <CheckCircle size={15} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─── Paper card ─── */}
        <motion.div
          key={paper.id}
          className="bg-white rounded-2xl border shadow-lg overflow-hidden"
          style={{ borderColor: 'rgba(0,94,56,0.15)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          {/* Card header */}
          <div className="p-6 md:p-8 border-b" style={{ borderColor: 'rgba(0,94,56,0.1)' }}>
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {paper.status === 'accepted' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle size={11} /> {isVi ? 'Đã chấp nhận' : 'Accepted'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <Clock size={11} /> {isVi ? 'Sắp ra mắt' : 'Upcoming'}
                </span>
              )}
              {paper.journalBadge && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {paper.journal} · {paper.journalBadge}
                </span>
              )}
              <span className="ml-auto text-sm font-bold text-gray-400">{paper.year}</span>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-black mb-3 leading-snug" style={{ color: '#005e38' }}>
              {isVi ? paper.titleVi : paper.titleEn}
            </h2>

            {/* Authors */}
            <p className="text-sm text-gray-500 mb-5">
              {isVi ? paper.authorsVi : paper.authorsEn}
            </p>

            {/* Location tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {paper.locationTags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: '#e8f5ee', color: '#005e38' }}>
                  ◆ {tag}
                </span>
              ))}
              {paper.methodTags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: '#e8f5ee', color: '#005e38' }}>
                  ◆ {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {paper.dataTags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: '#fef3e0', color: '#c98d26' }}>
                  ◆ {tag}
                </span>
              ))}
            </div>

            {/* Action buttons row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* View / Hide details */}
              <button
                onClick={() => setDetailsOpen(o => !o)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all"
                style={detailsOpen
                  ? { borderColor: '#F4D668', backgroundColor: '#F4D668', color: '#005e38' }
                  : { borderColor: '#F4D668', backgroundColor: 'transparent', color: '#005e38' }
                }
              >
                {detailsOpen
                  ? <><ChevronUp size={16} /> {isVi ? 'Ẩn chi tiết' : 'Hide details'}</>
                  : <><ChevronDown size={16} /> {isVi ? 'Xem chi tiết' : 'View details'}</>
                }
              </button>

              {/* Read on MDPI */}
              {paper.mdpiUrl && paper.status === 'accepted' ? (
                <a href={paper.mdpiUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all hover:bg-gray-50"
                  style={{ borderColor: '#d1d5db', color: '#374151' }}>
                  <ExternalLink size={15} /> {isVi ? 'Đọc trên MDPI' : 'Read on MDPI'}
                </a>
              ) : null}

              {/* Download */}
              {paper.downloadUrl && (
                <a href={paper.downloadUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all hover:bg-gray-50"
                  style={{ borderColor: '#d1d5db', color: '#374151' }}>
                  <Download size={15} /> {isVi ? 'Tải bài báo' : 'Download Paper'}
                </a>
              )}

              {/* Cite */}
              {paper.citation && (
                <button onClick={handleCopyCitation}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all hover:bg-gray-50 ml-auto"
                  style={{ borderColor: citationCopied ? '#005e38' : '#d1d5db', color: citationCopied ? '#005e38' : '#6b7280' }}>
                  <span>{citationCopied ? '✓' : '□'}</span>
                  {citationCopied ? (isVi ? 'Đã sao chép!' : 'Copied!') : (isVi ? 'Trích dẫn' : 'Cite')}
                </button>
              )}
            </div>
          </div>

          {/* ─── Collapsible details ─── */}
          <AnimatePresence>
            {detailsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                {/* Tabs + Lang row */}
                <div className="border-b flex items-center justify-between px-4 md:px-8 gap-4 bg-gray-50"
                  style={{ borderColor: 'rgba(0,94,56,0.1)' }}>
                  {/* Section tabs */}
                  <div className="flex gap-0 overflow-x-auto no-scrollbar -mb-px pt-3">
                    {tabs.map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2.5 text-sm font-bold whitespace-nowrap border-b-2 transition-colors mr-1 ${
                          activeTab === tab.key
                            ? 'border-[#005e38] text-[#005e38]'
                            : 'border-transparent text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  {/* Language toggle */}
                  <div className="flex gap-1 flex-shrink-0 py-2">
                    {(['en', 'vi'] as const).map(lang => (
                      <button key={lang}
                        onClick={() => setDetailsLang(lang)}
                        className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                        style={detailsLang === lang
                          ? { backgroundColor: '#005e38', color: '#fff' }
                          : { backgroundColor: '#e8f5ee', color: '#005e38' }
                        }>
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content area */}
                <div className="p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div key={`${activeTab}-${detailsLang}`}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}>

                      {activeTab === 'citation' ? (
                        /* Citation block */
                        <div>
                          <p className="text-sm text-gray-500 mb-3">
                            {isVi ? 'Sao chép trích dẫn BibTeX:' : 'Copy BibTeX citation:'}
                          </p>
                          <pre className="bg-gray-900 text-green-400 p-5 rounded-xl text-xs leading-relaxed overflow-x-auto font-mono">
                            {paper.citation || (isVi ? '# Chưa có trích dẫn.' : '# Citation not yet available.')}
                          </pre>
                          <button onClick={handleCopyCitation}
                            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                            style={{ backgroundColor: citationCopied ? '#005e38' : '#F4D668', color: '#005e38' }}>
                            {citationCopied ? '✓ ' + (isVi ? 'Đã sao chép' : 'Copied!') : (isVi ? 'Sao chép BibTeX' : 'Copy BibTeX')}
                          </button>
                        </div>
                      ) : activeTab === 'results' && detailsLang === 'en' ? (
                        /* Results with images */
                        <div className="space-y-4">
                          {sectionContent.map((p, i) => (
                            <p key={i} className="text-gray-700 leading-relaxed text-base">{p}</p>
                          ))}
                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col items-center">
                              <img src="/images/Figure3_ROC_split.png" alt="ROC curves"
                                className="rounded-xl shadow-md max-w-full h-auto border" style={{ borderColor: 'rgba(0,94,56,0.15)' }} />
                              <span className="text-xs text-gray-400 mt-2 italic text-center">Figure 1. ROC curves (train-test split)</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <img src="/images/Figure6_RF_importance.png" alt="Feature importance"
                                className="rounded-xl shadow-md max-w-full h-auto border" style={{ borderColor: 'rgba(0,94,56,0.15)' }} />
                              <span className="text-xs text-gray-400 mt-2 italic text-center">Figure 2. Random Forest feature importance</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Generic content */
                        <div className="space-y-4">
                          {sectionContent.map((p, i) => (
                            <p key={i} className="text-gray-700 leading-relaxed text-base">{p}</p>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
