import React from 'react';
import { Info, Database, Map, Hand } from 'lucide-react';

export default function AboutTab() {
  return (
    <div className="space-y-6 text-sm">
      {/* Về dự án */}
      <div>
        <div className="flex items-center space-x-2 text-green-400 mb-2">
          <Info size={18} />
          <h3 className="font-semibold text-slate-200">Về dự án</h3>
        </div>
        <p className="text-slate-400 leading-relaxed">
          Hệ thống Bản đồ Cảnh báo & Giám sát Mất rừng được phát triển nhằm nhận diện nguy cơ và theo dõi tình trạng mất rừng tại khu vực tỉnh Gia Lai. Hệ thống cung cấp cái nhìn trực quan theo thời gian và các yếu tố môi trường.
        </p>
      </div>

      <hr className="border-slate-700" />

      {/* Nguồn dữ liệu */}
      <div>
        <div className="flex items-center space-x-2 text-blue-400 mb-2">
          <Database size={18} />
          <h3 className="font-semibold text-slate-200">Nguồn dữ liệu</h3>
        </div>
        <ul className="text-slate-400 space-y-2 list-disc list-inside">
          <li>
            <strong className="text-slate-300">Global Forest Watch:</strong> Dữ liệu mất rừng toàn cầu độ phân giải cao.
          </li>
          <li>
            <strong className="text-slate-300">Ảnh viễn thám:</strong> Dữ liệu chỉ số thực vật (NDVI) và độ ẩm (chờ cập nhật).
          </li>
          <li>
            <strong className="text-slate-300">Địa hình & Khí hậu:</strong> Độ cao (Elevation) và Lượng mưa (Rainfall) trung bình năm.
          </li>
        </ul>
      </div>

      <hr className="border-slate-700" />

      {/* Hướng dẫn sử dụng */}
      <div>
        <div className="flex items-center space-x-2 text-orange-400 mb-2">
          <Map size={18} />
          <h3 className="font-semibold text-slate-200">Hướng dẫn</h3>
        </div>
        <ul className="text-slate-400 space-y-3">
          <li className="flex items-start">
            <Hand size={14} className="mt-1 mr-2 flex-shrink-0 text-slate-500" />
            <span>Kéo <strong>Thanh Thời Gian</strong> để xem diễn biến mất rừng qua các năm.</span>
          </li>
          <li className="flex items-start">
            <Hand size={14} className="mt-1 mr-2 flex-shrink-0 text-slate-500" />
            <span>Điều chỉnh <strong>Bộ Lọc Môi Trường</strong> để khoanh vùng nguy cơ theo độ cao và lượng mưa.</span>
          </li>
          <li className="flex items-start">
            <Hand size={14} className="mt-1 mr-2 flex-shrink-0 text-slate-500" />
            <span>Click trực tiếp vào một điểm trên bản đồ để <strong>Gửi Báo Cáo Thực Địa</strong> kèm hình ảnh minh chứng.</span>
          </li>
        </ul>
      </div>
      
      <div className="pt-4 text-center text-xs text-slate-500">
        <p>Phiên bản 1.0.0 &bull; 2024</p>
      </div>
    </div>
  );
}
