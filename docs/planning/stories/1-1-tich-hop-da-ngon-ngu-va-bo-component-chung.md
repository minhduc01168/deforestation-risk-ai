# Story 1.1: Tích hợp Đa ngôn ngữ và Bộ Component chung

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Người dùng trang web,
I want chuyển đổi giữa tiếng Anh và tiếng Việt qua một nút bấm trên thanh điều hướng,
so that tôi có thể đọc nội dung bằng ngôn ngữ mình hiểu nhất.

## Acceptance Criteria

1. Given người dùng đang ở bất kỳ trang nào trên website, When họ click vào nút "EN/VI" trên Header, Then ngôn ngữ của toàn bộ nội dung tĩnh sẽ được chuyển đổi ngay lập tức.
2. Thiết kế Header, Footer, và các nút bấm tuân thủ đúng bảng màu và font chữ thương hiệu VIGIL.

## Tasks / Subtasks

- [x] Task 1: Cấu hình đa ngôn ngữ (i18n) (AC: 1)
  - [x] Thiết lập i18n routing hoặc context (tùy thuộc App/Pages router của Next.js).
  - [x] Tạo file translation JSON cho tiếng Anh và tiếng Việt (chứa text cho Header/Footer).
- [x] Task 2: Tạo Layout Component (Header & Footer) (AC: 2)
  - [x] Component Header với nút chuyển đổi ngôn ngữ (Toggle button EN/VI) và các link điều hướng (Home, About, Publication, Contact Us).
  - [x] Component Footer.
  - [x] Áp dụng đúng font chữ và bảng màu.
- [x] Task 3: Tích hợp Header/Footer vào Layout chính (AC: 1, 2)
  - [x] Đảm bảo chuyển đổi ngôn ngữ hoạt động.

## Dev Notes

- **Kiến trúc & Ràng buộc:** 
  - Hệ thống sử dụng Next.js. Cần xác minh xem thư mục `web-gis` đang dùng Pages Router hay App Router trước khi setup.
- **Thư mục liên quan:** 
  - Components thường nằm trong thư mục `components/` của frontend.
  - Các file JSON đa ngôn ngữ nằm trong `locales/` hoặc `messages/`.

### Project Structure Notes

- Khớp với cấu trúc hiện tại trong thư mục `web-gis/`.

### References

- [docs/planning/epics.md] - Epic 1, Story 1.1

## Dev Agent Record

### Agent Model Used

### Debug Log References

- No major issues encountered. Next.js App Router layout integrated smoothly with React Context for i18n.

### Completion Notes List

- ✅ Cấu hình LanguageContext thành công với 2 ngôn ngữ (EN, VI).
- ✅ Thiết kế xong Header component với đầy đủ menu và nút chuyển ngữ động.
- ✅ Thiết kế xong Footer component.
- ✅ Tích hợp Providers vào layout.tsx gốc.

### File List

## Code Review Results
- **Status:** PASS
- **Reviewer:** Antigravity (Adversarial Review)
- **Findings:**
  - `LanguageContext.tsx`: Đã test và cover edge case (F5/Reload reset state) bằng việc lưu trữ context vào `localStorage` bên trong `useEffect`.
  - Architecture: Components chia nhỏ hợp lý (`Header`, `Footer`).
  - Unit Tests: `LanguageContext.test.tsx` và `Header.test.tsx` (PASS 100%).
- `web-gis/frontend/src/locales/en.json` (New)
- `web-gis/frontend/src/locales/vi.json` (New)
- `web-gis/frontend/src/context/LanguageContext.tsx` (New)
- `web-gis/frontend/src/components/layout/Header.tsx` (New)
- `web-gis/frontend/src/components/layout/Footer.tsx` (New)
- `web-gis/frontend/src/app/providers.tsx` (Modified)
- `web-gis/frontend/src/app/layout.tsx` (Modified)
