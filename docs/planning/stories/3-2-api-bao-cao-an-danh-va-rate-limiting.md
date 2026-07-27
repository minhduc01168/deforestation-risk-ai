# Story 3.2: API Báo cáo ẩn danh & Rate-limiting

Status: ready-for-dev
epic: epic-3
priority: high

## Story

As a Quản trị viên hệ thống,
I want hệ thống backend tự động lưu báo cáo ẩn danh dựa trên địa chỉ IP và giới hạn tần suất (Rate-limiting),
So that hệ thống không bị spam và không cần tôi phải duyệt bài thủ công.

## Acceptance Criteria

1. **Given** người dùng chưa đăng nhập (ẩn danh)
2. **When** request được gửi đến Backend (FastAPI endpoint `POST /api/reports`)
3. **Then** hệ thống vẫn cho phép submit báo cáo, gán `user_id = null`.
4. **And** hệ thống lưu địa chỉ IP (đã băm bằng SHA-256 với salt) vào cột `user_ip_hash`.
5. **And** nếu IP này đã gửi >= 3 báo cáo trong vòng 10 phút, API sẽ trả về lỗi HTTP 429 Too Many Requests.

## Tasks / Subtasks

- [ ] Task 1: Trong `backend/auth.py`, tạo `get_optional_user` để cho phép `current_user` có thể là `None` nếu request không có token.
- [ ] Task 2: Cập nhật endpoint `POST /api/reports` trong `backend/main.py` để sử dụng `get_optional_user` thay vì bắt buộc.
- [ ] Task 3: Viết logic Rate Limiting trong `POST /api/reports`: Truy vấn số lượng báo cáo tạo bởi `user_ip_hash` trong 10 phút qua. Nếu `count >= 3`, raise HTTPException 429.
- [ ] Task 4: Chạy pytest cho backend để kiểm thử việc submit nặc danh và chặn rate limit.
- [ ] Task 5: Cập nhật lại frontend `Map.tsx` để thực sự gửi POST request tới `/api/reports` (bằng fetch).

## Dev Notes

- Cần dùng `datetime.utcnow() - timedelta(minutes=10)` để đếm số report trong `main.py`.
- Lấy IP từ `request.client.host`.

## References

- [docs/planning/epics.md] - Epic 3, Story 3.2

## Code Review Logs

**Date**: 2026-07-26
**Reviewer**: BMAD Code Review
**Status**: PASSED

**Findings**:
1. **Architecture & Design**: 
   - Hàm `get_optional_user` được viết đúng chuẩn FastAPI Dependency.
   - Endpoint `/api/reports` bắt Rate Limiting khá đơn giản nhưng hiệu quả bằng cách đếm số report trong DB (phù hợp cho quy mô dự án hiện tại thay vì cần dùng Redis tốn kém).
   - Frontend đã fetch đúng endpoint, bắt lỗi `429 Too Many Requests` và hiển thị alert hữu ích cho người dùng.
2. **Quality & Testing**:
   - Backend pytest (`test_api.py`) đã chạy thành công 4/4 test cases.
   - Frontend Jest test vẫn xanh (green).

**Action**: Đạt chuẩn, có thể chuyển trạng thái Done chờ manual QA test.
