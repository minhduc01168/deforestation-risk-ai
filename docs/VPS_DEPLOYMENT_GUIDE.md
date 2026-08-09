# 🚀 Hướng Dẫn Deploy Hệ Thống VIGIL Web-GIS Trên VPS (Domain: `www.vigil.green`)

Tài liệu này hướng dẫn chi tiết từng bước đóng gói, triển khai (deploy), cấu hình **Cloudflare DNS/SSL** và **Nginx Reverse Proxy** cho hệ thống **VIGIL Web-GIS (Frontend, Backend & PostGIS Database)** với tên miền chính thức: **`www.vigil.green`** (và `vigil.green`).

---

## 📋 Architecture Overview

Hệ thống VIGIL bao gồm 3 dịch vụ chính:
1. **Frontend:** App Next.js 16 (Port `3000`) -> Image: `web-gis-frontend:latest`
2. **Backend:** FastAPI Python 3.9 + Uvicorn (Port `8000`) -> Image: `web-gis-backend:latest`
3. **Database:** PostgreSQL 15 + PostGIS 3.3 (Port `5432`) -> Image: `postgis/postgis:15-3.3`

---

## 🛠️ PHẦN 1: Triển Khai Trực Tiếp Trên VPS (Khuyên Dùng)

Nếu bạn đã clone/copy mã nguồn `deforestation-risk-ai` lên VPS, bạn chỉ cần di chuyển vào thư mục `web-gis` và khởi chạy trực tiếp:

```bash
cd ~/deforestation-risk-ai/web-gis

# Biên dịch và khởi chạy tất cả dịch vụ ở chế độ background
docker compose up -d --build
```

---

## 📦 PHẦN 2: Triển Khai Bằng File Nén Image `.tar.gz` (Offline Deploy)

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
# Đảm bảo bạn chuyển vào đúng thư mục web-gis chứa folder docker-images
cd ~/deforestation-risk-ai/web-gis

# Nạp các Docker image
gunzip -c ./docker-images/web-gis-frontend.tar.gz | docker load
gunzip -c ./docker-images/web-gis-backend.tar.gz | docker load
gunzip -c ./docker-images/postgis-db.tar.gz | docker load
```

### Bước 2.3: Tạo tệp `docker-compose.prod.yml` trên VPS
```bash
cat << 'EOF' > docker-compose.prod.yml
services:
  db:
    image: postgis/postgis:15-3.3
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword_prod_secure
      POSTGRES_DB: gialai_forest
    ports:
      - "5432:5432"
    volumes:
      - postgres_prod_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d gialai_forest"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    image: web-gis-backend:latest
    restart: always
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgrespassword_prod_secure@db:5432/gialai_forest
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - backend_prod_uploads:/app/uploads

  frontend:
    image: web-gis-frontend:latest
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://www.vigil.green
    depends_on:
      - backend

volumes:
  postgres_prod_data:
  backend_prod_uploads:
EOF

# Khởi chạy các container bằng file prod:
docker compose -f docker-compose.prod.yml up -d
```

---

## 🌐 PHẦN 3: Cấu Hình Cloudflare (DNS & SSL/TLS)

### Bước 3.1: Thêm bản ghi DNS
1. Đăng nhập **Cloudflare Dashboard** -> Chọn domain `vigil.green`.
2. Vào mục **DNS** -> **Records** -> Nhấn **Add record**:
   - **Bản ghi 1 (Root Domain):**
     - `Type`: `A`
     - `Name`: `@`
     - `IPv4 address`: IP công khai của VPS (VD: `170.79.x.x`)
     - `Proxy status`: Bật **Proxied** 🟠 (Đám mây màu cam)
   - **Bản ghi 2 (Subdomain www):**
     - `Type`: `CNAME`
     - `Name`: `www`
     - `Target`: `@`
     - `Proxy status`: Bật **Proxied** 🟠

### Bước 3.2: Cấu hình mã hóa SSL/TLS Tránh Lỗi Redirect Loop
1. Vào **SSL/TLS** -> **Overview** trên Cloudflare.
2. Đổi chế độ sang **Full** (hoặc **Full (strict)**).
   > ⚠️ *TUYỆT ĐỐI KHÔNG chọn **Flexible** để tránh lỗi 301 Too Many Redirects.*

---

## 🔒 PHẦN 4: Cấu Hình Nginx Reverse Proxy Trên VPS

Nginx sẽ nhận kết nối từ Cloudflare (Port 80/443) và điều hướng nội bộ:
- Cổng `3000` -> Next.js Frontend
- Cổng `8000` -> FastAPI Backend (`/api/`)

### Bước 4.1: Cài đặt Nginx
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

    # 1. Điều hướng Frontend Next.js (Port 3000)
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

    # 2. Điều hướng FastAPI Backend (Port 8000)
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

### Bước 4.3: Xử lý xung đột cổng 80 & Bật Nginx

Nếu gặp lỗi cổng 80 bị chiếm bởi Apache2 hoặc Traefik (`n8n-traefik-1`):

```bash
# 1. Tắt Apache2 (nếu có):
systemctl stop apache2 && systemctl disable apache2

# 2. Tắt Traefik container (nếu có):
docker stop n8n-traefik-1 && docker update --restart=no n8n-traefik-1

# 3. Kích hoạt site Nginx & Khởi động service:
ln -sf /etc/nginx/sites-available/vigil /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable --now nginx
systemctl status nginx
```

---

## 📊 PHẦN 5: Các Lệnh Quản Trị Thường Dùng Trên VPS

| Thao tác | Lệnh thực hiện |
| :--- | :--- |
| **Nạp lại Nginx** | `systemctl reload nginx` |
| **Xem log Nginx** | `tail -f /var/log/nginx/vigil_access.log` |
| **Xem log Docker** | `cd ~/deforestation-risk-ai/web-gis && docker compose logs -f` |
| **Khởi động lại Docker** | `cd ~/deforestation-risk-ai/web-gis && docker compose restart` |
| **Sao lưu Database** | `docker exec -t web-gis-db-1 pg_dump -U postgres gialai_forest > backup.sql` |
| **Khôi phục Database** | `cat backup.sql \| docker exec -i web-gis-db-1 psql -U postgres gialai_forest` |
