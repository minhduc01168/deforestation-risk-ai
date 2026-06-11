"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });
import AboutTab from '@/components/AboutTab';

export default function Home() {
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [isSatellite, setIsSatellite] = useState<boolean>(false);
  
  // Environmental Filters
  const [elevationMax, setElevationMax] = useState<number>(2000);
  const [rainfallMax, setRainfallMax] = useState<number>(3000);
  const [slopeMax, setSlopeMax] = useState<number>(90);
  const [treeCoverMin, setTreeCoverMin] = useState<number>(0);

  // Tab State
  const [activeTab, setActiveTab] = useState<'controls' | 'about'>('controls');

  // Field Report States
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lon: number} | null>(null);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmitReport = async () => {
    if (!selectedLocation) {
      alert("Vui lòng click vào bản đồ để chọn tọa độ trước!");
      return;
    }
    
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Kích thước ảnh không được vượt quá 5MB!");
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
        body: formData,
      });

      if (!res.ok) throw new Error("Lỗi khi gửi báo cáo");
      
      alert("Đã gửi báo cáo thành công!");
      
      // Reset form
      setComment("");
      setFile(null);
      setSelectedLocation(null);
      
      // Trigger map refresh
      setRefreshTrigger(prev => prev + 1);
      
    } catch (err) {
      alert("Có lỗi xảy ra: " + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-900 text-white overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-80 bg-slate-800 flex flex-col shadow-xl z-10 flex-shrink-0">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
            Gia Lai Deforestation AI
          </h1>
          <p className="text-xs text-slate-400 mt-1">Hệ thống Cảnh báo & Giám sát Mất rừng</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-700">
          <button 
            onClick={() => setActiveTab('controls')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'controls' 
                ? 'text-green-400 border-b-2 border-green-400' 
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Công cụ
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'about' 
                ? 'text-green-400 border-b-2 border-green-400' 
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Dự án
          </button>
        </div>

        {/* Tab / Controls */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'controls' && (
            <div className="space-y-6">
              {/* Dark mode toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Ảnh Vệ tinh (Satellite)</span>
                <button 
                  onClick={() => setIsSatellite(!isSatellite)}
                  className={`w-12 h-6 rounded-full transition-colors ${isSatellite ? 'bg-green-500' : 'bg-slate-600'} relative`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isSatellite ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Time Slider */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Năm phân tích:</span>
                  <span className="font-bold text-green-400">{currentYear}</span>
                </div>
                <input 
                  type="range" 
                  min="2001" 
                  max="2024" 
                  value={currentYear}
                  onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>2001</span>
                  <span>2024</span>
                </div>
              </div>

              <hr className="border-slate-700" />
              
              {/* Filters */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3">Bộ lọc Môi trường</h3>
                <div className="space-y-4 pt-4 border-t border-slate-700">
                  <div>
                    <label className="flex justify-between text-sm mb-2 text-slate-300">
                      <span>Độ cao tối đa</span>
                      <span className="font-mono text-emerald-400">{elevationMax}m</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" max="3000" step="50"
                      value={elevationMax}
                      onChange={(e) => setElevationMax(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm mb-2 text-slate-300">
                      <span>Độ dốc tối đa</span>
                      <span className="font-mono text-emerald-400">{slopeMax}°</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" max="90" step="1"
                      value={slopeMax}
                      onChange={(e) => setSlopeMax(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm mb-2 text-slate-300">
                      <span>Độ che phủ rừng (Tree Cover 2000) tối thiểu</span>
                      <span className="font-mono text-emerald-400">{treeCoverMin}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" max="100" step="5"
                      value={treeCoverMin}
                      onChange={(e) => setTreeCoverMin(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm mb-2 text-slate-300">
                      <span>Lượng mưa tối đa</span>
                      <span className="font-mono text-blue-400">{rainfallMax}mm</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" max="5000" step="100"
                      value={rainfallMax}
                      onChange={(e) => setRainfallMax(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <hr className="border-slate-700" />
              
              {/* Field Report Form */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3">Báo Cáo Thực Địa (Check-in)</h3>
                
                {!selectedLocation ? (
                  <div className="p-3 border border-dashed border-slate-600 rounded text-center text-xs text-slate-400 mb-4 bg-slate-800/50">
                    Click vào một điểm trên bản đồ để bắt đầu báo cáo.
                  </div>
                ) : (
                  <div className="mb-4 text-xs text-green-400">
                    Đã chọn: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lon.toFixed(4)}
                    <button 
                      onClick={() => setSelectedLocation(null)}
                      className="ml-2 text-slate-500 hover:text-red-400 underline"
                    >
                      Hủy
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400">Nội dung (Comment)</label>
                    <textarea 
                      className="w-full mt-1 p-2 bg-slate-700 rounded border border-slate-600 text-sm focus:border-green-500 outline-none resize-none h-20"
                      placeholder="Mô tả hiện trạng..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      disabled={!selectedLocation || isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-400">Hình ảnh minh chứng</label>
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg"
                      className="w-full mt-1 text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-slate-700 file:text-white hover:file:bg-slate-600"
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
                    className={`w-full py-2 rounded-lg text-sm transition-colors border ${
                      !selectedLocation || isSubmitting
                        ? 'bg-slate-700 text-slate-500 border-slate-600 cursor-not-allowed'
                        : 'bg-green-600 text-white border-green-500 hover:bg-green-500'
                    }`}
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi Báo Cáo'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="py-2">
              <AboutTab />
            </div>
          )}
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <MapComponent 
          currentYear={currentYear} 
          filters={{ elevationMax, rainfallMax, slopeMax, treeCoverMin }} 
          isSatellite={isSatellite} 
          selectedLocation={selectedLocation}
          onLocationSelect={(lat, lon) => setSelectedLocation({lat, lon})}
          refreshTrigger={refreshTrigger}
        />
        
        {/* Floating Indicator */}
        <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700 shadow-2xl pointer-events-none">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Diễn biến Mất rừng tính đến</p>
          <p className="text-3xl font-black text-white">{currentYear}</p>
        </div>
      </div>

    </div>
  );
}
