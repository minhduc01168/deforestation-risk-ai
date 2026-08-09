"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function PublicationPage() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Selected paper in dropdown
  const [selectedPaper, setSelectedPaper] = useState<string>('all');
  
  // Expanded panels
  const [paper1Expanded, setPaper1Expanded] = useState<boolean>(true);

  // Tabs inside Paper 1 expand panel
  const [activeTab, setActiveTab] = useState<'abstract' | 'findings' | 'method' | 'data' | 'cite'>('abstract');
  
  // Sub-state inside Abstract tab
  const [abstractLang, setAbstractLang] = useState<'en' | 'vi'>(isVi ? 'vi' : 'en');

  // Sub-state inside Citation tab
  const [citeType, setCiteType] = useState<'apa' | 'bib'>('apa');

  // Toast message
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    showToast(label);
  };

  const copyBibtex = () => {
    const bib = `@article{pham2025deforestation,
  title   = {An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution},
  author  = {Phạm, Duy Long and Nguyễn, Vũ Huy and Nguyễn, Đức Anh and Đỗ, Nhật Quang and Đàm, Anh Thư and Trần, Đăng An},
  journal = {Remote Sensing},
  publisher = {MDPI},
  year    = {2025},
  note    = {Q1, Scopus-indexed}
}`;
    copyText(bib, isVi ? 'Đã sao chép BibTeX' : 'BibTeX copied to clipboard');
  };

  const copyApa = () => {
    const apa = 'Phạm, D. L., Nguyễn, V. H., Nguyễn, Đ. A., Đỗ, N. Q., Đàm, A. T., & Trần, Đ. A. (2025). An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution. Remote Sensing. MDPI. Q1.';
    copyText(apa, isVi ? 'Đã sao chép trích dẫn APA' : 'APA citation copied');
  };

  const paperCount = selectedPaper === 'all' ? 2 : 1;

  return (
    <div className="min-h-screen bg-[#0A1F15] text-[#F0EDE6] pt-16 pb-20 relative overflow-x-hidden font-sans">
      {/* Load Google Fonts matching exact HTML spec */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        
        :root {
          --forest-deep: #0A1F15;
          --forest-mid: #122B1C;
          --forest-card: #172E20;
          --forest-border: #2A4F35;
          --sage: #3D7A55;
          --leaf: #72BF82;
          --leaf-dim: #4E9960;
          --cream: #F0EDE6;
          --muted: #8FA898;
          --amber: #D4A843;
          --amber-bg: #2A2410;
          --accepted: #4CAF70;
          --accepted-bg: #0D2A1A;
          --mono: 'JetBrains Mono', monospace;
          --display: 'Space Grotesk', sans-serif;
          --body: 'Inter', sans-serif;
        }

        .font-display { font-family: var(--display); }
        .font-mono-custom { font-family: var(--mono); }
        .font-body-custom { font-family: var(--body); }
      `}</style>

      {/* GRID TEXTURE */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(114,191,130,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(114,191,130,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)'
        }}
      />

      {/* HERO SECTION */}
      <div className="relative pt-16 pb-14 px-6 text-center overflow-hidden max-w-4xl mx-auto">
        <div className="font-mono-custom text-xs text-[#72BF82] tracking-[0.15em] uppercase mb-5">
          / Publications & Research
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-4 text-[#F0EDE6]">
          Science at the<br />
          <span className="text-[#72BF82]">core of conservation</span>
        </h1>
        <p className="text-[#8FA898] text-base md:text-lg max-w-[520px] mx-auto mb-14 font-light leading-relaxed">
          {isVi
            ? 'VIGIL tiếp cận công tác bảo vệ rừng thông qua nghiên cứu mở, có thể kiểm chứng độc lập và triển khai vào thực tế.'
            : 'VIGIL approaches forest protection through open, reproducible research — publishing findings that can be independently verified and operationally deployed.'
          }
        </p>

        {/* Stats Row */}
        <div className="flex justify-center max-w-[520px] mx-auto rounded-xl overflow-hidden border border-[#2A4F35] bg-[#172E20]/60">
          <div className="flex-1 p-5 border-r border-[#2A4F35] text-center">
            <div className="font-display text-3xl md:text-4xl font-bold text-[#72BF82] leading-none mb-1">1</div>
            <div className="font-mono-custom text-[10px] text-[#8FA898] tracking-[0.08em] uppercase">Published</div>
          </div>
          <div className="flex-1 p-5 border-r border-[#2A4F35] text-center">
            <div className="font-display text-3xl md:text-4xl font-bold text-[#72BF82] leading-none mb-1">Q1</div>
            <div className="font-mono-custom text-[10px] text-[#8FA898] tracking-[0.08em] uppercase">Journal rank</div>
          </div>
          <div className="flex-1 p-5 text-center">
            <div className="font-display text-3xl md:text-4xl font-bold text-[#72BF82] leading-none mb-1">2+</div>
            <div className="font-mono-custom text-[10px] text-[#8FA898] tracking-[0.08em] uppercase">In pipeline</div>
          </div>
        </div>
      </div>

      {/* MAIN PUBLICATIONS SECTION */}
      <section className="max-w-[900px] mx-auto px-6 pb-20 relative z-10">
        {/* Section Label */}
        <div className="font-mono-custom text-[10px] text-[#3D7A55] tracking-[0.15em] uppercase mb-6 flex items-center gap-3">
          <span>Publications</span>
          <div className="flex-1 h-[1px] bg-[#2A4F35]"></div>
        </div>

        {/* Filter Dropdown Selector */}
        <div className="mb-8 max-w-[520px]">
          <div className="font-mono-custom text-[10px] text-[#8FA898] tracking-[0.1em] uppercase mb-2">
            Chọn bài nghiên cứu
          </div>
          <div className="relative">
            <select
              id="paper-select"
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="w-full appearance-none bg-[#172E20] border border-[#2A4F35] rounded-xl px-4 py-3 font-body-custom text-sm text-[#F0EDE6] cursor-pointer outline-none focus:border-[#72BF82] transition-colors pr-10 shadow-sm"
            >
              <option value="all">Tất cả</option>
              <option value="paper-1">An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution — 2025</option>
              <option value="paper-2">Scaling Deforestation Risk Prediction to National Coverage — Vietnam — 2026</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#72BF82] text-xs">
              ▾
            </div>
          </div>
          <div className="font-mono-custom text-[11px] text-[#8FA898] mt-1.5">
            {paperCount} bài nghiên cứu
          </div>
        </div>

        {/* PAPER 1 — Published */}
        {(selectedPaper === 'all' || selectedPaper === 'paper-1') && (
          <div className={`bg-[#172E20] border rounded-2xl p-7 md:p-8 mb-4 transition-colors ${paper1Expanded ? 'border-[#72BF82]' : 'border-[#2A4F35] hover:border-[#3D7A55]'}`}>
            {/* Top Badge Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex gap-2 flex-wrap">
                <span className="font-mono-custom text-[10px] tracking-[0.08em] px-2.5 py-1 rounded-full font-medium bg-[#0D2A1A] text-[#4CAF70] border border-[#4CAF70]/30">
                  ✓ Accepted
                </span>
                <span className="font-mono-custom text-[10px] tracking-[0.08em] px-2.5 py-1 rounded-full font-medium bg-[#3D7A55]/15 text-[#72BF82] border border-[#72BF82]/20">
                  MDPI Remote Sensing · Q1
                </span>
              </div>
              <span className="font-mono-custom text-xs text-[#8FA898]">2025</span>
            </div>

            {/* Title & Authors */}
            <h2 className="font-display text-lg md:text-xl font-semibold leading-snug tracking-tight text-[#F0EDE6] mb-1.5">
              An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution
            </h2>
            <div className="text-xs md:text-sm text-[#8FA898] mb-4">
              Phạm Duy Long · Nguyễn Vũ Huy · Nguyễn Đức Anh · Đỗ Nhật Quang · Đàm Anh Thư · Trần Đăng An
            </div>

            <hr className="border-t border-[#2A4F35] my-4" />

            {/* Meta Info Dots */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono-custom text-[11px] text-[#8FA898] mb-5">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D7A55] flex-shrink-0"></span>
                Gia Lai Province · K'Bang · Mang Yang
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D7A55] flex-shrink-0"></span>
                Random Forest · Logistic Regression
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D7A55] flex-shrink-0"></span>
                Hansen · SRTM · CHIRPS · Sentinel-2
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <button
                onClick={() => setPaper1Expanded(prev => !prev)}
                className="px-4 py-2 rounded-md text-xs font-medium bg-[#72BF82] text-[#0A1F15] hover:bg-[#89d499] transition-colors inline-flex items-center gap-1.5"
              >
                {paper1Expanded ? '↑ Hide details' : '↓ View details'}
              </button>

              <button
                onClick={() => showToast(isVi ? 'Bài báo sắp xuất bản chính thức trên MDPI Remote Sensing' : 'Paper coming soon on MDPI Remote Sensing')}
                className="px-4 py-2 rounded-md text-xs font-medium bg-transparent text-[#F0EDE6] border border-[#2A4F35] hover:border-[#3D7A55] transition-colors inline-flex items-center gap-1.5"
              >
                Read on MDPI ↗
              </button>

              <a
                href="https://github.com/Borino88/deforestation-risk-vietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md text-xs font-medium bg-transparent text-[#F0EDE6] border border-[#2A4F35] hover:border-[#3D7A55] transition-colors inline-flex items-center gap-1.5"
              >
                ⬇ Download Paper
              </a>

              <button
                onClick={copyBibtex}
                className="px-3 py-2 rounded-md text-xs font-mono-custom text-[#8FA898] hover:text-[#F0EDE6] transition-colors"
              >
                📋 Cite
              </button>
            </div>

            {/* EXPAND PANEL */}
            {paper1Expanded && (
              <div className="mt-5 border-t border-[#2A4F35] pt-5">
                {/* Tabs Bar */}
                <div className="flex border-b border-[#2A4F35] gap-0 mb-5 overflow-x-auto">
                  {(['abstract', 'findings', 'method', 'data', 'cite'] as const).map((tId) => (
                    <button
                      key={tId}
                      onClick={() => setActiveTab(tId)}
                      className={`px-4.5 py-2 text-xs md:text-sm font-medium transition-colors border-b-2 whitespace-nowrap bg-none ${
                        activeTab === tId
                          ? 'text-[#72BF82] border-[#72BF82]'
                          : 'text-[#8FA898] border-transparent hover:text-[#F0EDE6]'
                      }`}
                    >
                      {tId === 'abstract' && 'Abstract'}
                      {tId === 'findings' && 'Results'}
                      {tId === 'method' && 'Methodology'}
                      {tId === 'data' && 'Datasets'}
                      {tId === 'cite' && 'Citation'}
                    </button>
                  ))}
                </div>

                {/* Tab 1: Abstract */}
                {activeTab === 'abstract' && (
                  <div>
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setAbstractLang('en')}
                        className={`font-mono-custom text-[11px] px-2.5 py-1 rounded border transition-colors ${
                          abstractLang === 'en' ? 'text-[#72BF82] border-[#2A4F35] bg-[#72BF82]/10' : 'text-[#8FA898] border-[#2A4F35]'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setAbstractLang('vi')}
                        className={`font-mono-custom text-[11px] px-2.5 py-1 rounded border transition-colors ${
                          abstractLang === 'vi' ? 'text-[#72BF82] border-[#2A4F35] bg-[#72BF82]/10' : 'text-[#8FA898] border-[#2A4F35]'
                        }`}
                      >
                        VI
                      </button>
                    </div>

                    {abstractLang === 'en' ? (
                      <p className="text-[#8FA898] text-sm leading-[1.75] max-w-[700px] mb-4">
                        Deforestation monitoring requires reliable historical mapping and actionable risk signals that can be translated into operational priorities. This study presents a reproducible, grid-based machine-learning pipeline for deforestation-risk prediction and warning-zone generation in Gia Lai Province, Vietnam. The workflow is developed in K'Bang District and evaluated for geographic transferability in Mang Yang District. Public datasets are harmonized at a 1 km × 1 km grid-cell resolution, including Hansen Global Forest Change forest-cover and loss layers, SRTM elevation and slope, CHIRPS rainfall, and Sentinel-2 optical bands and vegetation/disturbance indices for the 2023 reporting year. A transparent baseline score is compared with logistic regression and random forest models. On the provided train-test split, logistic regression achieved AUC = 0.931, AP = 0.926, F1 = 0.881, and Capture@10% = 0.190; random forest achieved AUC = 0.942, AP = 0.914, F1 = 0.878, and Capture@10% = 0.184. For cross-district transfer from K'Bang to Mang Yang, logistic regression and random forest achieved AUC values of 0.743 and 0.767 and Capture@10% values of 0.170 and 0.145, respectively. The resulting data architecture, validation design, explainability outputs, and map-ready warning products provide a transparent foundation for district-scale monitoring and future expansion across Vietnam. This research has been accepted for publication in MDPI Remote Sensing (Q1, Scopus-indexed), with print scheduled for September 2025.
                      </p>
                    ) : (
                      <p className="text-[#8FA898] text-sm leading-[1.75] max-w-[700px] mb-4">
                        Giám sát phá rừng đòi hỏi cả bản đồ lịch sử đáng tin cậy lẫn tín hiệu nguy cơ có thể chuyển hóa thành ưu tiên vận hành. Nghiên cứu này trình bày một pipeline học máy dạng lưới, có khả năng tái tạo, nhằm dự đoán nguy cơ phá rừng và tạo vùng cảnh báo cho tỉnh Gia Lai, Việt Nam. Quy trình được phát triển tại huyện K'Bang và đánh giá khả năng chuyển vùng tại huyện Mang Yang. Các tập dữ liệu công khai được tích hợp ở độ phân giải ô lưới 1 km × 1 km, bao gồm Hansen Global Forest Change, SRTM, CHIRPS và các chỉ số quang học Sentinel-2 năm 2023. Trên tập phân chia huấn luyện-kiểm tra, hồi quy logistic đạt AUC = 0,931, F1 = 0,881 và Capture@10% = 0,190; rừng ngẫu nhiên đạt AUC = 0,942, F1 = 0,878 và Capture@10% = 0,184. Trong bài kiểm tra chuyển vùng K'Bang → Mang Yang, hồi quy logistic và rừng ngẫu nhiên đạt AUC lần lượt là 0,743 và 0,767 và Capture@10% là 0,170 và 0,145. Nghiên cứu này đã được chấp nhận đăng trên tạp chí MDPI Remote Sensing (Q1, chỉ mục Scopus), dự kiến xuất bản vào tháng 9 năm 2025.
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      {[
                        'deforestation', 'Vietnam · Gia Lai', 'risk mapping', 'grid-based modeling',
                        'interpretable machine learning', 'random forest', 'Sentinel-2', 'Hansen GFC'
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="font-mono-custom text-[10px] text-[#3D7A55] bg-[#3D7A55]/10 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Results */}
                {activeTab === 'findings' && (
                  <div>
                    {/* 3 Headline numbers */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="bg-[#0A1F15]/60 border border-[#2A4F35] rounded-xl p-4 text-center">
                        <div className="font-display text-2xl font-bold text-[#72BF82] leading-none mb-1">0.942</div>
                        <div className="text-[11px] text-[#8FA898] leading-tight">AUC · Random Forest<br />Internal split</div>
                      </div>
                      <div className="bg-[#0A1F15]/60 border border-[#2A4F35] rounded-xl p-4 text-center">
                        <div className="font-display text-2xl font-bold text-[#72BF82] leading-none mb-1">0.767</div>
                        <div className="text-[11px] text-[#8FA898] leading-tight">AUC · Transfer test<br />K'Bang → Mang Yang</div>
                      </div>
                      <div className="bg-[#0A1F15]/60 border border-[#2A4F35] rounded-xl p-4 text-center">
                        <div className="font-display text-xl font-bold text-[#72BF82] leading-none mb-1">19.0%</div>
                        <div className="text-[11px] text-[#8FA898] leading-tight">Capture@10%<br />Logistic Regression</div>
                      </div>
                    </div>

                    {/* Full Performance Table */}
                    <div className="font-mono-custom text-[10px] text-[#3D7A55] tracking-[0.08em] uppercase mb-2">
                      Model Performance (Table 3)
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-[#2A4F35] mb-3">
                      <table className="w-full text-left text-xs min-w-[540px]">
                        <thead className="bg-[#0A1F15] font-mono-custom text-[10px] text-[#3D7A55] uppercase border-b border-[#2A4F35]">
                          <tr>
                            <th className="p-2.5">Scenario</th>
                            <th className="p-2.5">Model</th>
                            <th className="p-2.5">AUC</th>
                            <th className="p-2.5">F1</th>
                            <th className="p-2.5">Capture@5%</th>
                            <th className="p-2.5">Capture@10%</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2A4F35]/40 text-[#8FA898]">
                          <tr className="opacity-50">
                            <td className="p-2.5 text-[#F0EDE6] font-medium">Internal split</td>
                            <td className="p-2.5">Baseline</td>
                            <td className="p-2.5">0.504</td>
                            <td className="p-2.5">0.491</td>
                            <td className="p-2.5">7.7%</td>
                            <td className="p-2.5">12.9%</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 text-[#F0EDE6] font-medium">Internal split</td>
                            <td className="p-2.5">Logistic Reg.</td>
                            <td className="p-2.5">0.931</td>
                            <td className="p-2.5">0.881</td>
                            <td className="p-2.5">9.5%</td>
                            <td className="p-2.5 text-[#72BF82] font-medium">19.0%</td>
                          </tr>
                          <tr className="bg-[#72BF82]/5">
                            <td className="p-2.5 text-[#F0EDE6] font-medium">Internal split</td>
                            <td className="p-2.5 text-[#72BF82] font-medium">Random Forest</td>
                            <td className="p-2.5 text-[#72BF82] font-medium">0.942</td>
                            <td className="p-2.5">0.878</td>
                            <td className="p-2.5">9.2%</td>
                            <td className="p-2.5">18.4%</td>
                          </tr>
                          <tr className="opacity-50">
                            <td className="p-2.5 text-[#F0EDE6] font-medium">Transfer test</td>
                            <td className="p-2.5">Baseline</td>
                            <td className="p-2.5">0.376</td>
                            <td className="p-2.5">0.654</td>
                            <td className="p-2.5">2.8%</td>
                            <td className="p-2.5">5.9%</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 text-[#F0EDE6] font-medium">Transfer test</td>
                            <td className="p-2.5">Logistic Reg.</td>
                            <td className="p-2.5">0.743</td>
                            <td className="p-2.5">0.666</td>
                            <td className="p-2.5">8.8%</td>
                            <td className="p-2.5">17.0%</td>
                          </tr>
                          <tr className="bg-[#72BF82]/5">
                            <td className="p-2.5 text-[#F0EDE6] font-medium">Transfer test</td>
                            <td className="p-2.5 text-[#72BF82] font-medium">Random Forest</td>
                            <td className="p-2.5 text-[#72BF82] font-medium">0.767</td>
                            <td className="p-2.5">0.671</td>
                            <td className="p-2.5">7.5%</td>
                            <td className="p-2.5">14.5%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-[#0A1F15]/60 border border-[#2A4F35] rounded-lg p-3 text-xs text-[#8FA898] leading-relaxed">
                      <strong className="text-[#F0EDE6]">Notable:</strong> Logistic Regression achieved Capture@10% = 19.0% — slightly higher than Random Forest (18.4%) on the internal split. The simpler, interpretable model outperforms on the most operationally relevant metric.
                    </div>
                  </div>
                )}

                {/* Tab 3: Methodology */}
                {activeTab === 'method' && (
                  <div className="space-y-4">
                    {/* Step 01 */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono-custom text-[10px] text-[#72BF82] bg-[#72BF82]/10 border border-[#72BF82]/20 px-2.5 py-0.5 rounded-full">01</span>
                        <span className="text-sm font-semibold text-[#F0EDE6]">Grid Construction</span>
                      </div>
                      <p className="text-xs text-[#8FA898] leading-relaxed">
                        The study area is partitioned into 1 km × 1 km grid cells, each assigned a unique <code className="font-mono-custom text-[11px] bg-white/5 px-1.5 py-0.5 rounded">cell_id</code>. Labels and predictors are aggregated to this footprint to ensure spatial consistency across all three datasets and to support transparent mapping at district scale.
                      </p>
                    </div>

                    {/* Step 02 */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono-custom text-[10px] text-[#72BF82] bg-[#72BF82]/10 border border-[#72BF82]/20 px-2.5 py-0.5 rounded-full">02</span>
                        <span className="text-sm font-semibold text-[#F0EDE6]">Outcome Definition</span>
                      </div>
                      <p className="text-xs text-[#8FA898] leading-relaxed">
                        A binary label is derived from the Hansen <code className="font-mono-custom text-[11px] bg-white/5 px-1.5 py-0.5 rounded">lossyear</code> layer — a cell is positive if any forest loss occurred within it during 2001–2024. To focus on forested landscapes and reduce label noise, cells are filtered using baseline canopy cover (<code className="font-mono-custom text-[11px] bg-white/5 px-1.5 py-0.5 rounded">treecover2000 ≥ 30%</code>). Samples are balanced ~50/50 to stabilize model fitting. An auxiliary field (<code className="font-mono-custom text-[11px] bg-white/5 px-1.5 py-0.5 rounded">loss_first_year</code>) records the earliest observed loss year per cell for future temporal-validation designs.
                      </p>
                    </div>

                    {/* Step 03 */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono-custom text-[10px] text-[#72BF82] bg-[#72BF82]/10 border border-[#72BF82]/20 px-2.5 py-0.5 rounded-full">03</span>
                        <span className="text-sm font-semibold text-[#F0EDE6]">Models Compared</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="bg-[#0A1F15]/60 border border-[#2A4F35] rounded-lg p-3">
                          <div className="font-mono-custom text-[10px] text-[#8FA898] mb-1">BASELINE</div>
                          <div className="text-xs font-medium text-[#F0EDE6] mb-1">Risk Score</div>
                          <div className="text-[11px] text-[#8FA898]">Standardized benchmark — minimal reference</div>
                        </div>
                        <div className="bg-[#0A1F15]/60 border border-[#2A4F35] rounded-lg p-3">
                          <div className="font-mono-custom text-[10px] text-[#8FA898] mb-1">INTERPRETABLE</div>
                          <div className="text-xs font-medium text-[#F0EDE6] mb-1">Logistic Regression</div>
                          <div className="text-[11px] text-[#8FA898]">Coefficients show direction of risk drivers</div>
                        </div>
                        <div className="bg-[#0A1F15]/60 border border-[#72BF82]/30 rounded-lg p-3">
                          <div className="font-mono-custom text-[10px] text-[#72BF82] mb-1">BEST AUC</div>
                          <div className="text-xs font-medium text-[#F0EDE6] mb-1">Random Forest</div>
                          <div className="text-[11px] text-[#8FA898]">Captures non-linear relationships</div>
                        </div>
                      </div>
                    </div>

                    {/* Step 04 */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono-custom text-[10px] text-[#72BF82] bg-[#72BF82]/10 border border-[#72BF82]/20 px-2.5 py-0.5 rounded-full">04</span>
                        <span className="text-sm font-semibold text-[#F0EDE6]">Validation Design</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                        <div className="bg-[#0A1F15]/60 border border-[#2A4F35] rounded-lg p-3">
                          <div className="text-xs font-medium text-[#F0EDE6] mb-1">Provided Split</div>
                          <div className="text-[11px] text-[#8FA898]">80/20 hold-out within combined sample · N = 1,212 test cells</div>
                        </div>
                        <div className="bg-[#0A1F15]/60 border border-[#2A4F35] rounded-lg p-3">
                          <div className="text-xs font-medium text-[#F0EDE6] mb-1">District Transfer Test</div>
                          <div className="text-[11px] text-[#8FA898]">Train K'Bang → test Mang Yang (unseen) · N = 2,000 test cells</div>
                        </div>
                      </div>
                      <div className="font-mono-custom text-[11px] text-[#8FA898]">
                        Metrics: AUC · AP · Precision · Recall · F1 · Capture@5% · Capture@10%
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Datasets */}
                {activeTab === 'data' && (
                  <div className="space-y-2 mb-3">
                    {[
                      { name: "Hansen GFC v1.12", res: "30 m · 2000–2024", desc: "Forest baseline + historical loss labels", vars: "treecover2000, lossyear-derived labels", role: "Forest baseline + historical loss label" },
                      { name: "SRTM", res: "30–90 m · Static", desc: "NASA Shuttle Radar Topography Mission", vars: "mean_elevation_m, mean_slope_deg", role: "Terrain predictors" },
                      { name: "CHIRPS", res: "~5 km · 2000–2025", desc: "Climate Hazards Infrared Precipitation", vars: "rain_last12m_total_mm, rain_mean_annual", role: "Rainfall predictors" },
                      { name: "Sentinel-2", res: "10–20 m · 2023 composite", desc: "ESA optical surface reflectance", vars: "B2, B3, B4, B8, B11, B12, NDVI, NBR", role: "Optical predictors — vegetation & disturbance" },
                      { name: "OpenStreetMap", res: "Vector · Snapshot", desc: "Community road network data", vars: "road_network, distance_to_nearest_road", role: "Accessibility predictor" },
                      { name: "Global Forest Watch", res: "Native alert grid · 2021–present", desc: "WRI integrated deforestation alerts", vars: "alert_presence, alert_intensity", role: "Independent disturbance-reference layer" }
                    ].map((ds, idx) => (
                      <div key={idx} className="bg-[#0A1F15]/60 border border-[#2A4F35] rounded-lg p-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                        <div>
                          <div className="text-xs font-semibold text-[#F0EDE6] mb-0.5">{ds.name}</div>
                          <div className="font-mono-custom text-[10px] text-[#72BF82] mb-1">{ds.res}</div>
                          <div className="text-[11px] text-[#8FA898]">{ds.desc}</div>
                        </div>
                        <div>
                          <div className="font-mono-custom text-[10px] text-[#8FA898] mb-1">Variables</div>
                          <code className="font-mono-custom text-[10px] bg-white/5 px-1.5 py-0.5 rounded block text-[#F0EDE6] leading-relaxed break-all">
                            {ds.vars}
                          </code>
                        </div>
                        <div>
                          <div className="font-mono-custom text-[10px] text-[#8FA898] mb-1">Role</div>
                          <div className="text-[11px] text-[#8FA898]">{ds.role}</div>
                        </div>
                      </div>
                    ))}
                    <div className="font-mono-custom text-[10px] text-[#8FA898] mt-2">
                      All datasets are publicly available. Processed via Google Earth Engine (GEE) + Python.
                    </div>
                  </div>
                )}

                {/* Tab 5: Citation */}
                {activeTab === 'cite' && (
                  <div>
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setCiteType('apa')}
                        className={`font-mono-custom text-[11px] px-3 py-1 rounded border transition-colors ${
                          citeType === 'apa' ? 'text-[#72BF82] border-[#2A4F35] bg-[#72BF82]/10' : 'text-[#8FA898] border-[#2A4F35]'
                        }`}
                      >
                        APA
                      </button>
                      <button
                        onClick={() => setCiteType('bib')}
                        className={`font-mono-custom text-[11px] px-3 py-1 rounded border transition-colors ${
                          citeType === 'bib' ? 'text-[#72BF82] border-[#2A4F35] bg-[#72BF82]/10' : 'text-[#8FA898] border-[#2A4F35]'
                        }`}
                      >
                        BibTeX
                      </button>
                    </div>

                    {citeType === 'apa' ? (
                      <div>
                        <div className="bg-[#0A1F15]/80 border border-[#2A4F35] rounded-lg p-4 font-mono-custom text-xs text-[#8FA898] leading-relaxed mb-3">
                          Phạm, D. L., Nguyễn, V. H., Nguyễn, Đ. A., Đỗ, N. Q., Đàm, A. T., &amp; Trần, Đ. A. (2025). An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution. <em>Remote Sensing</em>. MDPI. Q1.
                        </div>
                        <button
                          onClick={copyApa}
                          className="font-mono-custom text-xs text-[#72BF82] bg-transparent border border-[#2A4F35] rounded px-3 py-1 hover:bg-[#72BF82]/10 transition-colors"
                        >
                          📋 Copy APA
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="bg-[#0A1F15]/80 border border-[#2A4F35] rounded-lg p-4 font-mono-custom text-xs text-[#8FA898] leading-relaxed mb-3 whitespace-pre-wrap break-all">
{`@article{pham2025deforestation,
  title   = {An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution},
  author  = {Phạm, Duy Long and Nguyễn, Vũ Huy and Nguyễn, Đức Anh and Đỗ, Nhật Quang and Đàm, Anh Thư and Trần, Đăng An},
  journal = {Remote Sensing},
  publisher = {MDPI},
  year    = {2025},
  note    = {Q1, Scopus-indexed}
}`}
                        </div>
                        <button
                          onClick={copyBibtex}
                          className="font-mono-custom text-xs text-[#72BF82] bg-transparent border border-[#2A4F35] rounded px-3 py-1 hover:bg-[#72BF82]/10 transition-colors"
                        >
                          📋 Copy BibTeX
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* PAPER 2 — Coming Soon / In Progress */}
        {(selectedPaper === 'all' || selectedPaper === 'paper-2') && (
          <div className="bg-[#172E20] border border-[#2A4F35] hover:border-[#3D7A55] rounded-2xl p-7 md:p-8 mb-4 transition-colors">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex gap-2">
                <span className="font-mono-custom text-[10px] tracking-[0.08em] px-2.5 py-1 rounded-full font-medium bg-[#2A2410] text-[#D4A843] border border-[#D4A843]/30">
                  ⏳ In Progress
                </span>
              </div>
              <span className="font-mono-custom text-xs text-[#8FA898]">2026</span>
            </div>
            <div className="font-display text-lg md:text-xl font-semibold text-[#8FA898] mb-1.5">
              Scaling Deforestation Risk Prediction to National Coverage — Vietnam
            </div>
            <div className="text-xs md:text-sm text-[#8FA898]/60 mb-4">
              VIGIL Research Team
            </div>
            <hr className="border-t border-[#2A4F35] my-4" />
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono-custom text-[11px] text-[#8FA898] mb-5">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] flex-shrink-0"></span>
                Full Vietnam coverage
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] flex-shrink-0"></span>
                Expanded dataset
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] flex-shrink-0"></span>
                Target: 2026
              </span>
            </div>
            <div>
              <button disabled className="px-4 py-2 rounded-md text-xs font-medium bg-[#3D7A55]/10 text-[#3D7A55] border border-[#2A4F35] cursor-not-allowed">
                Research in progress
              </button>
            </div>
          </div>
        )}
      </section>

      {/* RESEARCH ROADMAP SECTION */}
      <div className="max-w-[900px] mx-auto px-6 pb-20">
        <div className="font-mono-custom text-[10px] text-[#3D7A55] tracking-[0.15em] uppercase mb-6 flex items-center gap-3">
          <span>Research Roadmap</span>
          <div className="flex-1 h-[1px] bg-[#2A4F35]"></div>
        </div>

        <div className="relative pl-8 border-l border-gradient-to-b from-[#72BF82] via-[#2A4F35] to-transparent">
          {/* Item 1 */}
          <div className="relative pb-10">
            <div className="absolute -left-[37px] top-[6px] w-2.5 h-2.5 rounded-full bg-[#72BF82] border-2 border-[#72BF82]"></div>
            <div className="font-mono-custom text-[11px] text-[#72BF82] tracking-wider mb-1">2025</div>
            <div className="font-display text-base md:text-lg font-semibold text-[#F0EDE6] mb-1">
              Gia Lai Pilot — ML Pipeline
            </div>
            <div className="text-xs md:text-sm text-[#8FA898] leading-relaxed mb-2 max-w-[650px]">
              District-scale deforestation risk prediction at 1 km² resolution. Two-district design (K'Bang + Mang Yang). Accepted at MDPI Remote Sensing Q1.
            </div>
            <span className="font-mono-custom text-[10px] px-2.5 py-0.5 rounded-full bg-[#0D2A1A] text-[#4CAF70] border border-[#4CAF70]/30 inline-block">
              ✓ Accepted · Print Sep 2025
            </span>
          </div>

          {/* Item 2 */}
          <div className="relative pb-10">
            <div className="absolute -left-[37px] top-[6px] w-2.5 h-2.5 rounded-full bg-[#D4A843] border-2 border-[#D4A843] shadow-[0_0_0_4px_rgba(212,168,67,0.15)]"></div>
            <div className="font-mono-custom text-[11px] text-[#72BF82] tracking-wider mb-1">2026</div>
            <div className="font-display text-base md:text-lg font-semibold text-[#F0EDE6] mb-1">
              National Scale Expansion
            </div>
            <div className="text-xs md:text-sm text-[#8FA898] leading-relaxed mb-2 max-w-[650px]">
              Expanding the pipeline to full Vietnam coverage. Larger dataset, updated satellite inputs, collaboration with NGO partners and forest ranger units.
            </div>
            <span className="font-mono-custom text-[10px] px-2.5 py-0.5 rounded-full bg-[#2A2410] text-[#D4A843] border border-[#D4A843]/30 inline-block">
              ⏳ In Progress
            </span>
          </div>

          {/* Item 3 */}
          <div className="relative">
            <div className="absolute -left-[37px] top-[6px] w-2.5 h-2.5 rounded-full bg-[#122B1C] border-2 border-[#2A4F35]"></div>
            <div className="font-mono-custom text-[11px] text-[#72BF82] tracking-wider mb-1">2027+</div>
            <div className="font-display text-base md:text-lg font-semibold text-[#F0EDE6] mb-1">
              Community Integration Layer
            </div>
            <div className="text-xs md:text-sm text-[#8FA898] leading-relaxed mb-2 max-w-[650px]">
              Incorporating community-reported data, sustainable livelihood mapping, and green tourism overlays into the deforestation risk framework.
            </div>
            <span className="font-mono-custom text-[10px] px-2.5 py-0.5 rounded-full bg-[#2A4F35]/30 text-[#8FA898] border border-[#2A4F35] inline-block">
              Planned
            </span>
          </div>
        </div>
      </div>

      {/* OPEN SCIENCE SECTION */}
      <div className="max-w-[900px] mx-auto px-6 pb-24">
        <div className="font-mono-custom text-[10px] text-[#3D7A55] tracking-[0.15em] uppercase mb-4 flex items-center gap-3">
          <span>Open Science</span>
          <div className="flex-1 h-[1px] bg-[#2A4F35]"></div>
        </div>

        <p className="text-[#8FA898] text-sm mb-6 max-w-[500px]">
          All VIGIL datasets and pipeline code are made publicly available following publication, in line with our commitment to open, reproducible science.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#172E20] border border-[#2A4F35] hover:border-[#3D7A55] rounded-2xl p-6 transition-colors">
            <div className="w-9 h-9 bg-[#3D7A55]/15 rounded-lg flex items-center justify-center text-lg mb-4">
              🐙
            </div>
            <div className="font-display text-base font-semibold text-[#F0EDE6] mb-1">
              Pipeline Code
            </div>
            <div className="text-xs text-[#8FA898] mb-4">
              Full ML pipeline, preprocessing scripts, and grid construction code on GitHub.
            </div>
            <a
              href="https://github.com/Borino88/deforestation-risk-vietnam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium bg-transparent border border-[#2A4F35] text-[#F0EDE6] hover:border-[#3D7A55] transition-colors"
            >
              View Repository ↗
            </a>
          </div>

          <div className="bg-[#172E20] border border-[#2A4F35] hover:border-[#3D7A55] rounded-2xl p-6 transition-colors">
            <div className="w-9 h-9 bg-[#3D7A55]/15 rounded-lg flex items-center justify-center text-lg mb-4">
              📦
            </div>
            <div className="font-display text-base font-semibold text-[#F0EDE6] mb-1">
              Prediction Dataset
            </div>
            <div className="text-xs text-[#8FA898] mb-4">
              Master feature table and model predictions for K'Bang and Mang Yang districts.
            </div>
            <a
              href="https://github.com/Borino88/deforestation-risk-vietnam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium bg-transparent border border-[#2A4F35] text-[#F0EDE6] hover:border-[#3D7A55] transition-colors"
            >
              Download CSV ↗
            </a>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#72BF82] text-[#0A1F15] text-xs font-medium px-5 py-2.5 rounded-full shadow-2xl z-50 transition-all animate-bounce">
          ✓ {toastMsg}
        </div>
      )}
    </div>
  );
}
