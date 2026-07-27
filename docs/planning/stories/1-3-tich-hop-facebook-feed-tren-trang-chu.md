# Story 1.3: Tích hợp Facebook Feed trên Trang chủ

Status: done
epic: epic-1
priority: low

## 1. Story Foundation

**User Story:**
As a Người theo dõi dự án,
I want xem ngay các bài đăng mới nhất từ Facebook của dự án trên trang chủ,
So that tôi cập nhật được các hoạt động gần nhất mà không cần rời khỏi website.

**Acceptance Criteria:**
- **Given** người dùng đang lướt Trang chủ
- **When** họ cuộn đến section "Bài đăng mới nhất" (Latest Updates)
- **Then** họ sẽ thấy một Iframe hiển thị timeline các bài đăng từ Fanpage Facebook
- **And** Iframe này tự động thu phóng hiển thị tốt trên cả mobile và desktop.

**User Constraints:**
"Về tính năng Facebook chúng ta sẽ làm đơn giản nhất có thể còn nếu phức tạp quá chúng ta sẽ để ở giai đoạn 2." -> Yêu cầu chỉ sử dụng iframe plugin đơn giản nhất được cung cấp bởi Facebook (Page Plugin), không tích hợp Graph API phức tạp.

## 2. Developer Context & Technical Requirements

- **File Modifications:**
  - `web-gis/frontend/src/app/page.tsx`: Cần thêm một section mới bên dưới "VIGIL Club" hoặc "Science" để hiển thị Facebook feed.
  - `web-gis/frontend/src/locales/en.json` & `vi.json`: Cần thêm translation cho section mới này (ví dụ: title "Latest Updates" / "Hoạt động mới nhất").

- **Implementation Details:**
  - Sử dụng Facebook Page Plugin iframe chuẩn: 
    ```html
    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
    ```
    *(Thay thế URL facebook bằng URL thực tế nếu có, hoặc để một trang môi trường test. VIGIL hiện chưa có link FB cụ thể, có thể dùng VIGIL hoặc trang mock).*
  - **Responsive:** Bao bọc iframe trong một container có `overflow-hidden`, căn giữa để đảm bảo hiển thị tốt trên mọi thiết bị.
  - **Animation:** Áp dụng `framer-motion` tương tự các section khác trên Landing Page (fadeInUp).

## 3. Testing Requirements
- Kiểm tra tính responsive: Iframe không được tràn viền trên màn hình mobile.
- Kiểm tra i18n của tiêu đề section.

## Code Review Results
- **Status:** PASS
- **Reviewer:** Antigravity (Adversarial Review)
- **Findings:**
  - UI/Edge Case: Iframe có thể gây tràn layout trên màn hình hẹp gọn. Đã được bọc `overflow-hidden` và cấp quyền responsive thông qua SDK config (`adapt_container_width=true`).
  - Unit Tests: Đã cover sự tồn tại của khối nội dung Social trong `LandingPage.test.tsx` (PASS).
