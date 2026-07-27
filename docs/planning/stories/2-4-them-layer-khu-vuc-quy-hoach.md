# Story 2.4: Thêm layer khu vực quy hoạch, vùng cấm khai thác

Status: ready-for-dev
epic: epic-2
priority: medium

## Story

As a Kiểm lâm viên,
I want bật/tắt (toggle) các layer bảo vệ đặc biệt (như khu bảo tồn, vùng đệm, vùng lõi),
So that tôi biết khu vực đang bị mất rừng có nằm trong vùng cấm hay không.

## Acceptance Criteria

1. **Given** người dùng đang ở VIGIL Map (`/map`)
2. **When** họ nhìn vào thanh Sidebar điều khiển các lớp bản đồ
3. **Then** họ thấy thêm một mục "Khu vực bảo vệ" (Protected Areas) với các checkbox (như Vùng lõi, Vùng đệm)
4. **When** họ chọn/bỏ chọn checkbox này,
5. **Then** trên bản đồ xuất hiện/biến mất lớp dữ liệu tương ứng (hiển thị dưới dạng polygon có viền hoặc màu nền nhạt).

## Tasks / Subtasks

- [ ] Task 1: Bổ sung dữ liệu Mock GeoJSON cho khu vực bảo vệ (VD: `mock-protected-areas.geojson`).
- [ ] Task 2: Thêm UI Toggle/Checkbox cho "Khu vực bảo vệ" vào Sidebar của `src/app/map/page.tsx` cùng với state tương ứng (`showProtectedAreas`).
- [ ] Task 3: Cập nhật `src/components/Map.tsx` để render thêm `<Source>` và `<Layer>` cho dữ liệu khu vực bảo vệ khi state `showProtectedAreas` là `true`.
- [ ] Task 4: Cập nhật file ngôn ngữ và unit tests.

## Dev Notes

- **Kiến trúc & Ràng buộc:** 
  - Khác với `activeLayer` (chỉ chọn 1 lúc 1 base layer môi trường), Protected Areas có thể bật/tắt độc lập và xếp chồng lên (overlay) các base layer khác. Ta dùng checkbox.
  - Sử dụng `<Source type="geojson">` và `<Layer type="fill">` trong react-map-gl với `paint` là nét đứt hoặc màu nền xanh lá mờ.
- **Thư mục liên quan:** 
  - `public/data/mock-protected-areas.geojson`
  - `frontend/src/app/map/page.tsx`
  - `frontend/src/components/Map.tsx`

## References

- [docs/planning/epics.md] - Epic 2, Story 2.4

## Code Review Logs

**Date**: 2026-07-26
**Reviewer**: BMAD Code Review
**Status**: PASSED

**Findings**:
1. **Architecture & Design**: 
   - Layer Khu vực bảo vệ (Protected Areas) được triển khai đúng thiết kế: là một overlay checkbox độc lập, cho phép bật tắt linh hoạt chồng lên trên bất kỳ Base Map nào.
   - Load dữ liệu geojson từ file public thành công.
   - Styling sử dụng màu xanh lá (`#22c55e`, `#15803d`) phù hợp cho mảng lâm nghiệp.
2. **Quality & Testing**:
   - UI có tích hợp đa ngôn ngữ.
   - Các unit tests (`map.test.tsx`, `InteractiveMap.test.tsx`) tiếp tục pass.

**Action**: Đạt chuẩn, có thể chuyển trạng thái Done chờ manual QA test.
