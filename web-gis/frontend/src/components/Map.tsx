"use client";

import { useMemo, useState, useEffect } from 'react';
import Map, { Source, Layer, NavigationControl, Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';

export default function InteractiveMap({ 
  currentYear, 
  filters,
  isSatellite,
  selectedLocation,
  onLocationSelect,
  refreshTrigger
}: { 
  currentYear: number;
  filters: any;
  isSatellite: boolean;
  selectedLocation: { lat: number, lon: number } | null;
  onLocationSelect: (lat: number, lon: number) => void;
  refreshTrigger: number;
}) {
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
    
    return expr;
  }, [currentYear, filters]);

  return (
    <div className="w-full h-full relative">
      <Map
        initialViewState={{
          longitude: 108.46,
          latitude: 14.10,
          zoom: 10
        }}
        mapStyle={mapStyle}
        interactiveLayerIds={['loss-points']}
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
              filter={filterExpression}
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
              e.stopPropagation();
              setPopupInfo(report);
            }}
          >
            <div className="text-blue-500 cursor-pointer">
              <MapPin size={24} />
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
            <div className="p-2 max-w-xs">
              <p className="font-semibold text-sm mb-1">Báo cáo thực địa</p>
              <p className="text-xs mb-2">{popupInfo.comment}</p>
              {popupInfo.image_url && (
                <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${popupInfo.image_url}`} alt="Field" className="w-full h-auto rounded" />
              )}
              <p className="text-[10px] text-gray-500 mt-2">
                Ngày: {new Date(popupInfo.created_at).toLocaleString('vi-VN')}
              </p>
            </div>
          </Popup>
        )}

        {hoverInfo && (
          <div className="absolute bg-white text-black p-2 rounded shadow-lg pointer-events-none text-xs" style={{ left: hoverInfo.x + 10, top: hoverInfo.y + 10 }}>
            <p><strong>Loss Year:</strong> {hoverInfo.feature.properties.loss_first_year}</p>
            <p><strong>Elevation:</strong> {hoverInfo.feature.properties.mean_elevation_m}m</p>
            <p className="text-gray-500 mt-1 italic">Click để chọn vị trí báo cáo</p>
          </div>
        )}
      </Map>
    </div>
  );
}
