# 🚀 Hướng Dẫn Build, Save Docker Image & Triển Khai (Deploy) Hệ Thống VIGIL Trên VPS Mới

Tài liệu này hướng dẫn chi tiết từng bước đóng gói (build & export) các Docker Image của hệ thống **VIGIL Web-GIS (Frontend, Backend & PostGIS Database)** từ máy tính cá nhân/máy build, chuyển qua mạng (SCP/SFTP) và triển khai lên máy chủ VPS mới.

---

## 📋 Danh Sách Dịch Vụ Cần Đóng Gói (Architecture Overview)

Hệ thống VIGIL bao gồm 3 dịch vụ chính:
1. **Frontend:** App Next.js 16 (Port `3000`) -> Image: `web-gis-frontend:latest`
2. **Backend:** FastAPI Python 3.9 + Uvicorn (Port `8000`) -> Image: `web-gis-backend:latest`
3. **Database:** PostgreSQL 15 + PostGIS 3.3 (Port `5432`) -> Image: `postgis/postgis:15-3.3`

---

## 🛠️ PHẦN 1: Build & Nén Docker Image Trên Máy Local

Thực hiện các lệnh sau tại thư mục chứa dự án `web-gis`:

### Bước 1.1: Biên dịch tất cả Docker Images
```bash
cd /path/to/deforestation-risk-ai/web-gis

# Tiến hành build các image không sử dụng cache để đảm bảo code mới nhất
docker compose build --no-cache
```

### Bước 1.2: Tạo thư mục lưu trữ & Save Image thành file nén `.tar.gz`
```bash
# Tạo thư mục chứa các tệp image đã xuất
mkdir -p ./docker-images

# 1. Nén Image Frontend
echo "📦 Đang nén Frontend image..."
docker save web-gis-frontend:latest | gzip > ./docker-images/web-gis-frontend.tar.gz

# 2. Nén Image Backend
echo "📦 Đang nén Backend image..."
docker save web-gis-backend:latest | gzip > ./docker-images/web-gis-backend.tar.gz

# 3. Nén Image PostGIS Database
echo "📦 Đang nén PostGIS Database image..."
docker save postgis/postgis:15-3.3 | gzip > ./docker-images/postgis-db.tar.gz

echo "✅ Hoàn tất xuất & nén tất cả Docker Images!"
ls -lh ./docker-images
```

---

## 🚚 PHẦN 2: Truyền Tệp Sang Máy Chủ VPS Mới

Sử dụng lệnh `scp` hoặc `rsync` để truyền thư mục `docker-images` và tệp cấu hình `docker-compose.yml` lên VPS.

> 💡 *Thay `YOUR_VPS_IP` bằng IP của VPS và `root` bằng user đăng nhập VPS.*

```bash
# Tạo thư mục dự án trên VPS
ssh root@YOUR_VPS_IP "mkdir -p /opt/vps-vigil-webgis"

# Copy thư mục chứa các file .tar.gz lên VPS
scp -r ./docker-images root@YOUR_VPS_IP:/opt/vps-vigil-webgis/

# Copy file docker-compose.yml lên VPS
scp ./docker-compose.yml root@YOUR_VPS_IP:/opt/vps-vigil-webgis/
```

---

## 🌐 PHẦN 3: Triển Khai (Deploy) Trên VPS Mới

Đăng nhập vào VPS mới để tiến hành nạp (load) images và khởi chạy hệ thống.

```bash
ssh root@YOUR_VPS_IP
cd /opt/vps-vigil-webgis
```

### Bước 3.1: Cài đặt Docker & Docker Compose (Nếu VPS mới chưa cài)
```bash
# Cài đặt Docker nhanh (Ubuntu/Debian)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Cài đặt Docker Compose v2 plugin
apt-get update && apt-get install -y docker-compose-plugin

# Kiểm tra phiên bản
docker --version
docker compose version
```

### Bước 3.2: Load (Bung nén) các Docker Image vào VPS
```bash
echo "📥 Đang nạp Image Frontend..."
gunzip -c ./docker-images/web-gis-frontend.tar.gz | docker load

echo "📥 Đang nạp Image Backend..."
gunzip -c ./docker-images/web-gis-backend.tar.gz | docker load

echo "📥 Đang nạp Image PostGIS..."
gunzip -c ./docker-images/postgis-db.tar.gz | docker load

echo "✅ Kiểm tra danh sách image trên VPS:"
docker images
```

### Bước 3.3: Cấu hình `docker-compose.prod.yml` Môi Trường Production
Tạo file cấu hình production `docker-compose.prod.yml` để trỏ đúng IP/Tên miền VPS công khai.

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
      # Thay YOUR_VPS_IP hoặc domain thật của bạn (VD: https://api.vigil.vn hoặc http://1.2.3.4:8000)
      - NEXT_PUBLIC_API_URL=http://YOUR_VPS_IP:8000
    depends_on:
      - backend

volumes:
  postgres_prod_data:
  backend_prod_uploads:
EOF
```

> ⚠️ *Lưu ý: Thay `YOUR_VPS_IP` trong tệp `docker-compose.prod.yml` bằng địa chỉ IP công khai hoặc Domain tên miền của VPS.*

### Bước 3.4: Khởi chạy ứng dụng ở chế độ Background (Detached)
```bash
docker compose -f docker-compose.prod.yml up -d
```

### Bước 3.5: Kiểm tra trạng thái ứng dụng
```bash
# Kiểm tra danh sách container đang chạy
docker compose -f docker-compose.prod.yml ps

# Xem log kiểm tra các dịch vụ
docker compose -f docker-compose.prod.yml logs -f --tail 50
```

---

## 🔒 PHẦN 4: Nginx Reverse Proxy & SSL HTTPS (Khuyên Dùng)

Để chạy tên miền chính thức (VD: `vigil.vn`) có chứng chỉ HTTPS (SSL Let's Encrypt), hãy cài đặt Nginx trên VPS:

```bash
apt update && apt install -y nginx certbot python3-certbot-nginx
```

Cấu hình Nginx reverse proxy tại `/etc/nginx/sites-available/vigil`:
```nginx
server {
    server_name vigil.vn www.vigil.vn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

ln -s /etc/nginx/sites-available/vigil /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Cấp chứng chỉ HTTPS miễn phí
certbot --nginx -d vigil.vn -d www.vigil.vn
```

---

## 📊 PHẦN 5: Các Lệnh Quản Trị Thường Dùng Trên VPS

| Thao tác | Lệnh thực hiện |
| :--- | :--- |
| **Xem log thời gian thực** | `docker compose -f docker-compose.prod.yml logs -f` |
| **Khởi động lại toàn bộ** | `docker compose -f docker-compose.prod.yml restart` |
| **Dừng ứng dụng** | `docker compose -f docker-compose.prod.yml down` |
| **Sao lưu Database** | `docker exec -t vps-vigil-webgis-db-1 pg_dump -U postgres gialai_forest > backup.sql` |
| **Khôi phục Database** | `cat backup.sql \| docker exec -i vps-vigil-webgis-db-1 psql -U postgres gialai_forest` |
