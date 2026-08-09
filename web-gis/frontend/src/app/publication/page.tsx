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
    <div className="min-h-screen bg-[#002818] text-white pt-16 pb-20 relative overflow-x-hidden font-sans">
      {/* GRID TEXTURE */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(244,214,104,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244,214,104,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)'
        }}
      />

      {/* HERO SECTION */}
      <div className="relative pt-16 pb-14 px-6 text-center overflow-hidden max-w-4xl mx-auto">
        <div className="font-mono text-xs text-[#F4D668] tracking-[0.15em] uppercase mb-5 font-bold">
          / Publications & Research
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4 text-white">
          Science at the<br />
          <span className="text-[#F4D668]">core of conservation</span>
        </h1>
        <p className="text-white/60 text-base md:text-lg max-w-[520px] mx-auto mb-14 font-normal leading-relaxed">
          {isVi
            ? 'VIGIL tiếp cận công tác bảo vệ rừng thông qua nghiên cứu mở, có thể kiểm chứng độc lập và triển khai vào thực tế.'
            : 'VIGIL approaches forest protection through open, reproducible research — publishing findings that can be independently verified and operationally deployed.'
          }
        </p>

        {/* Stats Row */}
        <div className="flex justify-center max-w-[520px] mx-auto rounded-xl overflow-hidden border border-[#005e38]/50 bg-[#003822]/80 shadow-lg">
          <div className="flex-1 p-5 border-r border-[#005e38]/50 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-[#F4D668] leading-none mb-1">1</div>
            <div className="font-mono text-[10px] text-white/50 tracking-[0.08em] uppercase font-semibold">Published</div>
          </div>
          <div className="flex-1 p-5 border-r border-[#005e38]/50 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-[#F4D668] leading-none mb-1">Q1</div>
            <div className="font-mono text-[10px] text-white/50 tracking-[0.08em] uppercase font-semibold">Journal rank</div>
          </div>
          <div className="flex-1 p-5 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-[#F4D668] leading-none mb-1">2+</div>
            <div className="font-mono text-[10px] text-white/50 tracking-[0.08em] uppercase font-semibold">In pipeline</div>
          </div>
        </div>
      </div>

      {/* MAIN PUBLICATIONS SECTION */}
      <section className="max-w-[900px] mx-auto px-6 pb-20 relative z-10">
        {/* Section Label */}
        <div className="font-mono text-[10px] text-[#F4D668] tracking-[0.15em] uppercase mb-6 flex items-center gap-3 font-bold">
          <span>Publications</span>
          <div className="flex-1 h-[1px] bg-[#005e38]/50"></div>
        </div>

        {/* Filter Dropdown Selector */}
        <div className="mb-8 max-w-[520px]">
          <div className="font-mono text-[10px] text-white/50 tracking-[0.1em] uppercase mb-2 font-medium">
            Chọn bài nghiên cứu
          </div>
          <div className="relative">
            <select
              id="paper-select"
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="w-full appearance-none bg-[#003822] border border-[#005e38]/60 rounded-xl px-4 py-3 text-sm text-white cursor-pointer outline-none focus:border-[#F4D668] transition-colors pr-10 shadow-sm font-medium"
            >
              <option value="all">Tất cả</option>
              <option value="paper-1">An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution — 2025</option>
              <option value="paper-2">Scaling Deforestation Risk Prediction to National Coverage — Vietnam — 2026</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#F4D668] text-xs font-bold">
              ▾
            </div>
          </div>
          <div className="font-mono text-[11px] text-white/50 mt-1.5 font-medium">
            {paperCount} bài nghiên cứu
          </div>
        </div>

        {/* PAPER 1 — Published */}
        {(selectedPaper === 'all' || selectedPaper === 'paper-1') && (
          <div className={`bg-[#003822] border rounded-2xl p-7 md:p-8 mb-4 transition-colors ${paper1Expanded ? 'border-[#F4D668]' : 'border-[#005e38]/60 hover:border-[#005e38]'}`}>
            {/* Top Badge Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex gap-2 flex-wrap">
                <span className="font-mono text-[10px] tracking-[0.08em] px-2.5 py-1 rounded-full font-bold bg-[#e8f5ee] text-[#005e38] border border-[#005e38]/30">
                  ✓ Accepted
                </span>
                <span className="font-mono text-[10px] tracking-[0.08em] px-2.5 py-1 rounded-full font-semibold bg-[#005e38]/30 text-[#F4D668] border border-[#F4D668]/30">
                  MDPI Remote Sensing · Q1
                </span>
              </div>
              <span className="font-mono text-xs text-white/50">2025</span>
            </div>

            {/* Title & Authors */}
            <h2 className="text-lg md:text-xl font-bold leading-snug tracking-tight text-white mb-1.5">
              An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution
            </h2>
            <div className="text-xs md:text-sm text-white/60 mb-4 font-normal">
              Phạm Duy Long · Nguyễn Vũ Huy · Nguyễn Đức Anh · Đỗ Nhật Quang · Đàm Anh Thư · Trần Đăng An
            </div>

            <hr className="border-t border-[#005e38]/40 my-4" />

            {/* Meta Info Dots */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-white/60 mb-5 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4D668] flex-shrink-0"></span>
                Gia Lai Province · K'Bang · Mang Yang
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4D668] flex-shrink-0"></span>
                Random Forest · Logistic Regression
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4D668] flex-shrink-0"></span>
                Hansen · SRTM · CHIRPS · Sentinel-2
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <button
                onClick={() => setPaper1Expanded(prev => !prev)}
                className="px-4 py-2 rounded-md text-xs font-bold bg-[#F4D668] text-[#003822] hover:bg-[#ffe380] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {paper1Expanded ? '↑ Hide details' : '↓ View details'}
              </button>

              <button
                onClick={() => showToast(isVi ? 'Bài báo sắp xuất bản chính thức trên MDPI Remote Sensing' : 'Paper coming soon on MDPI Remote Sensing')}
                className="px-4 py-2 rounded-md text-xs font-semibold bg-transparent text-white border border-[#005e38] hover:border-[#F4D668] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                Read on MDPI ↗
              </button>

              <a
                href="https://github.com/Borino88/deforestation-risk-vietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md text-xs font-semibold bg-transparent text-white border border-[#005e38] hover:border-[#F4D668] transition-colors inline-flex items-center gap-1.5"
              >
                ⬇ Download Paper
              </a>

              <button
                onClick={copyBibtex}
                className="px-3 py-2 rounded-md text-xs font-mono text-emerald-200/70 hover:text-white transition-colors cursor-pointer"
              >
                📋 Cite
              </button>
            </div>

            {/* EXPAND PANEL */}
            {paper1Expanded && (
              <div className="mt-5 border-t border-[#005e38]/40 pt-5">
                {/* Tabs Bar */}
                <div className="flex border-b border-[#005e38]/40 gap-0 mb-5 overflow-x-auto">
                  {(['abstract', 'findings', 'method', 'data', 'cite'] as const).map((tId) => (
                    <button
                      key={tId}
                      onClick={() => setActiveTab(tId)}
                      className={`px-4.5 py-2 text-xs md:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap bg-none cursor-pointer ${
                        activeTab === tId
                          ? 'text-[#F4D668] border-[#F4D668]'
                          : 'text-white/50 border-transparent hover:text-white'
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

                {/* Tab 1: Abstract — dùng ngôn ngữ từ Header global toggle */}
                {activeTab === 'abstract' && (
                  <div>
                    {!isVi ? (
                      <p className="text-white/70 text-sm leading-[1.75] max-w-[700px] mb-4 font-normal">
                        Deforestation monitoring requires reliable historical mapping and actionable risk signals that can be translated into operational priorities. This study presents a reproducible, grid-based machine-learning pipeline for deforestation-risk prediction and warning-zone generation in Gia Lai Province, Vietnam. The workflow is developed in K'Bang District and evaluated for geographic transferability in Mang Yang District. Public datasets are harmonized at a 1 km × 1 km grid-cell resolution, including Hansen Global Forest Change forest-cover and loss layers, SRTM elevation and slope, CHIRPS rainfall, and Sentinel-2 optical bands and vegetation/disturbance indices for the 2023 reporting year. A transparent baseline score is compared with logistic regression and random forest models. On the provided train-test split, logistic regression achieved AUC = 0.931, AP = 0.926, F1 = 0.881, and Capture@10% = 0.190; random forest achieved AUC = 0.942, AP = 0.914, F1 = 0.878, and Capture@10% = 0.184. For cross-district transfer from K'Bang to Mang Yang, logistic regression and random forest achieved AUC values of 0.743 and 0.767 and Capture@10% values of 0.170 and 0.145, respectively. The resulting data architecture, validation design, explainability outputs, and map-ready warning products provide a transparent foundation for district-scale monitoring and future expansion across Vietnam. This research has been accepted for publication in MDPI Remote Sensing (Q1, Scopus-indexed), with print scheduled for September 2025.
                      </p>
                    ) : (
                      <p className="text-white/70 text-sm leading-[1.75] max-w-[700px] mb-4 font-normal">
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
                          className="font-mono text-[10px] text-[#F4D668] bg-[#005e38]/40 border border-[#005e38]/60 px-2.5 py-1 rounded-full font-medium"
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
                      <div className="bg-[#002818]/70 border border-[#005e38]/60 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#F4D668] leading-none mb-1">0.942</div>
                        <div className="text-[11px] text-white/50 leading-tight">AUC · Random Forest<br />Internal split</div>
                      </div>
                      <div className="bg-[#002818]/70 border border-[#005e38]/60 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#F4D668] leading-none mb-1">0.767</div>
                        <div className="text-[11px] text-white/50 leading-tight">AUC · Transfer test<br />K'Bang → Mang Yang</div>
                      </div>
                      <div className="bg-[#002818]/70 border border-[#005e38]/60 rounded-xl p-4 text-center">
                        <div className="text-xl font-bold text-[#c98d26] leading-none mb-1">19.0%</div>
                        <div className="text-[11px] text-white/50 leading-tight">Capture@10%<br />Logistic Regression</div>
                      </div>
                    </div>

                    {/* Full Performance Table */}
                    <div className="font-mono text-[10px] text-[#F4D668] tracking-[0.08em] uppercase mb-2 font-bold">
                      Model Performance (Table 3)
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-[#005e38]/50 mb-3">
                      <table className="w-full text-left text-xs min-w-[540px]">
                        <thead className="bg-[#002818] font-mono text-[10px] text-[#F4D668] uppercase border-b border-[#005e38]/50">
                          <tr>
                            <th className="p-2.5">Scenario</th>
                            <th className="p-2.5">Model</th>
                            <th className="p-2.5">AUC</th>
                            <th className="p-2.5">F1</th>
                            <th className="p-2.5">Capture@5%</th>
                            <th className="p-2.5">Capture@10%</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#005e38]/40 text-white/60">
                          <tr className="opacity-50">
                            <td className="p-2.5 text-white font-medium">Internal split</td>
                            <td className="p-2.5">Baseline</td>
                            <td className="p-2.5">0.504</td>
                            <td className="p-2.5">0.491</td>
                            <td className="p-2.5">7.7%</td>
                            <td className="p-2.5">12.9%</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 text-white font-medium">Internal split</td>
                            <td className="p-2.5">Logistic Reg.</td>
                            <td className="p-2.5">0.931</td>
                            <td className="p-2.5">0.881</td>
                            <td className="p-2.5">9.5%</td>
                            <td className="p-2.5 text-[#F4D668] font-bold">19.0%</td>
                          </tr>
                          <tr className="bg-[#005e38]/20">
                            <td className="p-2.5 text-white font-medium">Internal split</td>
                            <td className="p-2.5 text-[#F4D668] font-bold">Random Forest</td>
                            <td className="p-2.5 text-[#F4D668] font-bold">0.942</td>
                            <td className="p-2.5">0.878</td>
                            <td className="p-2.5">9.2%</td>
                            <td className="p-2.5">18.4%</td>
                          </tr>
                          <tr className="opacity-50">
                            <td className="p-2.5 text-white font-medium">Transfer test</td>
                            <td className="p-2.5">Baseline</td>
                            <td className="p-2.5">0.376</td>
                            <td className="p-2.5">0.654</td>
                            <td className="p-2.5">2.8%</td>
                            <td className="p-2.5">5.9%</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 text-white font-medium">Transfer test</td>
                            <td className="p-2.5">Logistic Reg.</td>
                            <td className="p-2.5">0.743</td>
                            <td className="p-2.5">0.666</td>
                            <td className="p-2.5">8.8%</td>
                            <td className="p-2.5">17.0%</td>
                          </tr>
                          <tr className="bg-[#005e38]/20">
                            <td className="p-2.5 text-white font-medium">Transfer test</td>
                            <td className="p-2.5 text-[#F4D668] font-bold">Random Forest</td>
                            <td className="p-2.5 text-[#F4D668] font-bold">0.767</td>
                            <td className="p-2.5">0.671</td>
                            <td className="p-2.5">7.5%</td>
                            <td className="p-2.5">14.5%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-[#002818]/80 border border-[#005e38]/50 rounded-lg p-3 text-xs text-white/60 leading-relaxed font-normal">
                      <strong className="text-white">Notable:</strong> Logistic Regression achieved Capture@10% = 19.0% — slightly higher than Random Forest (18.4%) on the internal split. The simpler, interpretable model outperforms on the most operationally relevant metric.
                    </div>
                  </div>
                )}

                {/* Tab 3: Methodology */}
                {activeTab === 'method' && (
                  <div className="space-y-4">
                    {/* Step 01 */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono text-[10px] text-[#F4D668] bg-[#005e38]/40 border border-[#005e38]/60 px-2.5 py-0.5 rounded-full font-bold">01</span>
                        <span className="text-sm font-semibold text-white">Grid Construction</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        The study area is partitioned into 1 km × 1 km grid cells, each assigned a unique <code className="font-mono text-[11px] bg-white/10 text-white px-1.5 py-0.5 rounded">cell_id</code>. Labels and predictors are aggregated to this footprint to ensure spatial consistency across all three datasets and to support transparent mapping at district scale.
                      </p>
                    </div>

                    {/* Step 02 */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono text-[10px] text-[#F4D668] bg-[#005e38]/40 border border-[#005e38]/60 px-2.5 py-0.5 rounded-full font-bold">02</span>
                        <span className="text-sm font-semibold text-white">Outcome Definition</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        A binary label is derived from the Hansen <code className="font-mono text-[11px] bg-white/10 text-white px-1.5 py-0.5 rounded">lossyear</code> layer — a cell is positive if any forest loss occurred within it during 2001–2024. To focus on forested landscapes and reduce label noise, cells are filtered using baseline canopy cover (<code className="font-mono text-[11px] bg-white/10 text-white px-1.5 py-0.5 rounded">treecover2000 ≥ 30%</code>). Samples are balanced ~50/50 to stabilize model fitting. An auxiliary field (<code className="font-mono text-[11px] bg-white/10 text-white px-1.5 py-0.5 rounded">loss_first_year</code>) records the earliest observed loss year per cell for future temporal-validation designs.
                      </p>
                    </div>

                    {/* Step 03 */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono text-[10px] text-[#F4D668] bg-[#005e38]/40 border border-[#005e38]/60 px-2.5 py-0.5 rounded-full font-bold">03</span>
                        <span className="text-sm font-semibold text-white">Models Compared</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="bg-[#002818]/70 border border-[#005e38]/50 rounded-lg p-3">
                          <div className="font-mono text-[10px] text-white/40 mb-1">BASELINE</div>
                          <div className="text-xs font-medium text-white mb-1">Risk Score</div>
                          <div className="text-[11px] text-white/50">Standardized benchmark — minimal reference</div>
                        </div>
                        <div className="bg-[#002818]/70 border border-[#005e38]/50 rounded-lg p-3">
                          <div className="font-mono text-[10px] text-white/40 mb-1">INTERPRETABLE</div>
                          <div className="text-xs font-medium text-white mb-1">Logistic Regression</div>
                          <div className="text-[11px] text-white/50">Coefficients show direction of risk drivers</div>
                        </div>
                        <div className="bg-[#003822] border border-[#F4D668]/50 rounded-lg p-3">
                          <div className="font-mono text-[10px] text-[#F4D668] mb-1 font-bold">BEST AUC</div>
                          <div className="text-xs font-medium text-white mb-1">Random Forest</div>
                          <div className="text-[11px] text-white/60">Captures non-linear relationships</div>
                        </div>
                      </div>
                    </div>

                    {/* Step 04 */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono text-[10px] text-[#F4D668] bg-[#005e38]/40 border border-[#005e38]/60 px-2.5 py-0.5 rounded-full font-bold">04</span>
                        <span className="text-sm font-semibold text-white">Validation Design</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                        <div className="bg-[#002818]/70 border border-[#005e38]/50 rounded-lg p-3">
                          <div className="text-xs font-medium text-white mb-1">Provided Split</div>
                          <div className="text-[11px] text-white/50">80/20 hold-out within combined sample · N = 1,212 test cells</div>
                        </div>
                        <div className="bg-[#002818]/70 border border-[#005e38]/50 rounded-lg p-3">
                          <div className="text-xs font-medium text-white mb-1">District Transfer Test</div>
                          <div className="text-[11px] text-white/50">Train K'Bang → test Mang Yang (unseen) · N = 2,000 test cells</div>
                        </div>
                      </div>
                      <div className="font-mono text-[11px] text-white/50">
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
                      <div key={idx} className="bg-[#002818]/70 border border-[#005e38]/50 rounded-lg p-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                        <div>
                          <div className="text-xs font-semibold text-white mb-0.5">{ds.name}</div>
                          <div className="font-mono text-[10px] text-[#F4D668] font-bold mb-1">{ds.res}</div>
                          <div className="text-[11px] text-white/50">{ds.desc}</div>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] text-white/40 mb-1">Variables</div>
                          <code className="font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded block text-white leading-relaxed break-all">
                            {ds.vars}
                          </code>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] text-white/40 mb-1">Role</div>
                          <div className="text-[11px] text-white/50">{ds.role}</div>
                        </div>
                      </div>
                    ))}
                    <div className="font-mono text-[10px] text-white/40 mt-2">
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
                        className={`font-mono text-[11px] px-3 py-1 rounded border font-semibold transition-colors cursor-pointer ${
                          citeType === 'apa' ? 'text-[#F4D668] border-[#005e38] bg-[#005e38]/40' : 'text-emerald-200/60 border-[#005e38]/50'
                        }`}
                      >
                        APA
                      </button>
                      <button
                        onClick={() => setCiteType('bib')}
                        className={`font-mono text-[11px] px-3 py-1 rounded border font-semibold transition-colors cursor-pointer ${
                          citeType === 'bib' ? 'text-[#F4D668] border-[#005e38] bg-[#005e38]/40' : 'text-emerald-200/60 border-[#005e38]/50'
                        }`}
                      >
                        BibTeX
                      </button>
                    </div>

                    {citeType === 'apa' ? (
                      <div>
                        <div className="bg-[#002818] border border-[#005e38]/50 rounded-lg p-4 font-mono text-xs text-white/70 leading-relaxed mb-3">
                          Phạm, D. L., Nguyễn, V. H., Nguyễn, Đ. A., Đỗ, N. Q., Đàm, A. T., &amp; Trần, Đ. A. (2025). An Interpretable Machine Learning Pipeline for Deforestation Risk Prediction in Vietnam at 1 km Resolution. <em>Remote Sensing</em>. MDPI. Q1.
                        </div>
                        <button
                          onClick={copyApa}
                          className="font-mono text-xs font-bold text-[#F4D668] bg-transparent border border-[#005e38] rounded px-3 py-1 hover:bg-[#005e38]/40 transition-colors cursor-pointer"
                        >
                          📋 Copy APA
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="bg-[#002818] border border-[#005e38]/50 rounded-lg p-4 font-mono text-xs text-white/70 leading-relaxed mb-3 whitespace-pre-wrap break-all">
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
                          className="font-mono text-xs font-bold text-[#F4D668] bg-transparent border border-[#005e38] rounded px-3 py-1 hover:bg-[#005e38]/40 transition-colors cursor-pointer"
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
          <div className="bg-[#003822] border border-[#005e38]/60 hover:border-[#005e38] rounded-2xl p-7 md:p-8 mb-4 transition-colors">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex gap-2">
                <span className="font-mono text-[10px] tracking-[0.08em] px-2.5 py-1 rounded-full font-bold bg-[#2A2410] text-[#c98d26] border border-[#c98d26]/30">
                  ⏳ In Progress
                </span>
              </div>
              <span className="font-mono text-xs text-white/50">2026</span>
            </div>
            <div className="text-lg md:text-xl font-bold text-emerald-100/80 mb-1.5">
              Scaling Deforestation Risk Prediction to National Coverage — Vietnam
            </div>
            <div className="text-xs md:text-sm text-white/50 mb-4 font-normal">
              VIGIL Research Team
            </div>
            <hr className="border-t border-[#005e38]/40 my-4" />
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-white/60 mb-5">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c98d26] flex-shrink-0"></span>
                Full Vietnam coverage
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c98d26] flex-shrink-0"></span>
                Expanded dataset
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c98d26] flex-shrink-0"></span>
                Target: 2026
              </span>
            </div>
            <div>
              <button disabled className="px-4 py-2 rounded-md text-xs font-medium bg-[#005e38]/20 text-emerald-200/50 border border-[#005e38]/40 cursor-not-allowed">
                Research in progress
              </button>
            </div>
          </div>
        )}
      </section>

      {/* RESEARCH ROADMAP SECTION */}
      <div className="max-w-[900px] mx-auto px-6 pb-20">
        <div className="font-mono text-[10px] text-[#F4D668] tracking-[0.15em] uppercase mb-6 flex items-center gap-3 font-bold">
          <span>Research Roadmap</span>
          <div className="flex-1 h-[1px] bg-[#005e38]/50"></div>
        </div>

        <div className="relative pl-8 border-l border-[#005e38]">
          {/* Item 1 */}
          <div className="relative pb-10">
            <div className="absolute -left-[37px] top-[6px] w-2.5 h-2.5 rounded-full bg-[#F4D668] border-2 border-[#F4D668]"></div>
            <div className="font-mono text-[11px] text-[#F4D668] tracking-wider mb-1 font-bold">2025</div>
            <div className="text-base md:text-lg font-bold text-white mb-1">
              Gia Lai Pilot — ML Pipeline
            </div>
            <div className="text-xs md:text-sm text-white/60 leading-relaxed mb-2 max-w-[650px]">
              District-scale deforestation risk prediction at 1 km² resolution. Two-district design (K'Bang + Mang Yang). Accepted at MDPI Remote Sensing Q1.
            </div>
            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#e8f5ee] text-[#005e38] border border-[#005e38]/30 inline-block font-bold">
              ✓ Accepted · Print Sep 2025
            </span>
          </div>

          {/* Item 2 */}
          <div className="relative pb-10">
            <div className="absolute -left-[37px] top-[6px] w-2.5 h-2.5 rounded-full bg-[#c98d26] border-2 border-[#c98d26]"></div>
            <div className="font-mono text-[11px] text-[#c98d26] tracking-wider mb-1 font-bold">2026</div>
            <div className="text-base md:text-lg font-bold text-white mb-1">
              National Scale Expansion
            </div>
            <div className="text-xs md:text-sm text-white/60 leading-relaxed mb-2 max-w-[650px]">
              Expanding the pipeline to full Vietnam coverage. Larger dataset, updated satellite inputs, collaboration with NGO partners and forest ranger units.
            </div>
            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#2A2410] text-[#c98d26] border border-[#c98d26]/30 inline-block font-bold">
              ⏳ In Progress
            </span>
          </div>

          {/* Item 3 */}
          <div className="relative">
            <div className="absolute -left-[37px] top-[6px] w-2.5 h-2.5 rounded-full bg-[#003822] border-2 border-[#005e38]"></div>
            <div className="font-mono text-[11px] text-emerald-200/60 tracking-wider mb-1 font-bold">2027+</div>
            <div className="text-base md:text-lg font-bold text-white mb-1">
              Community Integration Layer
            </div>
            <div className="text-xs md:text-sm text-white/60 leading-relaxed mb-2 max-w-[650px]">
              Incorporating community-reported data, sustainable livelihood mapping, and green tourism overlays into the deforestation risk framework.
            </div>
            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#005e38]/30 text-white/50 border border-[#005e38]/50 inline-block font-medium">
              Planned
            </span>
          </div>
        </div>
      </div>

      {/* OPEN SCIENCE SECTION */}
      <div className="max-w-[900px] mx-auto px-6 pb-24">
        <div className="font-mono text-[10px] text-[#F4D668] tracking-[0.15em] uppercase mb-4 flex items-center gap-3 font-bold">
          <span>Open Science</span>
          <div className="flex-1 h-[1px] bg-[#005e38]/50"></div>
        </div>

        <p className="text-white/60 text-sm mb-6 max-w-[500px]">
          All VIGIL datasets and pipeline code are made publicly available following publication, in line with our commitment to open, reproducible science.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#003822] border border-[#005e38]/60 hover:border-[#005e38] rounded-2xl p-6 transition-colors">
            <div className="w-9 h-9 bg-[#005e38]/30 rounded-lg flex items-center justify-center text-lg mb-4">
              🐙
            </div>
            <div className="text-base font-semibold text-white mb-1">
              Pipeline Code
            </div>
            <div className="text-xs text-white/60 mb-4">
              Full ML pipeline, preprocessing scripts, and grid construction code on GitHub.
            </div>
            <a
              href="https://github.com/Borino88/deforestation-risk-vietnam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-transparent border border-[#005e38] text-white hover:border-[#F4D668] hover:text-[#F4D668] transition-colors"
            >
              View Repository ↗
            </a>
          </div>

          <div className="bg-[#003822] border border-[#005e38]/60 hover:border-[#005e38] rounded-2xl p-6 transition-colors">
            <div className="w-9 h-9 bg-[#005e38]/30 rounded-lg flex items-center justify-center text-lg mb-4">
              📦
            </div>
            <div className="text-base font-semibold text-white mb-1">
              Prediction Dataset
            </div>
            <div className="text-xs text-white/60 mb-4">
              Master feature table and model predictions for K'Bang and Mang Yang districts.
            </div>
            <a
              href="https://github.com/Borino88/deforestation-risk-vietnam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium bg-transparent border border-[#005e38] text-white hover:border-[#F4D668] hover:text-[#F4D668] transition-colors"
            >
              Download CSV ↗
            </a>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#005e38] text-[#F4D668] text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl z-50 transition-all animate-bounce border border-[#F4D668]/30">
          ✓ {toastMsg}
        </div>
      )}
    </div>
  );
}
