# 🚀 Hướng Dẫn Build, Save Docker Image & Triển Khai (Deploy) Hệ Thống VIGIL Trên VPS Mới

Tài liệu này hướng dẫn chi tiết từng bước đóng gói (build & export) các Docker Image của hệ thống **VIGIL Web-GIS (Frontend, Backend & PostGIS Database)**, triển khai lên máy chủ VPS mới, cấu hình **Cloudflare DNS/SSL** và **Nginx Reverse Proxy** với tên miền chính thức: **`www.vigil.green`** (và `vigil.green`).

---

## 📋 Danh Sách Dịch Vụ Cần Đóng Gói (Architecture Overview)

Hệ thống VIGIL bao gồm 3 dịch vụ chính:
1. **Frontend:** App Next.js 16 (Port `3000`) -> Image: `web-gis-frontend:latest`
2. **Backend:** FastAPI Python 3.9 + Uvicorn (Port `8000`) -> Image: `web-gis-backend:latest`
3. **Database:** PostgreSQL 15 + PostGIS 3.3 (Port `5432`) -> Image: `postgis/postgis:15-3.3`

---

## 🛠️ PHẦN 1: Triển Khai Trực Tiếp Trên VPS Mới (Khuyên Dùng)

Nếu bạn đã clone/copy thư mục mã nguồn `deforestation-risk-ai` lên VPS, bạn chỉ cần di chuyển vào thư mục `web-gis` và khởi chạy trực tiếp:

```bash
cd ~/deforestation-risk-ai/web-gis

# Biên dịch và khởi chạy tất cả dịch vụ ở chế độ background
docker compose up -d --build
```

---

## 📦 PHẦN 2: Triển Khai Theo Cách Load File Image `.tar.gz` (Offline Deploy)

Nếu bạn thực hiện đóng gói tại máy local rồi chuyển file `.tar.gz` lên VPS:

### Bước 2.1: Đóng gói tại máy Local
```bash
cd /path/to/deforestation-risk-ai/web-gis

# 1. Build images
docker compose build --no-cache

# 2. Xuất và nén ra thư mục docker-images
mkdir -p ./docker-images
docker save web-gis-frontend:latest | gzip > ./docker-images/web-gis-frontend.tar.gz
docker save web-gis-backend:latest | gzip > ./docker-images/web-gis-backend.tar.gz
docker save postgis/postgis:15-3.3 | gzip > ./docker-images/postgis-db.tar.gz
```

### Bước 2.2: Copy lên VPS & Load Images
```bash
# Trên VPS, di chuyển vào thư mục chứa dự án:
cd ~/deforestation-risk-ai/web-gis

# Bung nạp các Docker image
gunzip -c ./docker-images/web-gis-frontend.tar.gz | docker load
gunzip -c ./docker-images/web-gis-backend.tar.gz | docker load
gunzip -c ./docker-images/postgis-db.tar.gz | docker load

# Khởi chạy các container
docker compose up -d
```

---

## 🌐 PHẦN 3: Cấu Hình Cloudflare (DNS & SSL/TLS) Cho Tên Miền `www.vigil.green`

### Bước 3.1: Thêm bản ghi DNS trên Cloudflare Dashboard
1. Đăng nhập vào **Cloudflare Dashboard** -> Chọn domain `vigil.green`.
2. Vào mục **DNS** -> **Records** -> Chọn **Add record**:
   - **Bản ghi 1 (Root Domain):**
     - `Type`: `A`
     - `Name`: `@` (hoặc `vigil.green`)
     - `IPv4 address`: Địa chỉ IP công khai của VPS (VD: `170.79.x.x`)
     - `Proxy status`: Bật **Proxied** 🟠 (Đám mây màu cam)
   - **Bản ghi 2 (WWW Subdomain):**
     - `Type`: `CNAME`
     - `Name`: `www`
     - `Target`: `@` (hoặc `vigil.green`)
     - `Proxy status`: Bật **Proxied** 🟠

### Bước 3.2: Cấu hình mã hóa SSL/TLS trên Cloudflare
1. Đáo tới mục **SSL/TLS** -> **Overview** trên menu Cloudflare.
2. Đổi chế độ sang **Full** (hoặc **Full (strict)** nếu đã cài SSL Certificate ở VPS).
   > ⚠️ *Lưu ý: Không dùng chế độ **Flexible** để tránh bị lỗi lặp chuyển hướng 301 (Too Many Redirects).*

---

## 🔒 PHẦN 4: Cấu Hình Nginx Reverse Proxy Trên VPS

Nginx sẽ nhận request từ Cloudflare (Port 80/443) và điều hướng nội bộ:
- Cổng `3000` -> App Next.js Frontend
- Cổng `8000` -> FastAPI Backend (`/api/`)

### Bước 4.1: Cài đặt Nginx trên VPS
```bash
apt update && apt install -y nginx
```

### Bước 4.2: Tạo tệp cấu hình Nginx
```bash
cat << 'EOF' > /etc/nginx/sites-available/vigil
server {
    listen 80;
    server_name vigil.green www.vigil.green;

    access_log /var/log/nginx/vigil_access.log;
    error_log /var/log/nginx/vigil_error.log;

    # 1. Điều hướng cho Next.js Frontend (Port 3000)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 2. Điều hướng cho FastAPI Backend (Port 8000)
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Giới hạn dung lượng tải ảnh/báo cáo thực địa
        client_max_body_size 50M;
    }
}
EOF
```

### Bước 4.3: Kích hoạt tệp cấu hình & Khởi động lại Nginx
```bash
# Tạo liên kết kích hoạt site
ln -sf /etc/nginx/sites-available/vigil /etc/nginx/sites-enabled/

# Xóa site mặc định (nếu có)
rm -f /etc/nginx/sites-enabled/default

# Kiểm tra cú pháp cấu hình
nginx -t

# Nạp lại Nginx
systemctl reload nginx
```

---

## ⚙️ PHẦN 5: Cập Nhật Cấu Hình Biến Môi Trường `docker-compose.yml`

Trong tệp `web-gis/docker-compose.yml`, cập nhật biến môi trường Frontend để kết nối API qua HTTPS domain chính thức:

```yaml
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://www.vigil.green
    depends_on:
      - backend
```

Khởi động lại container sau khi cập nhật:
```bash
cd ~/deforestation-risk-ai/web-gis
docker compose up -d --build frontend
```

---

## 📊 PHẦN 6: Các Lệnh Quản Trị Thường Dùng Trên VPS

| Thao tác | Lệnh thực hiện |
| :--- | :--- |
| **Xem log thời gian thực** | `docker compose logs -f` |
| **Khởi động lại dịch vụ** | `docker compose restart` |
| **Dừng ứng dụng** | `docker compose down` |
| **Kiểm tra trạng thái Nginx** | `systemctl status nginx` |
| **Sao lưu Database** | `docker exec -t web-gis-db-1 pg_dump -U postgres gialai_forest > backup.sql` |
| **Khôi phục Database** | `cat backup.sql \| docker exec -i web-gis-db-1 psql -U postgres gialai_forest` |
