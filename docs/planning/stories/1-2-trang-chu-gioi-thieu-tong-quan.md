# Story 1.2: Trang chủ & Giới thiệu tổng quan

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Khách truy cập mới,
I want xem trang chủ với các hiệu ứng cuộn mượt mà và thông tin giới thiệu ngắn gọn,
So that tôi hiểu nhanh dự án VIGIL là gì và có cảm giác công nghệ hiện đại.

## Acceptance Criteria

1. Given người dùng truy cập trang gốc (/)
2. When họ cuộn trang xuống
3. Then các khối nội dung (Banner, Bản đồ là gì, CLB VIGIL, Nền tảng NCKH) sẽ hiện ra với hiệu ứng fade-in/trượt lên nhẹ nhàng
4. And mỗi khối đều có nút nhấn (link) để điều hướng sang các trang chi tiết.

## Tasks / Subtasks

- [ ] Task 1: Xây dựng Layout Trang chủ (AC: 1, 3)
  - [ ] Tạo Hero Banner.
  - [ ] Tạo Section "VIGIL Map là gì".
  - [ ] Tạo Section "Câu lạc bộ VIGIL".
  - [ ] Tạo Section "Nền tảng NCKH".
- [ ] Task 2: Thêm hiệu ứng hoạt ảnh (Animations) (AC: 3)
  - [ ] Tích hợp Framer Motion hoặc thư viện animation tương đương.
  - [ ] Thêm hiệu ứng fade-in / trượt lên khi cuộn trang.
- [ ] Task 3: Tích hợp Đa ngôn ngữ và Điều hướng (AC: 4)
  - [ ] Sử dụng translation context cho các khối văn bản trên trang chủ.
  - [ ] Thêm nút điều hướng cho mỗi khối nội dung.

## Dev Notes

- **Kiến trúc & Ràng buộc:** 
  - Hệ thống sử dụng Next.js App Router.
  - Có thể sử dụng `framer-motion` cho các hiệu ứng cuộn mượt mà, hoặc sử dụng Tailwind CSS utilities như `@tailwindcss/aspect-ratio` và plugin của nó nếu muốn làm đơn giản.
- **Thư mục liên quan:** 
  - File chính: `frontend/src/app/page.tsx`
  - Các Component có thể tạo riêng trong `frontend/src/components/home/`.

### Project Structure Notes

- Khớp với cấu trúc hiện tại trong thư mục `web-gis/`.

### References

- [docs/planning/epics.md] - Epic 1, Story 1.2

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
