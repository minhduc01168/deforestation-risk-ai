"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });
import AboutTab from '@/components/AboutTab';
import AuthModal from '@/components/AuthModal';
import AiInsightsPanel from '@/components/AiInsightsPanel';
import AdminDashboard from '@/components/AdminDashboard';
import MapGuideModal from '@/components/MapGuideModal';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Sparkles, Lock, Camera, X } from 'lucide-react';
import { useRef } from 'react';

const translations = {
  vi: {
    title: "Gia Lai Deforestation AI",
    subtitle: "Hệ thống Cảnh báo & Giám sát Mất rừng",
    mapTab: "Bản đồ GIS",
    aboutTab: "Giới thiệu",
    dashboardTab: "Quản lý Báo cáo",
    satellite: "Ảnh Vệ tinh (Satellite)",
    layersTitle: "Lớp dữ liệu (Layers)",
    searchTitle: "Tìm kiếm Tọa độ",
    searchPlaceholder: "Ví dụ: 14.2, 108.5",
    invalidCoords: "Tọa độ không hợp lệ. Vui lòng nhập vĩ độ, kinh độ.",
    layer_osm: "OpenStreetMap",
    layer_sentinel: "Sentinel-2",
    layer_hansen: "Hansen (Mất rừng)",
    layer_srtm: "SRTM (Địa hình)",
    layer_chirps: "CHIRPS (Lượng mưa)",
    protectedAreasTitle: "Khu vực bảo vệ (Quy hoạch)",
    protectedAreasLabel: "Hiển thị ranh giới vùng cấm khai thác",
    yearLabel: "Năm phân tích:",
    filterTitle: "Bộ lọc Môi trường",
    elevation: "Độ cao tối đa",
    slope: "Độ dốc tối đa",
    treeCover: "Độ che phủ rừng (Tree Cover 2000) tối thiểu",
    rainfall: "Lượng mưa tối đa",
    reportTitle: "Báo Cáo Thực Địa (Check-in)",
    clickToReport: "Nhấn nút bên dưới để lấy vị trí hiện tại hoặc click vào bản đồ.",
    getLocation: "📍 Lấy vị trí của tôi",
    gettingLocation: "Đang dò GPS...",
    locationError: "Không thể lấy vị trí. Vui lòng bật GPS và cấp quyền cho trình duyệt.",
    selectedLabel: "Đã chọn:",
    cancel: "Hủy",
    commentLabel: "Nội dung (Comment)",
    commentPlaceholder: "Mô tả hiện trạng...",
    imageLabel: "Hình ảnh minh chứng",
    uploadPlaceholder: "Nhấn để tải ảnh từ máy",
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
    dashboardTab: "Admin Dashboard",
    satellite: "Satellite Imagery",
    layersTitle: "Map Layers",
    searchTitle: "Coordinate Search",
    searchPlaceholder: "Example: 14.2, 108.5",
    invalidCoords: "Invalid coordinates. Please enter latitude, longitude.",
    layer_osm: "OpenStreetMap",
    layer_sentinel: "Sentinel-2",
    layer_hansen: "Hansen (Forest Loss)",
    layer_srtm: "SRTM (Elevation)",
    layer_chirps: "CHIRPS (Rainfall)",
    protectedAreasTitle: "Protected Areas",
    protectedAreasLabel: "Show restricted zones overlay",
    yearLabel: "Analysis Year:",
    filterTitle: "Environmental Filters",
    elevation: "Max Elevation",
    slope: "Max Slope",
    treeCover: "Min Tree Cover 2000",
    rainfall: "Max Rainfall",
    reportTitle: "Field Report (Check-in)",
    clickToReport: "Click the button below to get your location or click on the map.",
    getLocation: "📍 Get My Location",
    gettingLocation: "Searching GPS...",
    locationError: "Cannot get location. Please enable GPS and allow browser permissions.",
    selectedLabel: "Selected:",
    cancel: "Cancel",
    commentLabel: "Comment",
    commentPlaceholder: "Describe the situation...",
    imageLabel: "Evidence Image",
    uploadPlaceholder: "Click to upload an image",
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
  const [showHowToReadMap, setShowHowToReadMap] = useState(false);

  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const t = translations[language];

  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [isSatellite, setIsSatellite] = useState<boolean>(false);
  
  // Environmental Filters
  const [elevationMax, setElevationMax] = useState<number>(2000);
  const [rainfallMax, setRainfallMax] = useState<number>(3000);
  const [slopeMax, setSlopeMax] = useState<number>(90);
  const [treeCoverMin, setTreeCoverMin] = useState<number>(0);

  // Map Layer State
  const [activeLayer, setActiveLayer] = useState<string>('osm');
  const [showProtectedAreas, setShowProtectedAreas] = useState<boolean>(false);

  // Tab State: 'map' or 'about' or 'dashboard'
  const [activeTab, setActiveTab] = useState<'map' | 'about' | 'dashboard'>('map');
  const [displayMode, setDisplayMode] = useState<'point' | 'heatmap'>('heatmap');
  
  // AI Presentation Mode State
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [targetDistrict, setTargetDistrict] = useState<string>('All');

  // Field Report States
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lon: number} | null>(null);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Coordinate Search State
  const [searchInput, setSearchInput] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Parse coordinates (expects formats like "14.2, 108.5" or "14.2 108.5")
    const match = searchInput.trim().match(/^(-?\d+(\.\d+)?)[,\s]+(-?\d+(\.\d+)?)$/);
    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[3]);
      // Basic bounds check (Lat: -90 to 90, Lon: -180 to 180)
      if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        setSelectedLocation({ lat, lon });
        setActiveTab('map');
        return;
      }
    }
    alert(t.invalidCoords);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert(t.locationError);
      return;
    }
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelectedLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(t.locationError);
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

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
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
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
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Top Header */}
      <div className="h-auto md:h-16 border-b border-slate-700 bg-slate-800/80 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-6 shadow-md z-20 py-3 md:py-0">
        <div className="flex items-center justify-between w-full md:w-auto mb-3 md:mb-0">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="VIGIL Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-xl shadow-lg object-cover bg-white p-1" />
            <div>
              <h1 className="font-bold text-slate-100 text-base md:text-lg leading-tight">{t.title}</h1>
              <p className="text-xs text-green-400 font-medium hidden md:block">{t.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-6 w-full md:w-auto">
          <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('map')}
              className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                activeTab === 'map' 
                  ? 'bg-slate-700 text-green-400 shadow-inner' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {t.mapTab}
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                activeTab === 'about' 
                  ? 'bg-slate-700 text-green-400 shadow-inner' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {t.aboutTab}
            </button>
            {user?.role === 'admin' && (
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                  activeTab === 'dashboard' 
                    ? 'bg-slate-700 text-blue-400 shadow-inner' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                {t.dashboardTab}
              </button>
            )}
          </div>
        </div>

        {/* User & Language Toggle */}
        <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-0">
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
                <span className="hidden sm:inline">{user.username}</span>
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
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {activeTab === 'map' ? (
          <>
            {/* Sidebar Controls */}
            <div className="w-full md:w-80 bg-slate-800 flex flex-col shadow-xl z-10 flex-shrink-0 border-t md:border-t-0 md:border-r border-slate-700 overflow-y-auto max-h-[50vh] md:max-h-none order-last md:order-first">
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
                <div className="flex items-center justify-between mt-2 mb-4">
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

                {/* Coordinate Search */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">{t.searchTitle}</h3>
                  <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <input 
                      type="text" 
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-green-500 transition-colors"
                    />
                    <button 
                      type="submit"
                      className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors shadow-lg"
                    >
                      GO
                    </button>
                  </form>
                </div>

                {/* Layers Selection */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">{t.layersTitle}</h3>
                    <button 
                      onClick={() => setShowHowToReadMap(true)}
                      className="text-[10px] bg-slate-700 hover:bg-slate-600 text-slate-200 px-2 py-1 rounded-md transition-colors font-semibold shadow-sm"
                    >
                      {language === 'vi' ? 'Cách xem Bản đồ' : 'How to read'}
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    {[
                      { id: 'osm', label: t.layer_osm },
                      { id: 'sentinel', label: t.layer_sentinel },
                      // { id: 'hansen', label: t.layer_hansen },
                      // { id: 'srtm', label: t.layer_srtm },
                      // { id: 'chirps', label: t.layer_chirps },
                    ].map(layer => (
                      <label key={layer.id} className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          activeLayer === layer.id 
                            ? 'border-green-500 bg-green-500/20' 
                            : 'border-slate-500 group-hover:border-slate-400'
                        }`}>
                          {activeLayer === layer.id && <div className="w-2 h-2 rounded-full bg-green-500" />}
                        </div>
                        <span className={`transition-colors ${activeLayer === layer.id ? 'text-green-400 font-medium' : 'group-hover:text-slate-200'}`}>
                          {layer.label}
                        </span>
                        {/* Hidden actual radio input */}
                        <input
                          type="radio"
                          name="map-layer"
                          value={layer.id}
                          checked={activeLayer === layer.id}
                          onChange={() => setActiveLayer(layer.id)}
                          className="hidden"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Protected Areas Toggle */}
                {/* 
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">{t.protectedAreasTitle}</h3>
                  <label className="flex items-center space-x-3 cursor-pointer group bg-slate-900/40 p-2 rounded-lg border border-slate-700/50 hover:bg-slate-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={showProtectedAreas}
                      onChange={(e) => setShowProtectedAreas(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-500 text-green-500 focus:ring-green-500 focus:ring-offset-slate-900 bg-slate-800"
                    />
                    <span className={`transition-colors text-sm ${showProtectedAreas ? 'text-green-400 font-medium' : 'text-slate-300 group-hover:text-slate-200'}`}>
                      {t.protectedAreasLabel}
                    </span>
                  </label>
                </div>
                */}

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
                        <div className="p-4 border border-dashed border-slate-600 rounded-lg text-center flex flex-col items-center gap-3 bg-slate-800 mb-4">
                          <span className="text-xs text-slate-400">{t.clickToReport}</span>
                          <button 
                            onClick={handleGetLocation}
                            disabled={isGettingLocation}
                            className={`w-full py-2 rounded-lg text-sm font-bold transition-all shadow-lg ${
                              isGettingLocation
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-500 hover:-translate-y-0.5'
                            }`}
                          >
                            {isGettingLocation ? t.gettingLocation : t.getLocation}
                          </button>
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
                          <label className="text-xs text-slate-400 font-medium mb-1 block">{t.imageLabel}</label>
                          <div className="relative w-full h-32 mt-1 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/50 flex items-center justify-center overflow-hidden transition-colors hover:bg-slate-700/50 group">
                            
                            {/* Hidden File Input */}
                            <input 
                              type="file" 
                              accept="image/png, image/jpeg, image/jpg"
                              ref={fileInputRef}
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const selectedFile = e.target.files[0];
                                  setFile(selectedFile);
                                  
                                  // Revoke old object URL to prevent memory leaks
                                  if (imagePreview) URL.revokeObjectURL(imagePreview);
                                  setImagePreview(URL.createObjectURL(selectedFile));
                                }
                              }}
                              disabled={!selectedLocation || isSubmitting}
                            />

                            {/* Image Preview or Upload Placeholder */}
                            {imagePreview ? (
                              <>
                                <img 
                                  src={imagePreview} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover" 
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFile(null);
                                    if (imagePreview) URL.revokeObjectURL(imagePreview);
                                    setImagePreview(null);
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-lg transition-transform hover:scale-110"
                                >
                                  <X size={14} strokeWidth={3} />
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={!selectedLocation || isSubmitting}
                                className={`flex flex-col items-center justify-center w-full h-full text-slate-500 transition-colors ${
                                  !selectedLocation || isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-green-400'
                                }`}
                              >
                                <Camera size={28} className="mb-2" />
                                <span className="text-[10px] font-medium tracking-wide uppercase">{t.uploadPlaceholder}</span>
                              </button>
                            )}
                          </div>
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
            <div className="flex-1 relative order-first md:order-last h-[50vh] md:h-auto">
              <MapComponent 
                currentYear={currentYear} 
                filters={{ elevationMax, rainfallMax, slopeMax, treeCoverMin }} 
                isSatellite={isSatellite} 
                activeLayer={activeLayer}
                showProtectedAreas={showProtectedAreas}
                selectedLocation={selectedLocation}
                onLocationSelect={(loc) => setSelectedLocation(loc)}
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
        ) : activeTab === 'dashboard' ? (
          <div className="flex-1 overflow-y-auto bg-slate-900/50 p-4 md:p-8 flex justify-center">
            <div className="w-full h-full max-w-6xl mt-2 md:mt-6 mb-12 relative">
              <AdminDashboard 
                language={language}
                onViewOnMap={(lat, lon) => {
                  setSelectedLocation({lat, lon});
                  setActiveTab('map');
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-slate-900/50 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden mt-2 md:mt-6 mb-12 relative">
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

      {/* Map Guide Modal */}
      {showHowToReadMap && (
        <MapGuideModal 
          onClose={() => setShowHowToReadMap(false)} 
          language={language}
        />
      )}
    </div>
  );
}
