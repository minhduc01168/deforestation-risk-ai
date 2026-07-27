import React from 'react';

const translations = {
  vi: {
    legendTitle: "Chú giải",
    deforestationAlert: "Điểm mất rừng",
    lowDensity: "Mật độ thấp",
    highDensity: "Mật độ cao",
    protectedArea: "Vùng bảo vệ/Cấm khai thác",
    elevation: "Độ cao địa hình (SRTM)",
    rainfall: "Lượng mưa (CHIRPS)",
    hansenLoss: "Vùng mất rừng (Hansen)",
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
    <div className="absolute bottom-6 right-6 z-10 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 text-white rounded-xl p-4 shadow-2xl max-w-[220px]">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 border-b border-slate-700/50 pb-2">
        {t.legendTitle}
      </h4>
      
      <div className="space-y-3 text-sm">
        {/* Core display mode logic */}
        {displayMode === 'point' ? (
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full border-2 border-[#ff0055] bg-red-500/20 shadow-[0_0_8px_rgba(255,0,85,0.5)] flex-shrink-0"></div>
            <span className="text-slate-300 text-xs">{t.deforestationAlert}</span>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>{t.lowDensity}</span>
              <span>{t.highDensity}</span>
            </div>
            <div className="h-2 w-full rounded bg-gradient-to-r from-blue-500 via-green-500 to-red-500"></div>
          </div>
        )}

        {/* Protected Areas */}
        {showProtectedAreas && (
          <div className="flex items-center space-x-3 pt-2 border-t border-slate-700/50">
            <div className="w-5 h-3 border-2 border-dashed border-[#15803d] bg-[#22c55e]/20 flex-shrink-0"></div>
            <span className="text-slate-300 text-xs">{t.protectedArea}</span>
          </div>
        )}

        {/* Environmental Overlays */}
        {activeLayer === 'srtm' && (
          <div className="flex items-center space-x-3 pt-2 border-t border-slate-700/50">
            <div className="w-5 h-3 bg-[#a8a29e]/50 flex-shrink-0"></div>
            <span className="text-slate-300 text-xs">{t.elevation}</span>
          </div>
        )}
        
        {activeLayer === 'chirps' && (
          <div className="flex items-center space-x-3 pt-2 border-t border-slate-700/50">
            <div className="w-5 h-3 bg-[#3b82f6]/40 flex-shrink-0"></div>
            <span className="text-slate-300 text-xs">{t.rainfall}</span>
          </div>
        )}

        {activeLayer === 'hansen' && (
          <div className="flex items-center space-x-3 pt-2 border-t border-slate-700/50">
            <div className="w-5 h-3 bg-[#ef4444]/30 flex-shrink-0"></div>
            <span className="text-slate-300 text-xs">{t.hansenLoss}</span>
          </div>
        )}
      </div>
    </div>
  );
}
