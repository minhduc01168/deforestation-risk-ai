"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MapPin, Navigation, Clock, MessageSquare, Image as ImageIcon } from 'lucide-react';

interface Report {
  id: number;
  lat: number;
  lon: number;
  comment: string | null;
  image_url: string | null;
  created_at: string;
}

export default function AdminDashboard({ 
  onViewOnMap, 
  language = 'vi' 
}: { 
  onViewOnMap: (lat: number, lon: number) => void,
  language?: 'vi' | 'en'
}) {
  const { user, token } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = {
    vi: {
      title: "Dashboard Quản Trị Báo Cáo",
      noAccess: "Bạn không có quyền truy cập trang này.",
      loading: "Đang tải dữ liệu...",
      noReports: "Chưa có báo cáo nào được gửi.",
      comment: "Nội dung",
      time: "Thời gian",
      location: "Tọa độ",
      viewMap: "Xem trên bản đồ",
      navigate: "Dẫn đường đi",
      noComment: "Không có bình luận",
    },
    en: {
      title: "Reports Administration Dashboard",
      noAccess: "You do not have access to this page.",
      loading: "Loading data...",
      noReports: "No reports have been submitted yet.",
      comment: "Comment",
      time: "Time",
      location: "Location",
      viewMap: "View on Map",
      navigate: "Get Directions",
      noComment: "No comment",
    }
  }[language];

  useEffect(() => {
    const fetchReports = async () => {
      if (!token || user?.role !== 'admin') {
        setIsLoading(false);
        return;
      }
      
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/reports`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          // Sort newest first
          setReports(data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        }
      } catch (err) {
        console.error("Failed to fetch reports", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [token, user]);

  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-900/30 text-red-400 p-6 rounded-xl border border-red-800">
          {t.noAccess}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400">{t.loading}</div>
      </div>
    );
  }

  const handleNavigate = (lat: number, lon: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-white">{t.title}</h2>
        <div className="bg-blue-900/50 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold border border-blue-800">
          {reports.length} Báo cáo
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 text-slate-400 border border-dashed border-slate-700 rounded-xl bg-slate-800/30">
          {t.noReports}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map(report => (
            <div key={report.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-500 transition-colors shadow-lg flex flex-col">
              {report.image_url ? (
                <div className="h-48 overflow-hidden relative bg-slate-900">
                  <img 
                    src={(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') + report.image_url} 
                    alt="Evidence" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-slate-900 flex flex-col items-center justify-center text-slate-600">
                  <ImageIcon size={48} className="mb-2 opacity-50" />
                  <span className="text-xs uppercase tracking-wider font-semibold">No Image</span>
                </div>
              )}
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <MessageSquare size={16} className="text-slate-400 mt-1 flex-shrink-0" />
                  <p className="text-sm text-slate-200 line-clamp-3">
                    {report.comment || <span className="text-slate-500 italic">{t.noComment}</span>}
                  </p>
                </div>
                
                <div className="space-y-2 mt-auto pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={14} className="text-blue-400" />
                    {new Date(report.created_at).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin size={14} className="text-green-400" />
                    <span className="font-mono">{report.lat.toFixed(5)}, {report.lon.toFixed(5)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button 
                    onClick={() => onViewOnMap(report.lat, report.lon)}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <MapPin size={14} />
                    {t.viewMap}
                  </button>
                  <button 
                    onClick={() => handleNavigate(report.lat, report.lon)}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-blue-900/20"
                  >
                    <Navigation size={14} />
                    {t.navigate}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
