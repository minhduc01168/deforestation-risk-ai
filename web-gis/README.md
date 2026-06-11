# Gia Lai Deforestation Web GIS

Dự án này chứa mã nguồn cho hệ thống Web GIS Cảnh báo Mất rừng Gia Lai, được chia thành Frontend (Next.js) và Backend (FastAPI).

## Cấu trúc thư mục
- `data-pipeline/`: Chứa script Python chuyển đổi dữ liệu CSV hiện có thành dạng bản đồ (GeoJSON).
- `backend/`: API Server xử lý các tính năng gửi báo cáo, upload ảnh và lưu vào CSDL PostgreSQL.
- `frontend/`: Giao diện Web hiển thị bản đồ, thanh trượt thời gian và sidebar.

## Hướng dẫn chạy trên Server

Vì cả Frontend và Backend sẽ chạy trên cùng một máy chủ (Server), bạn cần cài đặt Node.js và Python (>=3.9) trên máy chủ đó.

### Bước 1: Tiền xử lý Dữ liệu Bản đồ
Bạn chỉ cần chạy script này một lần (hoặc khi có file CSV mới). Script sẽ lấy file CSV từ data gốc và xuất ra `frontend/public/data/grid_data.geojson`.
```bash
python data-pipeline/csv_to_geojson.py
```

### Bước 2: Chạy Backend (FastAPI)
Backend sử dụng Python và PostgreSQL. Bạn cần đảm bảo đã tạo CSDL PostgreSQL và cài Extension PostGIS.
```bash
cd backend
pip install -r requirements.txt

# Tạo file .env chứa đường dẫn kết nối PostgreSQL của bạn
# VD: DATABASE_URL=postgresql://postgres:password@localhost:5432/gialai_forest
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gialai_forest" > .env

# Chạy server ở port 8000
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation tự động sẽ có tại: `http://localhost:8000/docs`

### Bước 3: Chạy Frontend (Next.js)
Mở một Terminal mới (giữ Terminal Backend chạy):
```bash
cd frontend
npm install
npm run dev
```
Website sẽ khởi chạy tại: `http://localhost:3000`

---

## Triển khai bằng Docker Compose (Khuyến nghị)

Phương pháp này phù hợp cho cả việc chạy thử trên máy cá nhân (Local) lẫn triển khai lên Server thật (Production), giúp tự động cài đặt cả Database PostgreSQL, Backend, và Frontend mà không cần cài môi trường riêng rẽ.

**Yêu cầu:** Máy đã cài đặt [Docker](https://docs.docker.com/get-docker/) và [Docker Compose](https://docs.docker.com/compose/install/).

1. **Di chuyển vào thư mục dự án:**
   ```bash
   cd d:\Slide_THPT\NCKH_TA\deforestation-risk-ai\web-gis
   ```
   *(Trường hợp ở trên Linux server thì cd vào thư mục web-gis tương ứng).*

2. **Cấu hình API Domain (nếu chạy trên Server Production):**
   Trong file `docker-compose.yml`, ở phần service `frontend`, hãy sửa lại `NEXT_PUBLIC_API_URL` thành IP hoặc Domain server của bạn (mặc định là http://localhost:8000 nếu chạy ở máy cá nhân).

3. **Chạy hệ thống (Run in background):**
   ```bash
   docker-compose up --build -d
   ```

4. **Truy cập ứng dụng:**
   - Website chính thức: `http://localhost:3000`
   - API Backend Docs: `http://localhost:8000/docs`

5. **Cách dừng hệ thống:**
   ```bash
   docker-compose down
   ```

---

## Deploy Production Cổ điển (Sử dụng PM2 và Nginx)

Trên môi trường Production, không nên dùng `npm run dev` hay `uvicorn --reload`. Hãy sử dụng **PM2** để chạy ngầm và **Nginx** để route.

1. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```
2. **Chạy bằng PM2:**
   ```bash
   npm install -g pm2
   
   # Chạy Next.js
   pm2 start npm --name "frontend" -- start
   
   # Chạy FastAPI
   cd ../backend
   pm2 start "uvicorn main:app --host 127.0.0.1 --port 8000" --name "backend"
   
   # Lưu tiến trình PM2 khởi động cùng máy
   pm2 save
   pm2 startup
   ```
3. **Cấu hình Nginx (Tùy chọn):**
   Bạn cấu hình Nginx để trỏ tên miền `gialai-forest-risk.com` về `localhost:3000`, và `/api/*` trỏ về `localhost:8000`.
