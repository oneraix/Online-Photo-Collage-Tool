# Online_Photo_Collage_Tool
# 📸 Online Photo Collage Tool

## 📅 Mô tả dự án

Dự án tạo một công cụ trực tuyến cho phép người dùng tải lên nhiều hình ảnh và tự động tạo ra một tấm collage (hình ghép). Sử dụng:

* **Backend**: Flask + Celery + S3
* **Frontend**: React + Vite

---

## ✨ Tính năng

* Tải lên nhiều hình ảnh
* Tự động tạo collage
* Lưu trữ trên AWS S3
* Tự động dọn file tạm (sau 1 ngày)

---

## ⚙️ Cài đặt khi clone về

### 1. Clone project

```bash
git clone https://github.com/<ten-user>/<ten-repo>.git
cd Online-Photo-Collage-Tool
```

### 2. Cài backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux
pip install -r requirements.txt
```

Tạo file `.env` trong thư mục `backend/`:

```env
FLASK_ENV=development
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=your-bucket-name
```

### 3. Cài frontend

```bash
cd ../frontend
npm install
```

### 4. Chạy backend

```bash
cd ../backend
venv\Scripts\activate
flask run
```

### 5. Chạy Celery worker

Mở terminal mới:

```bash
cd backend
venv\Scripts\activate
celery -A celery_worker.celery worker --loglevel=info
```

### 6. Chạy frontend

```bash
cd frontend
npm run dev
```

---

## 📁 Cấu trúc thư mục

```
Online-Photo-Collage-Tool/
|
|— backend/
|   |— app.py
|   |— celery_worker.py
|   |— tasks.py
|   |— config.py
|   |— .env
|   |— routes/
|   |— static/
|   |— temp/
|   — utils/
|
|— frontend/
|   |— node_modules/
|   |— public/
|   |— src/
|   |— package.json
|   — vite.config.js
|
|— README.md
|— .gitignore
```

---

## 📊 Yêu cầu

* Python >= 3.9
* Node.js >= 16
* Tài khoản AWS + S3 bucket

---

## 🔍 Gợi ý .gitignore

```gitignore
# Python
__pycache__/
*.pyc
venv/
.env

# Tạm và ảnh sinh ra
backend/temp/
backend/static/collages/
*.jpg
*.png

# Node.js
frontend/node_modules/
frontend/dist/
```

---

## ✉️ Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, vui lòng tạo issue hoặc pull request trên GitHub. Chúc bạn cài đặt thành công! ✨
