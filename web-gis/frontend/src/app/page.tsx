"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });
import AboutTab from '@/components/AboutTab';
import AuthModal from '@/components/AuthModal';
import AiInsightsPanel from '@/components/AiInsightsPanel';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Sparkles, Lock } from 'lucide-react';

const translations = {
  vi: {
    title: "Gia Lai Deforestation AI",
    subtitle: "Hệ thống Cảnh báo & Giám sát Mất rừng",
    mapTab: "Bản đồ GIS",
    aboutTab: "Giới thiệu",
    satellite: "Ảnh Vệ tinh (Satellite)",
    yearLabel: "Năm phân tích:",
    filterTitle: "Bộ lọc Môi trường",
    elevation: "Độ cao tối đa",
    slope: "Độ dốc tối đa",
    treeCover: "Độ che phủ rừng (Tree Cover 2000) tối thiểu",
    rainfall: "Lượng mưa tối đa",
    reportTitle: "Báo Cáo Thực Địa (Check-in)",
    clickToReport: "Click vào một điểm trên bản đồ để bắt đầu báo cáo.",
    selectedLabel: "Đã chọn:",
    cancel: "Hủy",
    commentLabel: "Nội dung (Comment)",
    commentPlaceholder: "Mô tả hiện trạng...",
    imageLabel: "Hình ảnh minh chứng",
    submitting: "Đang gửi...",
    submitBtn: "Gửi Báo Cáo",
    floatingLabel: "Diễn biến Mất rừng tính đến",
    alertLocation: "Vui lòng click vào bản đồ để chọn tọa độ trước!",
    alertSize: "Kích thước ảnh không được vượt quá 5MB!",
    alertSuccess: "Đã gửi báo cáo thành công!",
    alertError: "Có lỗi xảy ra: ",
    displayMode: "Chế độ hiển thị",
    pointMode: "Điểm",
    heatmapMode: "Khoanh vùng",
    login: "Đăng nhập",
    logout: "Đăng xuất",
    needLoginToReport: "Bạn cần đăng nhập để gửi báo cáo!",
  },
  en: {
    title: "Gia Lai Deforestation AI",
    subtitle: "Deforestation Monitoring & Warning System",
    mapTab: "GIS Map",
    aboutTab: "About Project",
    satellite: "Satellite Imagery",
    yearLabel: "Analysis Year:",
    filterTitle: "Environmental Filters",
    elevation: "Max Elevation",
    slope: "Max Slope",
    treeCover: "Min Tree Cover 2000",
    rainfall: "Max Rainfall",
    reportTitle: "Field Report (Check-in)",
    clickToReport: "Click on the map to select a location for reporting.",
    selectedLabel: "Selected:",
    cancel: "Cancel",
    commentLabel: "Comment",
    commentPlaceholder: "Describe the situation...",
    imageLabel: "Evidence Image",
    submitting: "Submitting...",
    submitBtn: "Submit Report",
    floatingLabel: "Deforestation up to",
    alertLocation: "Please click on the map to select coordinates first!",
    alertSize: "Image size must not exceed 5MB!",
    alertSuccess: "Report submitted successfully!",
    alertError: "An error occurred: ",
    displayMode: "Display Mode",
    pointMode: "Points",
    heatmapMode: "Heatmap",
    login: "Login",
    logout: "Logout",
    needLoginToReport: "You must log in to submit a report!",
  }
};

export default function Home() {
  const { user, token, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const t = translations[language];

  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [isSatellite, setIsSatellite] = useState<boolean>(false);
  
  // Environmental Filters
  const [elevationMax, setElevationMax] = useState<number>(2000);
  const [rainfallMax, setRainfallMax] = useState<number>(3000);
  const [slopeMax, setSlopeMax] = useState<number>(90);
  const [treeCoverMin, setTreeCoverMin] = useState<number>(0);

  // Tab State: 'map' or 'about'
  const [activeTab, setActiveTab] = useState<'map' | 'about'>('map');
  const [displayMode, setDisplayMode] = useState<'point' | 'heatmap'>('point');
  
  // AI Presentation Mode State
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [targetDistrict, setTargetDistrict] = useState<string>('All');

  // Field Report States
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lon: number} | null>(null);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmitReport = async () => {
    if (!user || !token) {
      alert(t.needLoginToReport);
      setShowAuthModal(true);
      return;
    }
    
    if (!selectedLocation) {
      alert(t.alertLocation);
      return;
    }
    
    if (file && file.size > 5 * 1024 * 1024) {
      alert(t.alertSize);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('lat', selectedLocation.lat.toString());
      formData.append('lon', selectedLocation.lon.toString());
      if (comment) formData.append('comment', comment);
      if (file) formData.append('file', file);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/api/reports`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!res.ok) throw new Error(t.alertError);
      
      alert(t.alertSuccess);
      
      // Reset form
      setComment("");
      setFile(null);
      setSelectedLocation(null);
      
      // Trigger map refresh
      setRefreshTrigger(prev => prev + 1);
      
    } catch (err) {
      alert(t.alertError + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-white overflow-hidden font-sans">
      
      {/* Top Navigation Bar */}
      <nav className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 flex-shrink-0 z-20 shadow-md">
        <div className="flex items-center space-x-8">
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              {t.title}
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{t.subtitle}</p>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'map' 
                  ? 'bg-slate-700 text-green-400 shadow-inner' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {t.mapTab}
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'about' 
                  ? 'bg-slate-700 text-green-400 shadow-inner' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {t.aboutTab}
            </button>
          </div>
        </div>

        {/* User & Language Toggle */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              setActiveTab('map');
              setShowAiPanel(!showAiPanel);
            }}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-lg border ${
              showAiPanel 
                ? 'bg-yellow-500 text-slate-900 border-yellow-400' 
                : 'bg-slate-900/50 text-yellow-400 border-slate-700 hover:bg-slate-800 hover:border-yellow-500/50'
            }`}
          >
            <Sparkles size={16} />
            <span className="hidden sm:inline">AI Insights</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-3 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
              <div className="flex items-center space-x-2 text-sm text-green-400 font-medium">
                <User size={16} />
                <span>{user.username}</span>
              </div>
              <button 
                onClick={logout}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center"
                title={t.logout}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg"
            >
              {t.login}
            </button>
          )}

          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
            <button 
              onClick={() => setLanguage('vi')} 
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
                language === 'vi' ? 'bg-green-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              VI
            </button>
            <button 
              onClick={() => setLanguage('en')} 
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
                language === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {activeTab === 'map' ? (
          <>
            {/* Sidebar Controls */}
            <div className="w-80 bg-slate-800 flex flex-col shadow-xl z-10 flex-shrink-0 border-r border-slate-700 overflow-y-auto">
              <div className="p-6 space-y-8">
                
                {/* Satellite toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">{t.satellite}</span>
                  <button 
                    onClick={() => setIsSatellite(!isSatellite)}
                    className={`w-12 h-6 rounded-full transition-colors ${isSatellite ? 'bg-green-500' : 'bg-slate-600'} relative shadow-inner`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${isSatellite ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                {/* Display Mode toggle */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-slate-300">{t.displayMode}</span>
                  <div className="flex bg-slate-900/50 rounded-lg p-1 border border-slate-700/50">
                    <button 
                      onClick={() => setDisplayMode('point')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${displayMode === 'point' ? 'bg-slate-700 text-green-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {t.pointMode}
                    </button>
                    <button 
                      onClick={() => setDisplayMode('heatmap')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${displayMode === 'heatmap' ? 'bg-slate-700 text-green-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {t.heatmapMode}
                    </button>
                  </div>
                </div>

                {/* Time Slider */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-300">{t.yearLabel}</span>
                    <span className="font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded text-xs">{currentYear}</span>
                  </div>
                  <input 
                    type="range" 
                    min="2001" max="2024" 
                    value={currentYear}
                    onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                    <span>2001</span>
                    <span>2024</span>
                  </div>
                </div>
                
                {/* Filters */}
                <div>
                  <h3 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider">{t.filterTitle}</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="flex justify-between text-xs mb-2 text-slate-400">
                        <span>{t.elevation}</span>
                        <span className="font-mono text-emerald-400">{elevationMax}m</span>
                      </label>
                      <input 
                        type="range" min="0" max="3000" step="50"
                        value={elevationMax}
                        onChange={(e) => setElevationMax(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="flex justify-between text-xs mb-2 text-slate-400">
                        <span>{t.slope}</span>
                        <span className="font-mono text-emerald-400">{slopeMax}°</span>
                      </label>
                      <input 
                        type="range" min="0" max="90" step="1"
                        value={slopeMax}
                        onChange={(e) => setSlopeMax(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="flex justify-between text-xs mb-2 text-slate-400">
                        <span>{t.treeCover}</span>
                        <span className="font-mono text-emerald-400">{treeCoverMin}%</span>
                      </label>
                      <input 
                        type="range" min="0" max="100" step="5"
                        value={treeCoverMin}
                        onChange={(e) => setTreeCoverMin(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="flex justify-between text-xs mb-2 text-slate-400">
                        <span>{t.rainfall}</span>
                        <span className="font-mono text-blue-400">{rainfallMax}mm</span>
                      </label>
                      <input 
                        type="range" min="0" max="5000" step="100"
                        value={rainfallMax}
                        onChange={(e) => setRainfallMax(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Field Report Form */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">{t.reportTitle}</h3>
                  
                  {!user ? (
                    <div className="flex flex-col items-center justify-center py-6 border border-dashed border-slate-600 rounded-lg bg-slate-800/50">
                      <Lock size={32} className="text-slate-500 mb-3" />
                      <p className="text-sm text-slate-400 text-center mb-4 px-4">{t.needLoginToReport}</p>
                      <button 
                        onClick={() => setShowAuthModal(true)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        {t.login}
                      </button>
                    </div>
                  ) : (
                    <>
                      {!selectedLocation ? (
                        <div className="p-4 border border-dashed border-slate-600 rounded-lg text-center text-xs text-slate-400 mb-4 bg-slate-800">
                          {t.clickToReport}
                        </div>
                      ) : (
                        <div className="mb-4 text-xs bg-green-900/30 border border-green-800/50 p-2 rounded flex justify-between items-center">
                          <span className="text-green-400">
                            {t.selectedLabel} {selectedLocation.lat.toFixed(4)}, {selectedLocation.lon.toFixed(4)}
                          </span>
                          <button 
                            onClick={() => setSelectedLocation(null)}
                            className="text-slate-400 hover:text-red-400 underline font-medium ml-2"
                          >
                            {t.cancel}
                          </button>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-slate-400 font-medium">{t.commentLabel}</label>
                          <textarea 
                            className="w-full mt-1 p-3 bg-slate-800 rounded-lg border border-slate-600 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none resize-none h-24 transition-all"
                            placeholder={t.commentPlaceholder}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={!selectedLocation || isSubmitting}
                          />
                        </div>
                        
                        <div>
                          <label className="text-xs text-slate-400 font-medium">{t.imageLabel}</label>
                          <input 
                            type="file" 
                            accept="image/png, image/jpeg"
                            className="w-full mt-1 text-xs file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 file:cursor-pointer file:transition-colors"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0]);
                              }
                            }}
                            disabled={!selectedLocation || isSubmitting}
                          />
                        </div>
                        
                        <button 
                          onClick={handleSubmitReport}
                          disabled={!selectedLocation || isSubmitting}
                          className={`w-full py-3 rounded-lg text-sm font-bold transition-all shadow-lg ${
                            !selectedLocation || isSubmitting
                              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                              : 'bg-green-600 text-white hover:bg-green-500 hover:-translate-y-0.5'
                          }`}
                        >
                          {isSubmitting ? t.submitting : t.submitBtn}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Main Map Area */}
            <div className="flex-1 relative">
              <MapComponent 
                currentYear={currentYear} 
                filters={{ elevationMax, rainfallMax, slopeMax, treeCoverMin }} 
                isSatellite={isSatellite} 
                selectedLocation={selectedLocation}
                onLocationSelect={(lat: number, lon: number) => setSelectedLocation({lat, lon})}
                refreshTrigger={refreshTrigger}
                language={language}
                displayMode={displayMode}
                targetDistrict={targetDistrict}
              />
              
              {/* Floating Indicator */}
              <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 shadow-2xl pointer-events-none">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{t.floatingLabel}</p>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mt-1">{currentYear}</p>
              </div>
            </div>

            {/* AI Insights Panel */}
            {showAiPanel && (
              <AiInsightsPanel 
                onClose={() => setShowAiPanel(false)}
                targetDistrict={targetDistrict}
                setTargetDistrict={setTargetDistrict}
                language={language}
              />
            )}
          </>
        ) : (
          <div className="flex-1 overflow-y-auto bg-slate-900/50 p-8 flex justify-center">
            <div className="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden mt-6 mb-12 relative">
              <AboutTab language={language} />
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          language={language}
        />
      )}
    </div>
  );
}
