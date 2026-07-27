# Story 2.5: Hướng dẫn đọc bản đồ (Legend & Guide)

Status: ready-for-dev
epic: epic-2
priority: low

## Story

As a Kiểm lâm viên,
I want xem một bảng chú giải (Legend) hoặc hướng dẫn đọc bản đồ,
So that tôi hiểu ý nghĩa của các màu sắc (đỏ, vàng, xanh) và biểu tượng hiển thị trên bản đồ.

## Acceptance Criteria

1. **Given** người dùng đang ở giao diện VIGIL Map (`/map`)
2. **When** họ nhìn vào góc của bản đồ hoặc dưới cùng của Sidebar
3. **Then** họ thấy một bảng chú giải nhỏ (Legend) giải thích các lớp màu (Ví dụ: Đỏ đậm = Mất rừng nghiêm trọng, Vùng nét đứt = Khu bảo tồn).
4. **And** khi họ chuyển đổi giữa chế độ Điểm (Point) và Bản đồ nhiệt (Heatmap), bảng chú giải sẽ cập nhật tương ứng.

## Tasks / Subtasks

- [ ] Task 1: Thiết kế Component `MapLegend.tsx` nhỏ gọn, hiển thị các chú thích dựa trên `activeLayer`, `displayMode` và `showProtectedAreas`.
- [ ] Task 2: Tích hợp `MapLegend` vào góc dưới cùng bên phải hoặc bên trái của bản đồ trong `src/app/map/page.tsx` hoặc `src/components/Map.tsx`.
- [ ] Task 3: Cập nhật đa ngôn ngữ (Tiếng Việt/Tiếng Anh) cho các chú giải.
- [ ] Task 4: Chạy Unit tests.

## Dev Notes

- Có thể thả trực tiếp `MapLegend` đè lên trên thẻ `<Map>` sử dụng absolute positioning.
- Màu sắc cần match với các mã màu đã cấu hình trong `paint` của `Map.tsx`:
  - Heatmap: Tự 0 (Trong suốt) đến Xanh, Vàng, Đỏ.
  - Point: Chấm tròn viền đỏ.
  - Protected Areas: Viền xanh nét đứt.
- **Thư mục liên quan:** 
  - `frontend/src/components/map/MapLegend.tsx` (Tạo mới)
  - `frontend/src/app/map/page.tsx`

## References

- [docs/planning/epics.md] - Epic 2, Story 2.5

## Code Review Logs

**Date**: 2026-07-26
**Reviewer**: BMAD Code Review
**Status**: PASSED

**Findings**:
1. **Architecture & Design**: 
   - `MapLegend.tsx` được tách thành component riêng biệt, dễ bảo trì, nhận đầy đủ các props để render điều kiện.
   - Design sử dụng TailwindCSS (z-10, absolute, glassmorphism) rất phù hợp, các màu sắc đồng bộ với `paint` layer của Map.
2. **Quality & Testing**:
   - Ngôn ngữ vi/en đều có sẵn.
   - Tích hợp vào `<Map>` container không gây vỡ layout và vượt qua các unit tests.

**Action**: Đạt chuẩn, có thể chuyển trạng thái Done chờ manual QA test.
