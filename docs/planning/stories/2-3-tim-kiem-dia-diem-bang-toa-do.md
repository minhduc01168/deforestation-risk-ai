# Story 2.3: Tìm kiếm địa điểm bằng tọa độ

Status: ready-for-dev
epic: epic-2
priority: medium

## Story

As a Kiểm lâm viên,
I want nhập tọa độ GPS vào thanh tìm kiếm,
So that tôi có thể nhảy ngay đến vị trí khu rừng tôi đang quan tâm.

## Acceptance Criteria

1. **Given** người dùng đang ở VIGIL Map (`/map`)
2. **When** họ nhập tọa độ (Vĩ độ, Kinh độ) vào thanh tìm kiếm và nhấn Enter (hoặc click icon Search)
3. **Then** bản đồ tự động bay (flyTo) và phóng to (zoom) tới đúng vị trí đó
4. **And** một marker (đánh dấu) sẽ xuất hiện tại vị trí đó để người dùng dễ nhìn.

## Tasks / Subtasks

- [ ] Task 1: Thêm ô nhập liệu (Input field) cho tọa độ (hoặc hỗ trợ cả định dạng "Lat, Lng" chung) vào giao diện Sidebar ở `src/app/map/page.tsx`.
- [ ] Task 2: Viết hàm parse (phân tích) tọa độ để trích xuất được Vĩ độ (Latitude) và Kinh độ (Longitude) từ chuỗi nhập vào.
- [ ] Task 3: Bổ sung logic `flyTo` vào `MapComponent` khi người dùng kích hoạt tìm kiếm, và sử dụng hàm `onLocationSelect` (hoặc tạo state mới `searchedLocation`) để hiện Marker tại vị trí đó.
- [ ] Task 4: Viết unit tests cho tính năng parse tọa độ và UI search bar.

## Dev Notes

- **Kiến trúc & Ràng buộc:** 
  - Giao diện Sidebar nên có một thanh search bar nhỏ ở đầu hoặc ngay trên khối "Lớp dữ liệu".
  - Định dạng nhập liệu thường gặp: `14.2, 108.5` (Lat, Lng). Cần xử lý cẩn thận khoảng trắng và dấu phẩy.
  - Component `Map.tsx` đã có hàm `map.flyTo()`, ta có thể trigger nó khi có `searchedLocation` thay đổi. Thêm marker thông qua `<Marker>` của react-map-gl. (Ghi chú: đã có chức năng `selectedLocation`, có thể tái sử dụng luôn state này để hiện Marker).
- **Thư mục liên quan:** 
  - `frontend/src/app/map/page.tsx`
  - `frontend/src/components/Map.tsx`

## References

- [docs/planning/epics.md] - Epic 2, Story 2.3

## Code Review Logs

**Date**: 2026-07-26
**Reviewer**: BMAD Code Review
**Status**: PASSED

**Findings**:
1. **Architecture & Design**: 
   - Thanh tìm kiếm được tích hợp tại `page.tsx`, sử dụng regex `/^(-?\d+(\.\d+)?)[,\s]+(-?\d+(\.\d+)?)$/` hiệu quả để lấy tọa độ.
   - Việc tận dụng `selectedLocation` giúp tái sử dụng Marker và đồng nhất hành vi UI với tính năng báo cáo/click trên bản đồ.
   - Thêm `useEffect` trong `MapComponent` trigger `flyTo` khi `selectedLocation` thay đổi.
2. **Quality & Testing**:
   - Có kiểm tra ranh giới cơ bản (`-90 <= lat <= 90` và `-180 <= lon <= 180`).
   - Cập nhật đa ngôn ngữ đầy đủ.
   - Các unit tests (`map.test.tsx`, `InteractiveMap.test.tsx`) pass.

**Action**: Đạt chuẩn, có thể chuyển trạng thái Done chờ manual QA test.
