---
stepsCompleted: [1, 2]
inputDocuments: ["implementation_plan.md", "File chức năng.xlsx"]
---

# VIGIL Web-GIS - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for VIGIL Web-GIS, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Hỗ trợ đa ngôn ngữ (Tiếng Anh/Tiếng Việt) thông qua nút bấm chuyển đổi ngôn ngữ (Toggle button).
FR2: Xây dựng Trang chủ (Home) gồm banner, giới thiệu bản đồ, giới thiệu tổ chức và nền tảng NCKH.
FR3: Tích hợp bài đăng mới nhất từ Facebook lên Trang chủ thông qua nhúng Iframe đơn giản.
FR4: Xây dựng trang "Về VIGIL" trình bày Tầm nhìn, Sứ mệnh, Thành viên và Câu chuyện thương hiệu.
FR5: Xây dựng trang "Xuất bản" tóm tắt bài báo khoa học theo 4 phân đoạn (Abstract, Methodology, Datasets, Results, Future).
FR6: Xây dựng trang "Liên hệ" kèm Form Feedback để tiếp nhận ý kiến đóng góp.
FR7: Nâng cấp bản đồ: Nhóm các điểm dữ liệu (grid) thành vùng màu (Polygons) theo mức độ rủi ro.
FR8: Nâng cấp bản đồ: Thêm chức năng tìm kiếm địa điểm bằng tọa độ.
FR9: Nâng cấp bản đồ: Thêm bộ lọc (Filters) theo các lớp dữ liệu (Hansen, SRTM, CHIRPS, Sentinel-2, OSM).
FR10: Nâng cấp bản đồ: Thêm layer khu vực được nhà nước quy hoạch.
FR11: Community Reporting: Cho phép click vào điểm trên bản đồ để xem/thêm ảnh, comment (ẩn danh theo IP, không cần admin duyệt).
FR12: Thêm hướng dẫn "How to read the map".

### NonFunctional Requirements

NFR1: Cơ chế báo cáo ẩn danh (Community Reporting) bắt buộc phải có Rate-Limiting theo IP để chống spam.
NFR2: Giao diện (Frontend) phải hoạt động tốt trên đa thiết bị (Responsive Mobile & Desktop).
NFR3: Hiệu năng bản đồ không bị lag khi chuyển đổi giữa chế độ point và polygon clustering.
NFR4: Tối ưu hóa SEO cho các trang tĩnh (Home, About, Publication).

### Additional Requirements

- Sử dụng nền tảng có sẵn: Frontend bằng Next.js, Backend bằng FastAPI, Database PostgreSQL/PostGIS.
- Chỉnh sửa `data-pipeline` (Python) để xử lý gom nhóm dữ liệu lưới thành Polygon GeoJSON, hoặc cấu trúc lại API để hỗ trợ Supercluster trên Frontend.
- Cấu hình lại CSDL để lưu log IP cho các báo cáo ẩn danh thay vì User ID.

### UX Design Requirements

UX-DR1: Thiết kế Interactive Legend hoặc Guided Tour thay cho trang text hướng dẫn đọc bản đồ khô khan.
UX-DR2: Xây dựng Popup "Check-in" ngay trên bản đồ theo phong cách Google Maps, có avatar random vui nhộn cho người ẩn danh.
UX-DR3: Thêm micro-animations (fade in, trượt lên) trên Trang chủ khi người dùng scroll chuột để tạo cảm giác "công nghệ thức giấc".
UX-DR4: Đồng bộ font chữ và màu sắc thương hiệu VIGIL trên toàn bộ hệ thống UI components (Header, Footer, Buttons, Cards).

### FR Coverage Map

FR1: Epic 1 - Hỗ trợ đa ngôn ngữ
FR2: Epic 1 - Xây dựng Trang chủ
FR3: Epic 1 - Tích hợp Facebook Feed
FR4: Epic 1 - Xây dựng trang Về VIGIL
FR5: Epic 1 - Xây dựng trang Xuất bản
FR6: Epic 1 - Xây dựng trang Liên hệ & Form Feedback
FR7: Epic 2 - Hiển thị vùng màu rủi ro trên bản đồ
FR8: Epic 2 - Tìm kiếm địa điểm bằng tọa độ
FR9: Epic 2 - Bộ lọc các lớp dữ liệu vệ tinh
FR10: Epic 2 - Thêm layer khu vực quy hoạch
FR11: Epic 3 - Community Reporting (Báo cáo ẩn danh)
FR12: Epic 2 - Hướng dẫn đọc bản đồ

## Epic List

### Epic 1: Nền tảng Website & Thông tin cốt lõi
Người dùng có thể dễ dàng truy cập và tìm hiểu mọi thông tin về dự án, đội ngũ, các nghiên cứu khoa học, cũng như chuyển đổi ngôn ngữ Anh/Việt một cách liền mạch.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6

### Epic 2: Khám phá & Phân tích Dữ liệu Bản đồ
Người dùng có thể khám phá trực quan dữ liệu cảnh báo phá rừng thông qua các vùng màu rủi ro, lọc các lớp dữ liệu vệ tinh, tìm kiếm tọa độ, và được hướng dẫn chi tiết cách đọc bản đồ.
**FRs covered:** FR7, FR8, FR9, FR10, FR12

### Epic 3: Tương tác Cộng đồng (Community Reporting)
Người dùng và cộng đồng địa phương có thể đóng góp thông tin thực địa bằng cách check-in, đăng ảnh và bình luận ẩn danh tại các điểm rủi ro trên bản đồ, từ đó xây dựng cơ sở dữ liệu cộng đồng vững chắc.
**FRs covered:** FR11

## Epic 1: Nền tảng Website & Thông tin cốt lõi

Người dùng có thể dễ dàng truy cập và tìm hiểu mọi thông tin về dự án, đội ngũ, các nghiên cứu khoa học, cũng như chuyển đổi ngôn ngữ Anh/Việt một cách liền mạch.

### Story 1.1: Tích hợp Đa ngôn ngữ và Bộ Component chung

As a Người dùng trang web,
I want chuyển đổi giữa tiếng Anh và tiếng Việt qua một nút bấm trên thanh điều hướng,
So that tôi có thể đọc nội dung bằng ngôn ngữ mình hiểu nhất.

**Acceptance Criteria:**

**Given** người dùng đang ở bất kỳ trang nào trên website
**When** họ click vào nút "EN/VI" trên Header
**Then** ngôn ngữ của toàn bộ nội dung tĩnh sẽ được chuyển đổi ngay lập tức
**And** thiết kế Header, Footer, và các nút bấm tuân thủ đúng bảng màu và font chữ thương hiệu VIGIL.

### Story 1.2: Trang chủ & Giới thiệu tổng quan

As a Khách truy cập mới,
I want xem trang chủ với các hiệu ứng cuộn mượt mà và thông tin giới thiệu ngắn gọn,
So that tôi hiểu nhanh dự án VIGIL là gì và có cảm giác công nghệ hiện đại.

**Acceptance Criteria:**

**Given** người dùng truy cập trang gốc (/)
**When** họ cuộn trang xuống
**Then** các khối nội dung (Banner, Bản đồ là gì, CLB VIGIL, Nền tảng NCKH) sẽ hiện ra với hiệu ứng fade-in/trượt lên nhẹ nhàng
**And** mỗi khối đều có nút nhấn (link) để điều hướng sang các trang chi tiết.

### Story 1.3: Tích hợp Facebook Feed trên Trang chủ

As a Người theo dõi dự án,
I want xem ngay các bài đăng mới nhất từ Facebook của dự án trên trang chủ,
So that tôi cập nhật được các hoạt động gần nhất mà không cần rời khỏi website.

**Acceptance Criteria:**

**Given** người dùng đang lướt Trang chủ
**When** họ cuộn đến section "Bài đăng mới nhất"
**Then** họ sẽ thấy một Iframe hiển thị timeline các bài đăng từ Fanpage Facebook
**And** Iframe này tự động thu phóng hiển thị tốt trên cả mobile và desktop.

### Story 1.4: Trang "Về VIGIL" (About)

As a Khách truy cập quan tâm,
I want đọc chi tiết về tầm nhìn, sứ mệnh và hành trình thực địa của nhóm,
So that tôi hiểu rõ hơn về câu chuyện và động lực của những người sáng lập.

**Acceptance Criteria:**

**Given** người dùng ở trang "Về VIGIL"
**When** họ cuộn qua các section
**Then** họ có thể xem thông tin Tầm nhìn, Sứ mệnh, Thành viên
**And** họ thấy được bố cục hình ảnh kèm text kể về chuyến đi Cúc Phương 2025 và Gia Lai 2026.

### Story 1.5: Trang "Xuất bản" (Our Publication)

As a Nhà nghiên cứu hoặc đối tác,
I want đọc tóm tắt bài báo khoa học theo từng phân đoạn,
So that tôi nắm được phương pháp và kết quả nghiên cứu của hệ thống AI.

**Acceptance Criteria:**

**Given** người dùng ở trang "Xuất bản"
**When** trang tải xong
**Then** nội dung được chia làm 4 khối rõ ràng (Abstract, Methodology, Datasets, Results, Future opportunity)
**And** mỗi khối có tiêu đề và văn bản tóm tắt tương ứng.

### Story 1.6: Trang "Liên hệ" (Contact Us) & Góp ý

As a Người muốn hợp tác hoặc góp ý,
I want gửi thông tin liên hệ và lời nhắn qua một form trực tuyến,
So that team VIGIL có thể nhận được và phản hồi.

**Acceptance Criteria:**

**Given** người dùng ở trang "Contact Us"
**When** họ điền Email, Nội dung và nhấn "Gửi"
**Then** hệ thống sẽ gửi dữ liệu này tới email của dự án (thông qua API hoặc dịch vụ form)
**And** hiển thị thông báo "Cảm ơn bạn đã góp ý" trên màn hình.

## Epic 2: Khám phá & Phân tích Dữ liệu Bản đồ

Người dùng có thể khám phá trực quan dữ liệu cảnh báo phá rừng thông qua các vùng màu rủi ro, lọc các lớp dữ liệu vệ tinh, tìm kiếm tọa độ, và được hướng dẫn chi tiết cách đọc bản đồ.

### Story 2.1: Hiển thị vùng rủi ro theo Polygon/Clustering

As a Người xem bản đồ,
I want thấy các vùng nguy cơ phá rừng được nhóm thành vùng màu thay vì các chấm nhỏ,
So that tôi dễ dàng quan sát và đánh giá được quy mô của rủi ro tại một khu vực rộng lớn.

**Acceptance Criteria:**

**Given** người dùng truy cập trang VIGIL Map
**When** bản đồ được load xong
**Then** dữ liệu GeoJSON được render dưới dạng các vùng màu (Polygons) hoặc sử dụng tính năng Supercluster để gom nhóm các điểm gần nhau
**And** khi zoom in/out, bản đồ vẫn hiển thị mượt mà (đảm bảo NFR3).

### Story 2.2: Bộ lọc các lớp dữ liệu vệ tinh

As a Nhà nghiên cứu,
I want lọc bản đồ dựa trên các lớp dữ liệu vệ tinh (Hansen, SRTM, CHIRPS, Sentinel-2, OSM),
So that tôi có thể đối chiếu các yếu tố nguy cơ khác nhau.

**Acceptance Criteria:**

**Given** người dùng đang xem VIGIL Map
**When** họ mở menu Bộ lọc (Filters) và chọn một lớp dữ liệu (ví dụ: Hansen)
**Then** bản đồ sẽ cập nhật để hiển thị lớp dữ liệu tương ứng.

### Story 2.3: Tìm kiếm địa điểm bằng tọa độ

As a Kiểm lâm viên,
I want nhập tọa độ GPS vào thanh tìm kiếm,
So that tôi có thể nhảy ngay đến vị trí khu rừng tôi đang quan tâm.

**Acceptance Criteria:**

**Given** người dùng đang ở VIGIL Map
**When** họ nhập tọa độ (Vĩ độ, Kinh độ) vào thanh tìm kiếm và nhấn Enter
**Then** bản đồ tự động bay (flyTo) và phóng to (zoom) tới đúng vị trí đó
**And** một marker (đánh dấu) sẽ xuất hiện tại vị trí đó.

### Story 2.4: Thêm layer Khu vực Quy hoạch

As a Nhà hoạch định chính sách,
I want bật/tắt layer hiển thị ranh giới các khu vực được quy hoạch,
So that tôi biết được vùng rủi ro có nằm trong khu bảo tồn hay không.

**Acceptance Criteria:**

**Given** người dùng đang ở VIGIL Map
**When** họ bật toggle "Khu vực quy hoạch"
**Then** một lớp viền (polygon) thể hiện ranh giới quy hoạch sẽ đè lên bản đồ.

### Story 2.5: Hướng dẫn "How to read the map"

As a Khách truy cập không chuyên,
I want xem chú giải (Legend) hoặc hướng dẫn tương tác,
So that tôi hiểu được ý nghĩa của các màu sắc rủi ro (đỏ/vàng/xanh) trên bản đồ.

**Acceptance Criteria:**

**Given** người dùng lần đầu truy cập VIGIL Map
**When** họ mở bản đồ
**Then** một bảng chú giải (Interactive Legend) sẽ xuất hiện ở góc màn hình giải thích màu sắc
**And** họ có thể click vào nút "Guided Tour" để xem tooltip giải thích chi tiết từng tính năng.

## Epic 3: Tương tác Cộng đồng (Community Reporting)

Người dùng và cộng đồng địa phương có thể đóng góp thông tin thực địa bằng cách check-in, đăng ảnh và bình luận ẩn danh.

### Story 3.1: Giao diện Popup "Check-in" trên bản đồ

As a Cư dân địa phương,
I want click vào một điểm trên bản đồ và tải ảnh/bình luận lên,
So that tôi có thể chia sẻ tình trạng thực tế tại khu vực đó cho mọi người cùng thấy.

**Acceptance Criteria:**

**Given** người dùng đang ở VIGIL Map
**When** họ click vào một điểm bất kỳ hoặc một điểm rủi ro
**Then** một popup "Check-in" hiện ra cho phép họ điền Bình luận và Upload Ảnh
**And** nếu họ không đăng nhập, một avatar động vật ngẫu nhiên sẽ được gán cho bình luận của họ.

### Story 3.2: API Báo cáo ẩn danh & Rate-limiting

As a Quản trị viên hệ thống,
I want hệ thống backend tự động lưu báo cáo ẩn danh dựa trên địa chỉ IP và giới hạn tần suất (Rate-limiting),
So that hệ thống không bị spam và không cần tôi phải duyệt bài thủ công.

**Acceptance Criteria:**

**Given** người dùng gửi báo cáo ẩn danh từ giao diện Popup
**When** request được gửi đến Backend (FastAPI)
**Then** hệ thống sẽ lưu thông tin báo cáo kèm theo địa chỉ IP của người gửi
**And** nếu IP đó đã gửi quá 3 báo cáo trong vòng 10 phút, API sẽ trả về lỗi 429 Too Many Requests để chống spam.
