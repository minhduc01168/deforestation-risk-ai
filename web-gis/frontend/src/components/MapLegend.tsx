import React from 'react';

const translations = {
  vi: {
    legendTitle: "Chú giải",
    deforestationAlert: "Điểm mất rừng",
    lowDensity: "Mật độ thấp",
    highDensity: "Mật độ cao",
    protectedArea: "Vùng bảo vệ/Cấm khai thác",
    elevation: "Độ cao địa hình",
    rainfall: "Lượng mưa",
    hansenLoss: "Vùng mất rừng",
  },
  en: {
    legendTitle: "Map Legend",
    deforestationAlert: "Deforestation Alert",
    lowDensity: "Low Density",
    highDensity: "High Density",
    protectedArea: "Protected/Restricted Area",
    elevation: "Elevation (SRTM)",
    rainfall: "Rainfall (CHIRPS)",
    hansenLoss: "Forest Loss (Hansen)",
  }
};

interface MapLegendProps {
  language?: 'vi' | 'en';
  displayMode: 'point' | 'heatmap';
  showProtectedAreas: boolean;
  activeLayer: string;
}

export default function MapLegend({ 
  language = 'vi', 
  displayMode, 
  showProtectedAreas, 
  activeLayer 
}: MapLegendProps) {
  const t = translations[language];

  return (
    <div className="absolute bottom-6 right-6 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 text-white rounded-2xl p-4 shadow-2xl min-w-[230px] animate-fadeIn">
      <div className="flex items-center space-x-2 border-b border-slate-700/60 pb-2.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
          {t.legendTitle}
        </h4>
      </div>
      
      <div className="space-y-3 text-sm">
        {/* Core display mode logic */}
        {displayMode === 'point' ? (
          <div className="space-y-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/40">
            <div className="flex items-center space-x-2.5">
              <div className="w-3 h-3 rounded-full border-2 border-red-500 bg-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.8)] flex-shrink-0"></div>
              <span className="text-slate-200 text-xs font-medium">
                {language === 'vi' ? 'Rủi ro cao (>70%)' : 'High Risk (>70%)'}
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-3 h-3 rounded-full border-2 border-orange-500 bg-orange-500/40 shadow-[0_0_8px_rgba(249,115,22,0.8)] flex-shrink-0"></div>
              <span className="text-slate-200 text-xs font-medium">
                {language === 'vi' ? 'Rủi ro trung bình (40-70%)' : 'Medium Risk (40-70%)'}
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-3 h-3 rounded-full border-2 border-yellow-500 bg-yellow-500/40 flex-shrink-0"></div>
              <span className="text-slate-200 text-xs font-medium">
                {language === 'vi' ? 'Rủi ro thấp (<40%)' : 'Low Risk (<40%)'}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/40">
            <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 shadow-md mb-2"></div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span className="text-emerald-400">{t.lowDensity}</span>
              <span className="text-red-400">{t.highDensity}</span>
            </div>
          </div>
        )}

        {/* Protected Areas */}
        {showProtectedAreas && (
          <div className="flex items-center space-x-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700/40">
            <div className="w-5 h-3 border-2 border-dashed border-green-500 bg-green-500/20 rounded-sm flex-shrink-0"></div>
            <span className="text-slate-300 text-xs font-medium">{t.protectedArea}</span>
          </div>
        )}

        {/* Environmental Overlays */}
        {activeLayer === 'srtm' && (
          <div className="flex items-center space-x-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700/40">
            <div className="w-5 h-3 bg-stone-400/60 rounded-sm flex-shrink-0"></div>
            <span className="text-slate-300 text-xs font-medium">{t.elevation}</span>
          </div>
        )}
        
        {activeLayer === 'chirps' && (
          <div className="flex items-center space-x-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700/40">
            <div className="w-5 h-3 bg-blue-500/60 rounded-sm flex-shrink-0"></div>
            <span className="text-slate-300 text-xs font-medium">{t.rainfall}</span>
          </div>
        )}

        {activeLayer === 'hansen' && (
          <div className="flex items-center space-x-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700/40">
            <div className="w-5 h-3 bg-red-500/60 rounded-sm flex-shrink-0"></div>
            <span className="text-slate-300 text-xs font-medium">{t.hansenLoss}</span>
          </div>
        )}
      </div>
    </div>
  );
}
