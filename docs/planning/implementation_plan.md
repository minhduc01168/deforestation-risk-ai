# Kế hoạch Triển khai VIGIL Web-GIS Platform

Mục tiêu: Nâng cấp và hoàn thiện hệ thống VIGIL Web-GIS hiện tại thành một nền tảng website hoàn chỉnh với đầy đủ các trang thông tin (Home, About, Publication, Contact), nâng cấp trải nghiệm tương tác trên Bản đồ (VIGIL Map) và hỗ trợ đa ngôn ngữ (Tiếng Anh / Tiếng Việt).

## User Review Required

> [!IMPORTANT]
> **Đa ngôn ngữ (i18n):** Hệ thống sẽ sử dụng thư viện `next-intl` hoặc `i18next` để hỗ trợ song ngữ (Anh/Việt). Bạn có muốn sử dụng cơ chế routing theo sub-path (ví dụ: `gialai-forest-risk.com/en/about` và `gialai-forest-risk.com/vi/about`) không?

> [!WARNING]
> **Tích hợp Facebook Feed:** Việc kéo bài đăng mới nhất từ Facebook đòi hỏi phải thiết lập Facebook App và xin quyền truy cập API. Để nhanh và ít lỗi token nhất, chúng tôi đề xuất nhúng (embed) Facebook Page Plugin trực tiếp lên trang chủ thay vì gọi API lấy text/ảnh. Bạn có đồng ý với phương án nhúng Iframe không?

## Proposed Changes

Kế hoạch phát triển sẽ được chia thành 4 giai đoạn chính (tương ứng với các Epic sẽ được tạo sau).

### 1. Kiến trúc hạ tầng & Đa ngôn ngữ (Foundation & i18n)
- Cấu hình lại Next.js project để hỗ trợ Routing đa ngôn ngữ (En/Vi).
- Thiết lập hệ thống Context/State cho toàn app.
- Xây dựng hệ thống UI Components cơ bản (Header có nút đổi ngôn ngữ, Footer, Button, Card, Typography theo bảng màu chuẩn).

### 2. Xây dựng các trang nội dung tĩnh (Content Pages)
- **Trang chủ (Home):** Banner giới thiệu, Section Tầm nhìn - Sứ mệnh, Section Bản đồ tổng quan, Tích hợp Facebook Feed (Iframe).
- **Trang Về VIGIL (About VIGIL):** Layout hình ảnh/bài viết cho hành trình Cúc Phương 2025 và Gia Lai 2026.
- **Trang Xuất bản (Our Publication):** Hiển thị 4 phân đoạn tóm tắt bài báo nghiên cứu khoa học.
- **Trang Liên hệ (Contact Us):** Thiết kế Form Góp ý, kết nối API backend (hoặc form service bên thứ 3) để nhận email.

### 3. Nâng cấp VIGIL Map (Map Enhancements)
- Cập nhật `data-pipeline` để nhóm dữ liệu lưới thành Polygon hoặc sử dụng Supercluster trên Frontend để nhóm các điểm nguy cơ.
- Phát triển menu bộ lọc (Filters: Hansen, SRTM, CHIRPS, Sentinel-2, OSM).
- Xây dựng thanh công cụ tìm kiếm địa điểm bằng tọa độ.
- Thêm layer Khoanh vùng Khu vực Quy hoạch.
- Xây dựng UI "How to read the map" (Guided Tour hoặc Interactive Legend).

### 4. Tương tác cộng đồng (Community Reporting)
- **Frontend:** Thiết kế lại Popup "Check-in" khi bấm vào bản đồ (cho phép upload ảnh, điền comment ẩn danh).
- **Backend (FastAPI):** Cập nhật schema CSDL để lưu báo cáo ẩn danh (gắn theo địa chỉ IP). 
- **Bảo mật:** Bổ sung Rate-Limiting (giới hạn số lượng request) để chống spam khi mở tính năng báo cáo ẩn danh không cần duyệt.

---

## Next Steps (Theo quy trình BMAD)

Sau khi kế hoạch này được bạn phê duyệt (Approve), chúng tôi sẽ áp dụng các workflow của hệ thống BMAD để quản lý dự án:
1. Dùng skill `bmad-create-epics-and-stories` để chia nhỏ 4 giai đoạn trên thành các Epic và User Story cụ thể.
2. Dùng skill `bmad-sprint-planning` để tạo file `sprint-status.yaml` lưu trữ và theo dõi tiến độ dự án.
3. Bắt đầu phát triển (Dev) từng Story một cách tuần tự.
