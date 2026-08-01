# Story 1.4: Trang "Về VIGIL" (About)

Status: done
epic: epic-1
priority: medium

## Story

As a Khách truy cập quan tâm,
I want đọc chi tiết về tầm nhìn, sứ mệnh và hành trình thực địa của nhóm,
So that tôi hiểu rõ hơn về câu chuyện và động lực của những người sáng lập.

## Acceptance Criteria

1. **Given** người dùng ở trang "Về VIGIL" (`/about`)
2. **When** họ cuộn qua các section
3. **Then** họ có thể xem thông tin Tầm nhìn, Sứ mệnh, Thành viên
4. **And** họ thấy được bố cục hình ảnh kèm text kể về chuyến đi Cúc Phương 2025 và Gia Lai 2026.

## Tasks / Subtasks

- [x] Task 1: Khởi tạo route `/about` và page layout.
- [x] Task 2: Xây dựng UI Tầm nhìn (Vision) & Sứ mệnh (Mission).
- [x] Task 3: Xây dựng UI Thành viên (Team Members) (Tạm hoãn theo yêu cầu: CHƯA CẦN THIẾT).
- [x] Task 4: Xây dựng UI Hành trình thực địa (Cúc Phương 2025 & Gia Lai 2026).
- [x] Task 5: Cập nhật JSON i18n (`en.json`, `vi.json`) với toàn bộ nội dung của trang About.

## Dev Notes

- **Kiến trúc & Ràng buộc:** 
  - Trang tĩnh (Client or Server component).
  - Tích hợp `framer-motion` cho các section hiện ra dần (fade-in).
  - Sử dụng placeholder images hoặc images có sẵn nếu user cung cấp.
- **Thư mục liên quan:** 
  - File chính: `frontend/src/app/about/page.tsx`

## References

- [docs/planning/epics.md] - Epic 1, Story 1.4

## Code Review Findings
- **Blind Hunter Review**:
  - `page.tsx` implements responsive grids correctly.
  - Image paths use Unsplash placeholders correctly.
  - No broken links in `Header.tsx` (updated `href="/about"`).
  - The i18n variables are perfectly synchronized between `vi.json` and `en.json`.
- **Edge Case Hunter Review**:
  - The content does not overflow on small screens since `grid-cols-1 md:grid-cols-2` is used.
  - Missing Team Members section is noted and aligns with user instructions.
- **Acceptance Auditor**:
  - The acceptance criteria (Vision, Mission, Field trips) are fully met.
  - Unit tests have been created and passed for the About page (`__tests__/AboutPage.test.tsx`).
- **Triage Result**: No blockers. Ready to ship.
