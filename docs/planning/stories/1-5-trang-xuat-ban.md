# Story 1.5: Trang "Xuất bản" (Our Publication)

Status: done
epic: epic-1
priority: medium

## Story

As a Nhà nghiên cứu hoặc đối tác,
I want đọc tóm tắt bài báo khoa học theo từng phân đoạn,
So that tôi nắm được phương pháp và kết quả nghiên cứu của hệ thống AI.

## Acceptance Criteria

1. **Given** người dùng truy cập vào trang "Xuất bản" (`/publication`)
2. **When** trang tải xong
3. **Then** nội dung được chia làm 5 khối rõ ràng từ trên xuống dưới: Abstract, Methodology, Datasets, Results, Future opportunity.
4. **And** mỗi khối đều hiển thị tiêu đề và văn bản tóm tắt tương ứng, khi nhấn vào (hoặc thiết kế dưới dạng đoạn tóm tắt) sẽ thể hiện rõ cấu trúc khoa học.
5. **And** giao diện hỗ trợ đa ngôn ngữ (EN/VI) và hiển thị tốt trên thiết bị di động.

## Tasks / Subtasks

- [x] Task 1: Khởi tạo route `/publication` và cấu trúc layout.
- [x] Task 2: Xây dựng UI hiển thị 5 section nghiên cứu khoa học. Sử dụng hiệu ứng mượt mà (framer-motion).
- [x] Task 3: Cập nhật JSON i18n (`en.json`, `vi.json`) cho các nội dung hiện có (Abstract, Methodology) và sử dụng text placeholder (ví dụ: Lorem ipsum...) cho các phần còn thiếu (Datasets, Results, Future).
- [x] Task 4: Cập nhật `Header.tsx` để menu "Xuất bản" (Our Publication) trỏ về đúng `/publication`.
- [x] Task 5: Viết Unit tests cho `PublicationPage.test.tsx` và chạy test.

## Dev Notes

- **Kiến trúc & Ràng buộc:** 
  - Trang tĩnh (Client or Server component).
  - Tích hợp `framer-motion` cho các phần cuộn trang (scroll animation).
  - Vì nội dung từ file Excel đang thiếu text cho Datasets, Results, Future opportunity, hãy dùng text Placeholder như yêu cầu trước đó của user: "nếu phần nào thiếu hãy dùng tạm placeholder".
- **Dữ liệu đã thu thập (từ excel_summary):**
  - **Abstract**: "Deforestation monitoring has historically been limited by a reactive paradigm..."
  - **Methodology**: "01. Multi-Source Data Integration. Our pipeline leverages the computational power of Google Earth Engine..."
- **Thư mục liên quan:** 
  - File chính: `frontend/src/app/publication/page.tsx`
  - JSON: `frontend/src/locales/en.json`, `frontend/src/locales/vi.json`

## References

- [docs/planning/epics.md] - Epic 1, Story 1.5
- `excel_summary.json` (Sheet "Xuất bản")

## Code Review Findings (bmad-code-review)

### Blind Hunter
- Các nội dung văn bản (i18n) cho 5 phần (Abstract, Methodology, Datasets, Results, Future) đã được đưa vào `vi.json` và `en.json` một cách đầy đủ.
- Các placeholder được thêm đầy đủ và chính xác cho các mục chưa có thông tin chính thức.
- File `PublicationPage.tsx` có render qua vòng lặp map và sử dụng `useLanguage` cho đa ngôn ngữ, không hardcode.
- File `Header.tsx` đã trỏ đúng link `/publication` thay vì `#publication`.
- Các biến `variants` cho `framer-motion` được cấu hình đủ.

### Edge Case Hunter
- Trang có thể crash nếu mảng `sections` hoặc các keys JSON không map đúng, nhưng việc định nghĩa tĩnh trong React Component với các fallback key giảm thiểu rủi ro này.
- Khi scroll nhanh trên mobile, `viewport={{ once: true, margin: "-100px" }}` từ `framer-motion` đảm bảo animation xuất hiện hợp lý, không bị chập chờn.
- Việc mock thư viện `framer-motion` trong Jest đã giải quyết triệt để cảnh báo DOM không hợp lệ cho thẻ `motion.div`.

### Acceptance Auditor
- AC 1 & 2: Route `/publication` đã hoạt động.
- AC 3: Đủ 5 khối nội dung.
- AC 4: Nội dung, title và văn bản tóm tắt render đúng.
- AC 5: Đa ngôn ngữ (i18n) EN/VI hoạt động đúng như mong đợi. Layout Tailwind CSS sử dụng `md:p-12` hỗ trợ tốt responsive.

**Kết luận Code Review:** PASS. Code sạch sẽ, đạt chuẩn và thỏa mãn mọi Acceptance Criteria. Unit tests đạt 100% PASS.
