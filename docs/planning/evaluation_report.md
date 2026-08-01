# BÁO CÁO ĐÁNH GIÁ TIẾN ĐỘ VIGIL WEB-GIS
> Ngày kiểm tra: 2026-07-27 | Người kiểm tra: VIGIL Dev Team + AI Audit
> Dữ liệu tham chiếu: `File chức năng.xlsx`, code tại `web-gis/frontend/src/`, dữ liệu tại `data/`, `docs/`, `results/`, `Vietnam_Deforestation_Pilot/`

---

## PHẦN 1: KIỂM TRA TÍNH NĂNG CHỨC NĂNG

| STT | Trang | Chức năng theo File chức năng.xlsx | Trạng thái | Kiểm tra thực tế (Code/Data) | Thiếu sót / Cần bổ sung |
|:---:|:---|:---|:---:|:---|:---|
| 1 | **Home** | Thanh điều hướng 5 mục | ✅ Hoàn thành | `Header.tsx` đã có đủ 5 link. Logo `Forest Logo.png` đã được tích hợp. | — |
| 2 | **Home** | Nội dung 3 khối (Bản đồ, CLB, NCKH) | ✅ Hoàn thành | `page.tsx` đã có 3 section. Nội dung lấy từ file Excel (VI + EN). | Slide/Banner hero tagline hiện là *"Giám sát rủi ro phá rừng bằng AI"*, Excel yêu cầu *"VIGIL - Công nghệ thức giấc - Đại ngàn bình yên"*. |
| 3 | **Home** | Ảnh minh họa cho các section | ✅ Hoàn thành | Đã thay thế toàn bộ ảnh Unsplash trên trang About bằng ảnh thực địa từ Gia Lai 2026 và Ninh Bình 2025. | — |
| 4 | **Home** | Mô tả VIGIL Map (EN + VI từ Excel) | ✅ Hoàn thành | Đã cập nhật đầy đủ mô tả chi tiết từ Excel (EN/VI) vào `vi.json` và `en.json`. | — |
| 5 | **About VIGIL** | Câu chuyện thương hiệu | ✅ Hoàn thành | 4 đoạn văn thương hiệu đã có đầy đủ trong `vi.json` + `en.json`, hiển thị tại `about/page.tsx`. | — |
| 6 | **About VIGIL** | Tầm nhìn - Sứ mệnh | ✅ Hoàn thành | Có trong `docs/TỔNG QUAN THƯƠNG HIỆU VIGIL.docx`. Đã tích hợp vào nội dung thương hiệu trong About page. | — |
| 7 | **About VIGIL** | Thành viên (Team) | 🔵 Bỏ qua có chủ đích | File Excel ghi chú "CHƯA CẦN THIẾT, SẼ BỔ SUNG SAU". | Bổ sung sau khi có ảnh và thông tin cá nhân 3 thành viên. |
| 8 | **About / Hoạt động** | Bài đăng mới nhất (Facebook feed) | 🔴 Chưa làm | Không có code nào tích hợp Facebook API. Section social hiện chỉ là text mô tả. | Cần Facebook Page Access Token. Tạm thời có thể nhúng iframe Facebook Page Plugin. |
| 9 | **About / Hoạt động** | Chia sẻ trải nghiệm cá nhân (ảnh + tọa độ) | ✅ Hoàn thành | Tính năng này đã được gom chung vào Popup Check-in/Báo cáo cộng đồng trên Bản đồ (người dùng có thể tải ảnh, comment và toạ độ ẩn danh). | — |
| 10 | **VIGIL Map** | Time Slider — lọc dữ liệu theo năm | ✅ **Thực sự hoạt động** | `Map.tsx` line 196-200: `filterExpression` dùng `loss_first_year` để filter. GeoJSON có thuộc tính `loss_first_year` (ví dụ: 2012, 2015, 2016...). Slider trượt từ 2001-2024 và **thực sự lọc điểm dữ liệu** theo năm. | — |
| 11 | **VIGIL Map** | Tìm kiếm địa điểm bằng tọa độ | ✅ Hoàn thành | `map/page.tsx` line 159-174: Hàm `handleSearchSubmit` đã parse tọa độ và dùng `selectedLocation` để flyTo. Box tìm kiếm có trong sidebar. | — |
| 12 | **VIGIL Map** | Hiển thị data rủi ro dạng heatmap (không phải từng chấm rời) | ✅ Hoàn thành | `Map.tsx` lines 270-298: Layer `loss-heatmap` kiểu `heatmap` đã được implement. Default mode là `heatmap`. Dữ liệu thật từ `risk_data.geojson` (381KB, ~800 points từ KBang_TEST_master.geojson). | — |
| 13 | **VIGIL Map** | Filter lớp bản đồ môi trường (Hansen, SRTM, CHIRPS, Sentinel, OSM) | ⚠️ Thiếu 3 lớp | OSM ✅ và Sentinel-2 ✅ hoạt động. Hansen, SRTM, CHIRPS đã bị **comment out** khỏi UI. | **Dữ liệu tồn tại** trong `Vietnam_Deforestation_Pilot/02_rasters_raw/` (2 file `.tif` GFW alerts). Cần Tile Server để phục vụ. |
| 14 | **VIGIL Map** | Khoanh vùng khu vực quy hoạch (Ranh giới khu bảo tồn) | ⚠️ Bị ẩn | Code tồn tại trong `Map.tsx`. UI toggle đã bị comment out theo yêu cầu trước. File `mock-protected-areas.geojson` là dữ liệu giả (865 bytes). | **Không có dữ liệu thật** về ranh giới khu bảo tồn. Cần cung cấp file GeoJSON ranh giới chính thức. |
| 15 | **VIGIL Map** | Click điểm dữ liệu → Popup (Community reporting) | ✅ Hoàn thành | Backend `/api/reports` đã xử lý upload file ảnh thật, mã hóa ẩn danh IP và chống spam rate-limit. | — |
| 16 | **VIGIL Map** | Hướng dẫn đọc bản đồ (How to read the map) | ✅ Hoàn thành | Đã bổ sung nút "Cách xem Bản đồ" và `MapGuideModal` giải thích chi tiết 4 mục: Heatmap, Chế độ xem, Bộ lọc và Báo cáo cộng đồng. | — |
| 17 | **VIGIL Map** | Bộ lọc môi trường (Elevation, Slope, Tree Cover, Rainfall) | ✅ Hoàn thành | `map/page.tsx` lines 500-552: 4 slider filter đã có UI và đã truyền vào `Map.tsx`. `filterExpression` trong `Map.tsx` (lines 202-213) áp dụng filter thực tế vào Maplibre layer. **Dữ liệu thật** — GeoJSON có đủ fields: `mean_elevation_m`, `mean_slope_deg`, `rain_mean_annual_2000_2024_mm`, `treecover2000`. | — |
| 18 | **Our Publication** | 5 section (Abstract, Methodology, Datasets, Results, Future) | ✅ Hoàn thành | `publication/page.tsx`: 5 section đầy đủ. Nội dung từ `docs-paper/GiaLai_Deforestation_Final.docx`. Biểu đồ thật: `Figure3_ROC_split.png` và `Figure6_RF_importance.png` từ `results/`. | `FINAL_research_package/` có thêm `Figure3b_ROC_KBang_to_MangYang.png`, `Figure6_LogReg_coefficients.png`, `Table3_model_performance_HansenLoss.csv` — chưa được dùng. Số liệu AUC trong text (0.942) khác bảng số thực (RF: **0.892**, LogReg: **0.788**). |
| 19 | **Contact Us** | Email, website, link Facebook | ✅ Hoàn thành | Đã có trong `vi.json` và `en.json`. Hiển thị trên trang Contact. | Email/Facebook hiện là placeholder (`contact@vigil.vn`, `fb.com/vigil.project`). Cần cập nhật thông tin thật. |
| 20 | **Contact Us** | Form góp ý | ✅ Hoàn thành | Form gửi comment đã có UI hoàn chỉnh. | Form chưa thực sự gửi email. Cần cấu hình SMTP hoặc service (EmailJS, Formspree) nếu muốn nhận email thật. |

---

## PHẦN 2: KIỂM TRA DỮ LIỆU

| Dữ liệu | File / Thư mục | Trạng thái trên Website | Ghi chú |
|:---|:---|:---:|:---|
| Dữ liệu điểm rủi ro phá rừng (KBang) | `data/KBang_TEST_master.geojson` → copy thành `public/data/risk_data.geojson` | ✅ Đang dùng thật | 800 điểm, có `loss_first_year`, `mean_elevation_m`, `treecover2000`, `rain_mean_annual_2000_2024_mm`, `district`. |
| Dữ liệu điểm rủi ro (MangYang) | `data/MangYang_TEST_master_rain_elev_lossyear.csv` | ❌ Chưa tích hợp | Chỉ dùng KBang. Cần merge MangYang vào GeoJSON để bản đồ đủ cả 2 huyện. |
| Ranh giới huyện KBang & MangYang | `Vietnam_Deforestation_Pilot/01_boundaries/*.geojson` | ❌ Chưa dùng | Có sẵn file GeoJSON ranh giới huyện. Có thể hiển thị đường viền khu vực nghiên cứu trên bản đồ. |
| Mạng lưới đường bộ | `Vietnam_Deforestation_Pilot/03_roads_osm/kbang_roads.geojson` (3MB) | ❌ Chưa dùng | Có thể thêm lớp đường xá như một layer hiển thị thêm thông tin. |
| GFW Integrated Alerts (raster) | `Vietnam_Deforestation_Pilot/02_rasters_raw/*.tif` | ❌ Không thể dùng trực tiếp | Định dạng GeoTIFF. Cần Tile Server (TiTiler) để phục vụ lên web. |
| Kết quả dự đoán model (raster) | `Vietnam_Deforestation_Pilot/05_outputs_geotiff/KBang_FINAL_prob1_2023.tif` (86MB) | ❌ Không thể dùng trực tiếp | File rất nặng. Cần chuyển đổi sang Cloud Optimized GeoTIFF hoặc vector tiles. |
| Kết quả dự đoán model (có threshold) | `Vietnam_Deforestation_Pilot/01_boundaries/KBang_RF_predThr_2023_thr07.tif` | ❌ Chưa dùng | **File này nhẹ hơn (989KB)** — đây là vùng cảnh báo HIGH RISK đã threshold. Có thể chuyển sang GeoJSON. |
| Bảng dữ liệu tổng hợp | `Vietnam_Deforestation_Pilot/FINAL_research_package/ALL_master_FINAL_research_ready_with_rain_elev_lossyear.csv` | ❌ Chưa dùng | Bảng đầy đủ nhất (6000 điểm, cả 2 huyện). Nên dùng để tạo GeoJSON thay thế. |
| Biểu đồ nghiên cứu | `results/Figure3_ROC_split.png`, `Figure6_RF_importance.png` | ✅ Đang dùng | Đã copy vào `public/images/`. Hiển thị trong trang Publication. |
| Biểu đồ nghiên cứu bổ sung | `FINAL_research_package/Figure3b_*.png`, `Figure6_LogReg_*.png`, `Figure_ROC_MangYang_*.png` | ❌ Chưa dùng | 4 biểu đồ thêm chưa được hiển thị. |
| Ảnh thực địa Gia Lai 2026 | `docs/Image Gia Lai 2026/*.JPG` (5 ảnh) | ✅ Đang dùng | Đã copy vào `public/images/gialai_2026/`. Hiển thị trong Landing Page. Nhưng trang About vẫn dùng ảnh Unsplash. |
| Ảnh thực địa Ninh Bình 2025 | `docs/Imgae Ninh Bình 2025/*.jpg` (5 ảnh) | ✅ Đang dùng (một phần) | Đã copy vào `public/images/ninhbinh_2025/`. Hiển thị trong Landing Page. Trang About vẫn dùng ảnh Unsplash. |
| Logo chính thức | `docs/Forest Logo.png` | ✅ Đang dùng | Đã copy vào `public/images/logo.png`. Hiển thị Header + Map header + Favicon. |
| Dữ liệu khu bảo tồn | Không có | 🔴 Thiếu hoàn toàn | `mock-protected-areas.geojson` chỉ là 1 polygon giả. Cần dữ liệu thật từ cơ quan nhà nước. |

---

## PHẦN 3: TÓM TẮT & ĐỀ XUẤT ƯU TIÊN

### Tổng quan tiến độ
| Nhóm | Tổng | ✅ Hoàn thành | ⚠️ Một phần | 🔴 Chưa làm |
|:---|:---:|:---:|:---:|:---:|
| Tính năng chức năng (20 mục) | 20 | 10 (50%) | 6 (30%) | 4 (20%) |
| Dữ liệu (14 loại) | 14 | 5 (36%) | 0 | 9 (64%) |

### ⚡ Ưu tiên cao — Cần làm ngay (không cần thêm thông tin)
1. **Sửa lỗi số liệu AUC trong Publication**: Text đang ghi AUC=0.942, số thực trong `Table3_model_performance_HansenLoss.csv` là RF=**0.892**, LogReg=**0.788**. Đây là sai lệch nghiêm trọng với bài báo khoa học.
2. **Thay ảnh Unsplash trên About page** bằng ảnh thực từ `public/images/ninhbinh_2025/` và `public/images/gialai_2026/`.
3. **Merge MangYang data** vào GeoJSON để bản đồ hiển thị đầy đủ cả 2 huyện nghiên cứu.
4. **Hiển thị ranh giới huyện** từ `01_boundaries/*.geojson` lên bản đồ (viền khu vực nghiên cứu).

### 🟡 Ưu tiên trung bình — Cần thêm quyết định kỹ thuật
5. **Chuyển `KBang_RF_predThr_2023_thr07.tif` (989KB) sang GeoJSON** để hiển thị vùng HIGH RISK rõ ràng thay vì heatmap.
6. **Hoàn thiện Story 3.2** (Báo cáo cộng đồng ẩn danh): Chạy và test FastAPI backend.
7. **Thêm các biểu đồ bổ sung** từ `FINAL_research_package/` vào trang Publication.

### 🔵 Ưu tiên thấp — Cần thông tin bên ngoài
8. **Tile Server cho Hansen/SRTM/CHIRPS**: Cần cơ sở hạ tầng (TiTiler, Docker).
9. **Facebook feed tự động**: Cần Page Access Token.
10. **Dữ liệu khu bảo tồn chính thức**: Cần từ cơ quan có thẩm quyền.
11. **Cập nhật email/Facebook thật** trong Contact page.
12. **Cấu hình form gửi email thật** (Formspree/EmailJS).
