"use client";

import { useMemo, useState, useEffect, useRef } from 'react';
import Map, { Source, Layer, NavigationControl, Marker, Popup, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';

const translations = {
  vi: {
    reportTitle: "Báo cáo thực địa",
    dateLabel: "Ngày:",
    clickHint: "Click để chọn vị trí báo cáo",
    lossYear: "Năm mất rừng:",
    elevation: "Độ cao:",
  },
  en: {
    reportTitle: "Field Report",
    dateLabel: "Date:",
    clickHint: "Click to select report location",
    lossYear: "Loss Year:",
    elevation: "Elevation:",
  }
};

export default function InteractiveMap({ 
  currentYear, 
  filters,
  isSatellite,
  selectedLocation,
  onLocationSelect,
  refreshTrigger,
  language = 'vi',
  displayMode = 'point',
  targetDistrict = 'All'
}: { 
  currentYear: number;
  filters: any;
  isSatellite: boolean;
  selectedLocation: { lat: number, lon: number } | null;
  onLocationSelect: (lat: number, lon: number) => void;
  refreshTrigger: number;
  language?: 'vi' | 'en';
  displayMode?: 'point' | 'heatmap';
  targetDistrict?: string;
}) {
  const t = translations[language];
  const mapRef = useRef<MapRef>(null);

  const [geoData, setGeoData] = useState<any>(null);
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [popupInfo, setPopupInfo] = useState<any>(null);
  
  // Load Grid GeoJSON
  useEffect(() => {
    fetch('/data/grid_data.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Error loading grid:", err));
  }, []);

  // Load Reports
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/api/reports`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error("Failed to load reports:", err));
  }, [refreshTrigger]); // re-fetch when refreshTrigger changes

  // Camera FlyTo Effect
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    
    if (targetDistrict === 'KBang') {
      map.flyTo({ center: [108.5, 14.2], zoom: 10, duration: 2500, essential: true });
    } else if (targetDistrict === 'Mang Yang') {
      map.flyTo({ center: [108.33, 14.05], zoom: 10.5, duration: 2500, essential: true });
    } else if (targetDistrict === 'All') {
      map.flyTo({ center: [108.46, 14.10], zoom: 9.5, duration: 2500, essential: true });
    }
  }, [targetDistrict]);

  const mapStyle: any = isSatellite 
    ? {
        version: 8,
        sources: {
          'esri-satellite': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'esri-satellite-layer',
            type: 'raster',
            source: 'esri-satellite',
            minzoom: 0,
            maxzoom: 22
          }
        ]
      }
    : "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
    
  const filterExpression = useMemo(() => {
    const expr: any[] = [
      "all",
      [">", ["get", "loss_first_year"], 0],
      ["<=", ["get", "loss_first_year"], currentYear]
    ];
    
    if (filters?.elevationMax !== undefined) {
      expr.push(['<=', ['get', 'mean_elevation_m'], filters.elevationMax]);
    }
    if (filters?.rainfallMax !== undefined) {
      expr.push(['<=', ['get', 'rain_mean_annual_2000_2024_mm'], filters.rainfallMax]);
    }
    if (filters?.slopeMax !== undefined) {
      expr.push(['<=', ['get', 'mean_slope_deg'], filters.slopeMax]);
    }
    if (filters?.treeCoverMin !== undefined) {
      expr.push(['>=', ['get', 'treecover2000'], filters.treeCoverMin]);
    }
    
    if (targetDistrict && targetDistrict !== 'All') {
      expr.push(['==', ['get', 'district'], targetDistrict]);
    }
    
    return expr;
  }, [currentYear, filters, targetDistrict]);

  return (
    <div className="w-full h-full relative">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 108.46,
          latitude: 14.10,
          zoom: 10
        }}
        mapStyle={mapStyle}
        interactiveLayerIds={displayMode === 'point' ? ['loss-points'] : ['loss-heatmap']}
        onMouseMove={(e) => {
          if (e.features && e.features.length > 0) {
            setHoverInfo({
              feature: e.features[0],
              x: e.point.x,
              y: e.point.y
            });
          } else {
            setHoverInfo(null);
          }
        }}
        onMouseLeave={() => setHoverInfo(null)}
        onClick={(e) => {
          onLocationSelect(e.lngLat.lat, e.lngLat.lng);
        }}
        cursor={hoverInfo ? 'pointer' : 'crosshair'}
      >
        <NavigationControl position="top-right" />
        
        {geoData && (
          <Source id="deforestation" type="geojson" data={geoData}>
            <Layer
              id="loss-points"
              type="circle"
              layout={{ visibility: displayMode === 'point' ? 'visible' : 'none' }}
              filter={filterExpression as any}
              paint={{
                'circle-radius': [
                  'interpolate', ['linear'], ['zoom'],
                  10, 3,
                  14, 15
                ],
                'circle-color': 'rgba(255, 0, 0, 0.2)',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ff0055'
              }}
            />
            <Layer
              id="loss-heatmap"
              type="heatmap"
              layout={{ visibility: displayMode === 'heatmap' ? 'visible' : 'none' }}
              filter={filterExpression as any}
              paint={{
                'heatmap-weight': 1,
                'heatmap-intensity': [
                  'interpolate', ['linear'], ['zoom'],
                  0, 1,
                  15, 3
                ],
                'heatmap-color': [
                  'interpolate', ['linear'], ['heatmap-density'],
                  0, 'rgba(0, 0, 255, 0)',
                  0.2, 'rgb(65, 105, 225)',
                  0.4, 'rgb(0, 255, 255)',
                  0.6, 'rgb(0, 255, 0)',
                  0.8, 'rgb(255, 255, 0)',
                  1, 'rgb(255, 0, 0)'
                ],
                'heatmap-radius': [
                  'interpolate', ['linear'], ['zoom'],
                  0, 2,
                  14, 25
                ],
                'heatmap-opacity': 0.8
              }}
            />
          </Source>
        )}

        {/* Selected Location Marker (Draft) */}
        {selectedLocation && (
          <Marker 
            longitude={selectedLocation.lon} 
            latitude={selectedLocation.lat} 
            anchor="bottom"
          >
            <div className="text-green-500 animate-bounce">
              <MapPin size={32} />
            </div>
          </Marker>
        )}

        {/* Existing Reports Markers */}
        {reports.map((report) => (
          <Marker 
            key={report.id}
            longitude={report.lon} 
            latitude={report.lat} 
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(report);
            }}
          >
            <div className="text-blue-500 cursor-pointer drop-shadow-md hover:text-blue-400 transition-colors">
              <MapPin size={28} />
            </div>
          </Marker>
        ))}

        {/* Popup for existing report */}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.lon}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
            className="text-black"
          >
            <div className="p-3 max-w-xs font-sans">
              <p className="font-bold text-sm mb-2 text-slate-800">{t.reportTitle}</p>
              <p className="text-sm mb-3 text-slate-600 bg-slate-50 p-2 rounded">{popupInfo.comment}</p>
              {popupInfo.image_url && (
                <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${popupInfo.image_url}`} alt="Field" className="w-full h-auto rounded shadow-sm" />
              )}
              <p className="text-[11px] text-slate-400 mt-3 font-medium">
                {t.dateLabel} {new Date(popupInfo.created_at).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}
              </p>
            </div>
          </Popup>
        )}

        {hoverInfo && (
          <div className="absolute bg-slate-900/90 text-white p-3 rounded-xl shadow-2xl pointer-events-none text-xs border border-slate-700 backdrop-blur-sm" style={{ left: hoverInfo.x + 15, top: hoverInfo.y + 15 }}>
            <p className="mb-1"><strong className="text-slate-400">{t.lossYear}</strong> <span className="font-bold text-green-400">{hoverInfo.feature.properties.loss_first_year}</span></p>
            <p className="mb-2"><strong className="text-slate-400">{t.elevation}</strong> <span className="font-mono text-emerald-400">{hoverInfo.feature.properties.mean_elevation_m}m</span></p>
            <div className="pt-2 border-t border-slate-700/50 mt-1">
              <p className="text-slate-500 italic text-[10px]">{t.clickHint}</p>
            </div>
          </div>
        )}
      </Map>
    </div>
  );
}
