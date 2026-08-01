# Story 2.2: Bộ lọc các lớp dữ liệu vệ tinh

Status: ready-for-dev
epic: epic-2
priority: medium

## Story

As a Nhà nghiên cứu,
I want lọc bản đồ dựa trên các lớp dữ liệu vệ tinh (Hansen, SRTM, CHIRPS, Sentinel-2, OSM),
So that tôi có thể đối chiếu các yếu tố nguy cơ khác nhau.

## Acceptance Criteria

1. **Given** người dùng đang xem VIGIL Map (`/map`)
2. **When** họ mở menu Bộ lọc (Filters) và chọn một lớp dữ liệu (ví dụ: Hansen)
3. **Then** bản đồ sẽ cập nhật để hiển thị lớp dữ liệu tương ứng.
4. **And** người dùng có thể dễ dàng bật/tắt (toggle) các layer độc lập (hoặc switch giữa chúng).

## Tasks / Subtasks

- [ ] Task 1: Cập nhật component `Map` (trong `/map` page) để hỗ trợ nhận thêm một danh sách layer vệ tinh (satellite/basemap layers).
- [ ] Task 2: Cập nhật UI Sidebar trong `src/app/map/page.tsx` để có dropdown hoặc radio buttons chọn Layer Vệ tinh (Hansen, SRTM, CHIRPS, Sentinel-2, OSM).
- [ ] Task 3: Bổ sung cấu hình WMS (Web Map Service) hoặc tiles giả lập cho các lớp này để render trên `react-map-gl`/`maplibre-gl`.
- [ ] Task 4: Viết tests/cập nhật tests cho component `Map` và `map/page.tsx` có render Filter.

## Dev Notes

- **Kiến trúc & Ràng buộc:** 
  - Giao diện Sidebar ở `map/page.tsx` đã có một vài filter về môi trường (Elevation, Rainfall, Slope) và nút toggle Satellite. Cần thêm menu chọn Map Layer cụ thể.
  - Sử dụng Raster layer trong `maplibre-gl` cho vệ tinh.
  - Tạm thời sử dụng tile mặc định nếu chưa có server map tile thật cho Hansen/SRTM. Có thể dùng OpenStreetMap làm base, layer vệ tinh ESRI hoặc Sentinel làm layer đè lên, hoặc placeholder raster nếu chưa có data.
- **Thư mục liên quan:** 
  - `frontend/src/app/map/page.tsx`
  - `frontend/src/components/Map.tsx`

## References

- [docs/planning/epics.md] - Epic 2, Story 2.2

## Code Review Logs

**Date**: 2026-07-26
**Reviewer**: BMAD Code Review
**Status**: PASSED

**Findings**:
1. **Architecture & Design**: 
   - State `activeLayer` được quản lý ở `page.tsx` và truyền cho `Map.tsx`, tách biệt rõ logic UI và render bản đồ.
   - Các layers giả lập (mock layers) được sử dụng hợp lý bằng `react-map-gl` fill overlay.
2. **Quality & Testing**:
   - Dữ liệu đa ngôn ngữ được cập nhật tương ứng cho các menu layer.
   - Các unit tests (`map.test.tsx`, `InteractiveMap.test.tsx`) pass 100%, không bị ảnh hưởng bởi WebGL layer.

**Action**: Đạt chuẩn, có thể chuyển trạng thái Done chờ manual QA test.
