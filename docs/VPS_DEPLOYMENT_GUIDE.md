# 🚀 Hướng Dẫn Deploy Hệ Thống VIGIL Web-GIS Trên VPS (Domain: `www.vigil.green`)

Tài liệu này hướng dẫn chi tiết từng bước đóng gói, triển khai (deploy), cấu hình **Cloudflare DNS/SSL** và **Nginx Reverse Proxy** cho hệ thống **VIGIL Web-GIS (Frontend, Backend & PostGIS Database)** với tên miền chính thức: **`www.vigil.green`** (và `vigil.green`).

---

## 📋 Architecture Overview

Hệ thống VIGIL bao gồm 3 dịch vụ chính:
1. **Frontend:** App Next.js 16 (Port `3000`) -> Image: `web-gis-frontend:latest`
2. **Backend:** FastAPI Python 3.9 + Uvicorn (Port `8000`) -> Image: `web-gis-backend:latest`
3. **Database:** PostgreSQL 15 + PostGIS 3.3 (Port `5432`) -> Image: `postgis/postgis:15-3.3`

---

> [!IMPORTANT]
> **Về biến `NEXT_PUBLIC_API_URL` — Đọc trước khi build!**
>
> Next.js nhúng các biến `NEXT_PUBLIC_*` vào JS bundle **lúc build** (không phải runtime).
> Vì vậy **KHÔNG thể** set bằng `environment:` trong docker-compose — sẽ không có tác dụng.
>
> **Cách đúng:** Truyền qua `--build-arg` khi `docker build`:
> ```bash
> docker build --build-arg NEXT_PUBLIC_API_URL=https://www.vigil.green \
>   -t web-gis-frontend:latest ./frontend
> ```
> Dockerfile đã có giá trị mặc định `https://www.vigil.green`, nên nếu không truyền `--build-arg` thì vẫn dùng đúng URL production.

---

## 🛠️ PHẦN 1: Triển Khai Trực Tiếp Trên VPS (Khuyên Dùng)

Nếu bạn đã clone/copy mã nguồn `deforestation-risk-ai` lên VPS:

```bash
cd ~/deforestation-risk-ai/web-gis

# ⚠️ QUAN TRỌNG: Phải build frontend với --build-arg để bake đúng API URL vào bundle.
# Không thể dùng "docker compose up --build" trực tiếp vì compose dev không truyền build-arg production.

# Bước 1: Build frontend image với production API URL
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://www.vigil.green \
  -t web-gis-frontend:latest \
  ./frontend

# Bước 2: Build backend image
docker build -t web-gis-backend:latest ./backend

# Bước 3: Khởi chạy tất cả dịch vụ bằng file prod
docker compose -f docker-compose.prod.yml up -d
```

---

## 📦 PHẦN 2: Triển Khai Bằng File Nén Image `.tar.gz` (Offline Deploy)

### Bước 2.1: Đóng gói tại máy Local

> [!WARNING]
> Phải build frontend với `--build-arg` production URL trước khi đóng gói. Không dùng `docker compose build` thông thường vì sẽ build với `http://localhost:8000`.

```bash
cd /path/to/deforestation-risk-ai/web-gis

# 1. Build frontend image với đúng production API URL (bắt buộc)
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://www.vigil.green \
  -t web-gis-frontend:latest \
  ./frontend

# 2. Build backend image
docker build -t web-gis-backend:latest ./backend

# 3. Xuất và nén ra thư mục docker-images
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
    # LƯU Ý: NEXT_PUBLIC_API_URL được bake vào JS bundle lúc "docker build",
    # không phải lúc runtime. Dòng environment bên dưới KHÔNG có tác dụng với Next.js.
    # URL đã được nhúng sẵn vào image khi build với --build-arg (xem Phần 1/2.1).
    # environment:
    #   - NEXT_PUBLIC_API_URL=https://www.vigil.green  # <- vô hiệu, chỉ để tham khảo
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
- Cổng `8000` -> Thư mục uploads ảnh thực địa (`/uploads/`)

### Bước 4.1: Cài đặt Nginx
```bash
apt update && apt install -y nginx
```

### Bước 4.2: Tạo tệp cấu hình Nginx

> [!IMPORTANT]
> **Bắt buộc phải có block `location /uploads/`** để ảnh báo cáo thực địa hiển thị được trong admin dashboard. Thiếu block này, ảnh sẽ bị lỗi 404 và hiện chữ "⚠️ Không tải được ảnh".

```bash
cat << 'EOF' > /etc/nginx/sites-available/vigil
server {
    listen 80;
    server_name vigil.green www.vigil.green;

    access_log /var/log/nginx/vigil_access.log;
    error_log /var/log/nginx/vigil_error.log;

    # 1. Điều hướng FastAPI Backend API (Port 8000) — phải đứng trước location /
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

    # 2. Điều hướng thư mục uploads (ảnh báo cáo thực địa) — QUAN TRỌNG
    #    Thiếu block này -> ảnh trong admin dashboard sẽ không load được
    location /uploads/ {
        proxy_pass http://127.0.0.1:8000/uploads/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 3. Điều hướng Frontend Next.js (Port 3000) — đứng sau /api/ và /uploads/
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

## ✅ PHẦN 5: Kiểm Tra Sau Deploy

Sau khi deploy, kiểm tra từng hạng mục sau:

```bash
# 1. Kiểm tra backend API hoạt động
curl -X POST https://www.vigil.green/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=Admin%40123"
# Kết quả mong đợi: {"access_token": "...", "token_type": "bearer"}

# 2. Kiểm tra endpoint reports (không cần auth)
curl https://www.vigil.green/api/reports
# Kết quả mong đợi: [...] (mảng JSON)

# 3. Kiểm tra uploads accessible
curl -I https://www.vigil.green/uploads/
# Kết quả mong đợi: HTTP/1.1 200 hoặc 404 (nhưng không phải 502)

# 4. Xem log nếu có lỗi
docker compose -f docker-compose.prod.yml logs -f frontend
docker compose -f docker-compose.prod.yml logs -f backend
```

| Hạng mục | Cách kiểm tra | Kết quả mong đợi |
|----------|---------------|------------------|
| Frontend | Truy cập `https://www.vigil.green` | Trang chủ VIGIL hiển thị |
| Admin login | `/admin` → nhập `admin` / `Admin@123` | Đăng nhập thành công |
| Báo cáo thực địa | Bản đồ → click → gửi ảnh | Không yêu cầu đăng nhập, gửi OK |
| Ảnh admin | Admin → xem báo cáo → click chi tiết | Ảnh hiển thị (không phải "⚠️ Không tải được") |
| OG tags | [opengraph.xyz](https://www.opengraph.xyz) → nhập URL | Preview VIGIL hiển thị đúng |
| Mobile map | DevTools → iPhone SE → trang bản đồ | Nút "Bộ lọc" toggle sidebar hiện trên mobile |

---

## 📊 PHẦN 6: Các Lệnh Quản Trị Thường Dùng Trên VPS

| Thao tác | Lệnh thực hiện |
| :--- | :--- |
| **Nạp lại Nginx** | `systemctl reload nginx` |
| **Xem log Nginx** | `tail -f /var/log/nginx/vigil_access.log` |
| **Xem log Docker** | `docker compose -f docker-compose.prod.yml logs -f` |
| **Khởi động lại Docker** | `docker compose -f docker-compose.prod.yml restart` |
| **Sao lưu Database** | `docker exec -t web-gis-db-1 pg_dump -U postgres gialai_forest > backup.sql` |
| **Khôi phục Database** | `cat backup.sql \| docker exec -i web-gis-db-1 psql -U postgres gialai_forest` |
| **Rebuild frontend (sau update code)** | `docker build --build-arg NEXT_PUBLIC_API_URL=https://www.vigil.green -t web-gis-frontend:latest ./frontend && docker compose -f docker-compose.prod.yml up -d --no-deps frontend` |
| **Rebuild backend (sau update code)** | `docker build -t web-gis-backend:latest ./backend && docker compose -f docker-compose.prod.yml up -d --no-deps backend` |
