# Story 3.1: Giao diện Popup "Check-in" trên bản đồ

Status: ready-for-dev
epic: epic-3
priority: high

## Story

As a Cư dân địa phương,
I want click vào một điểm trên bản đồ và tải ảnh/bình luận lên,
So that tôi có thể chia sẻ tình trạng thực tế tại khu vực đó cho mọi người cùng thấy.

## Acceptance Criteria

1. **Given** người dùng đang ở VIGIL Map (`/map`)
2. **When** họ click vào một điểm bất kỳ trên bản đồ, nếu điểm đó chưa có báo cáo thì hiện form "Thêm báo cáo mới". Nếu điểm đó đã có báo cáo, hiện thông tin báo cáo đó.
3. **Then** một popup "Check-in" hiện ra cho phép họ điền Bình luận (Comment) và Upload Ảnh (Image URL / File - trong phạm vi frontend có thể dùng mock url hoặc placeholder url).
4. **And** khi họ nhấn "Submit", một marker báo cáo mới sẽ được sinh ra ở tọa độ đó và dữ liệu được gửi đến backend (hoặc log ra console nếu backend chưa sẵn sàng).

## Tasks / Subtasks

- [ ] Task 1: Thiết kế giao diện Form "Check-in" bên trong `react-map-gl` Popup. Form gồm 1 Textarea (Comment), 1 Input file/text (Upload ảnh), và nút Submit.
- [ ] Task 2: Cập nhật sự kiện `onClick` của `<Map>` trong `src/components/Map.tsx`. Khi click, ghi nhận tọa độ `clickLocation` và mở Popup.
- [ ] Task 3: Xử lý logic Submit form (tạm thời POST tới `/api/reports` hoặc mock data state). Gắn ngẫu nhiên một icon avatar hoặc tên "Anonymous" (Ẩn danh).
- [ ] Task 4: Hiển thị các báo cáo đã Submit lên bản đồ bằng `<Marker>`. (Lưu ý: hiện tại code `Map.tsx` đã có hiển thị `reports` từ API).

## Dev Notes

- **Kiến trúc & Ràng buộc:** 
  - Trong `src/components/Map.tsx`, hiện tại `onClick` đang kích hoạt `onLocationSelect` và render một Marker đơn giản có class `animate-bounce`. Ta cần chuyển Marker đó thành một `<Popup>` tương tác được.
  - Avatar random có thể dùng UI Avatars API: `https://ui-avatars.com/api/?name=Anon+User&background=random`
- **Thư mục liên quan:** 
  - `frontend/src/components/Map.tsx`
  - `frontend/src/app/map/page.tsx`

## References

- [docs/planning/epics.md] - Epic 3, Story 3.1

## Code Review Logs

**Date**: 2026-07-26
**Reviewer**: BMAD Code Review
**Status**: PASSED

**Findings**:
1. **Architecture & Design**: 
   - Thay thế tĩnh Marker thành `<Popup>` động với form nhập liệu. Trải nghiệm rất giống Google Maps, cho phép user gửi dữ liệu lập tức khi click trên bản đồ.
   - Quản lý logic Local State (`localReports`) kết hợp với dữ liệu từ Server (`reports`) giúp giao diện phản hồi nhanh (Optimistic UI update) trước khi có Backend thực tế.
2. **Quality & Testing**:
   - Sử dụng `ui-avatars.com` cho random avatar mang lại cảm giác thân thiện.
   - Các unit tests (`map.test.tsx`, `InteractiveMap.test.tsx`) pass.

**Action**: Đạt chuẩn, có thể chuyển trạng thái Done chờ manual QA test.
