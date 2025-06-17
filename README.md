
# 📸 Online Photo Collage Tool

## 🗕️ Mô tả dự án

**Online Photo Collage Tool** là một ứng dụng web cho phép người dùng tải lên nhiều hình ảnh và tự động tạo ra một tấm **collage (hình ghép)**. Dự án sử dụng:

- 🔧 **Backend**: Flask + Celery + AWS S3  
- 💻 **Frontend**: React + Vite  
- 🐳 **Triển khai**: Docker + Docker Compose  
- ⚙️ **Queue**: Redis (cho Celery)

---

## ✨ Tính năng chính

- ✅ Tải lên nhiều hình ảnh  
- 🧠 Tự động ghép ảnh thành collage  
- ☁️ Lưu trữ kết quả trên AWS S3  
- 🧹 Tự động dọn file tạm sau 1 ngày (qua Celery)  
- 🖼️ Giao diện đơn giản, dễ sử dụng

---

## 🚀 Truy cập sau khi deploy

- 🌐 **Frontend**: [http://3.104.223.65:5173](http://3.104.223.65:5173)  
- 🔗 **Backend API**: [http://3.104.223.65:5000](http://3.104.223.65:5000)

> 📦 Sau khi deploy trên server, thay `localhost` bằng địa chỉ IP hoặc domain của bạn.

---

## ⚙️ Cài đặt & chạy dự án bằng Docker

### 1. Clone project

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd Online-Photo-Collage-Tool
```

### 2. Tạo file `.env` trong thư mục `backend/`

```env
FLASK_ENV=development
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
S3_BUCKET=your-bucket-name
```

### 3. Khởi động toàn bộ hệ thống

```bash
docker-compose up --build
```

Docker sẽ khởi chạy:

- Redis server  
- Flask backend  
- Celery worker  
- React frontend

---

## 🐳 Cấu trúc Docker Compose (Tóm tắt)

```yaml
services:
  redis: Redis queue
  backend: Flask API + upload xử lý ảnh
  celery: Worker xử lý ghép ảnh
  frontend: React + Vite hiển thị giao diện người dùng
```

Xem chi tiết cấu hình trong file `docker-compose.yml`.

---

## 📁 Cấu trúc thư mục dự án

```
Online-Photo-Collage-Tool/
│
├── backend/
│   ├── app.py                # Main Flask app
│   ├── celery_worker.py      # Celery worker config
│   ├── tasks.py              # Xử lý ghép ảnh
│   ├── config.py             # Cấu hình môi trường
│   ├── routes/               # API routes
│   ├── static/               # Static files (nếu có)
│   ├── temp/                 # Thư mục ảnh tạm (upload + output)
│   ├── utils/                # Hàm xử lý phụ trợ
│   └── .env                  # Biến môi trường (không commit)
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 📊 Yêu cầu hệ thống

- Python >= 3.9  
- Node.js >= 16  
- Docker & Docker Compose  
- Tài khoản AWS + S3 Bucket

---

## ✉️ Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc ý tưởng đóng góp, vui lòng tạo issue hoặc gửi pull request trên GitHub.  
Chúc bạn cài đặt thành công và sử dụng vui vẻ! ✨
