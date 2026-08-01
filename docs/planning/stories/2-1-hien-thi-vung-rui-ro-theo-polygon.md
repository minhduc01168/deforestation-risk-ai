# Story 2.1: Hiển thị vùng rủi ro theo Polygon/Clustering

Status: ready-for-dev
epic: epic-2
priority: high

## Story

As a Người xem bản đồ,
I want thấy các vùng nguy cơ phá rừng được nhóm thành vùng màu (Polygons) hoặc Cluster thay vì các chấm nhỏ,
So that tôi dễ dàng quan sát và đánh giá được quy mô của rủi ro tại một khu vực rộng lớn.

## Acceptance Criteria

1. **Given** người dùng truy cập trang Home
2. **When** bản đồ được load xong
3. **Then** bản đồ hiển thị thực tế (thay thế placeholder) sử dụng thư viện bản đồ chuyên nghiệp (ví dụ: Mapbox GL JS hoặc Leaflet).
4. **And** dữ liệu GeoJSON mẫu (Mock data) được render dưới dạng các vùng màu (Polygons) hoặc sử dụng tính năng Supercluster để gom nhóm các điểm gần nhau.
5. **And** khi zoom in/out, bản đồ vẫn hiển thị mượt mà (đảm bảo NFR3).

## Tasks / Subtasks

- [ ] Task 1: Cài đặt thư viện bản đồ (như `mapbox-gl` hoặc `react-map-gl`, hoặc `leaflet`). (Lưu ý: Mapbox cần token, nếu muốn miễn phí hoàn toàn có thể dùng `leaflet` hoặc Mapbox GL JS wrapper mã nguồn mở như `maplibre-gl`).
- [ ] Task 2: Tạo một file Mock GeoJSON Data chứa các điểm rủi ro hoặc polygons mẫu để hiển thị.
- [ ] Task 3: Thay thế component Map giả ở `LandingPage.tsx` bằng Map thật có khả năng điều khiển (zoom, pan).
- [ ] Task 4: Cấu hình layer để hiển thị dữ liệu (màu đỏ/cam tuỳ mức rủi ro) dưới dạng Polygons/Clusters.
- [ ] Task 5: Viết Unit tests cho Component Map mới.

## Dev Notes

- **Kiến trúc & Ràng buộc:** 
  - Khuyến nghị sử dụng `react-map-gl` kết hợp `maplibre-gl` (không cần API key) để render mượt mà bằng WebGL, rất phù hợp với NFR3.
  - GeoJSON mẫu nên được đặt trong thư mục `public/data/` hoặc định nghĩa tĩnh trong source.
  - Component Map bắt buộc phải là Client Component (`"use client"`).
- **Thư mục liên quan:** 
  - `frontend/src/components/map/Map.tsx`
  - `frontend/src/app/page.tsx`

## References

- [docs/planning/epics.md] - Epic 2, Story 2.1

## Code Review Logs

**Date**: 2026-07-26
**Reviewer**: BMAD Code Review
**Status**: PASSED

**Findings**:
1. **Architecture & Design**: 
   - Sử dụng `react-map-gl/maplibre` đáp ứng NFR3 (hiệu năng cao qua WebGL) và hoàn toàn miễn phí.
   - Sử dụng `next/dynamic` với `ssr: false` để nhúng `InteractiveMap` vào `LandingPage` giúp tránh lỗi Hydration.
2. **Quality & Testing**:
   - `InteractiveMap.test.tsx` đã mock thành công `react-map-gl` trong môi trường `jsdom`.
   - Các tests đều passed và không bị lỗi crash WebGL.
3. **Data Mocking**:
   - `mock-risks.geojson` được lưu ở thư mục tĩnh `public/data`, cấu trúc đúng chuẩn GeoJSON FeatureCollection.

**Action**: Code đã đạt chuẩn, hoàn thành code review và auto test. Chờ manual test.
