# 🚀 Hướng Dẫn Bắt Đầu Nhanh

Hướng dẫn setup và chạy ứng dụng ClassicModels Dashboard.

## Mục Lục
1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [Cài Đặt Cơ Sở Dữ Liệu](#cài-đặt-cơ-sở-dữ-liệu)
3. [Cài Đặt Backend](#cài-đặt-backend)
4. [Cài Đặt Frontend](#cài-đặt-frontend)
5. [Chạy Ứng Dụng](#chạy-ứng-dụng)
6. [Xử Lý Sự Cố](#xử-lý-sự-cố)

## Yêu Cầu Hệ Thống

### Windows / macOS / Linux
```
Python: 3.8+
Node.js: 14+
npm: 6+
MySQL: 5.7+
```

Kiểm tra các phiên bản đã cài:
```bash
python --version
node --version
npm --version
mysql --version
```

## Cài Đặt Cơ Sở Dữ Liệu

### Bước 1: Khởi Động MySQL

**Windows:**
```bash
# Start MySQL Service (Command Prompt as Admin)
net start MySQL80
```

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo service mysql start
```

### Bước 2: Đăng Nhập MySQL

```bash
mysql -u root -p
# Nhập password khi được yêu cầu (để trống nếu chưa đặt)
```

### Bước 3: Chạy SQL Script

```sql
-- Copy toàn bộ nội dung từ file mysqlsampledatabase.sql
-- Và chạy trong MySQL shell
SOURCE /path/to/mysqlsampledatabase.sql;

-- Hoặc từ dòng lệnh:
-- mysql -u root -p < mysqlsampledatabase.sql
```

Kiểm tra cơ sở dữ liệu:
```sql
SHOW DATABASES;  -- Nên thấy 'classicmodels'
USE classicmodels;
SHOW TABLES;  -- Nên thấy 8 tables
```

## Cài Đặt Backend

### Bước 1: Điều Hướng Đến Project

```bash
cd /path/to/Lab_CSDL_WEB
```

### Bước 2: Tạo Virtual Environment (Tùy Chọn Nhưng Khuyến Nghị)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Bước 3: Cài Đặt Dependencies

```bash
pip install -r requirements.txt
```

Dependencies bao gồm:
- Django 4.2
- Django REST Framework 3.14
- django-cors-headers 4.0
- mysql-connector-python 8.0.33
- pandas 2.0.3
- python-dotenv 1.0

### Bước 4: Kiểm Tra Cấu Hình Database

Mở file `settings.py` và kiểm tra:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'classicmodels',
        'USER': 'root',  # Thay bằng username MySQL của bạn
        'PASSWORD': '',   # Thay bằng password MySQL của bạn
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### Bước 5: Chạy Backend

```bash
python manage.py runserver 0.0.0.0:8000
```

Bạn sẽ thấy:
```
Starting development server at http://0.0.0.0:8000/
```

✅ Backend chạy thành công tại: `http://localhost:8000/api`

## Cài Đặt Frontend

### Bước 1: Mở Terminal Khác

Giữ terminal Backend chạy, mở terminal mới

### Bước 2: Điều Hướng Đến Project

```bash
cd /path/to/Lab_CSDL_WEB
```

### Bước 3: Cài Đặt Dependencies

```bash
npm install
```

Dependencies bao gồm:
- React 18
- Ant Design 5
- Chart.js 4.4
- react-chartjs-2 5.2
- Axios 1.6

### Bước 4: Chạy Frontend

```bash
npm start
```

Ứng dụng sẽ tự động mở tại: `http://localhost:3000`

✅ Frontend chạy thành công!

## Chạy Ứng Dụng

### Setup Hoàn Chỉnh

**Terminal 1 (Backend):**
```bash
cd /path/to/Lab_CSDL_WEB
source venv/bin/activate  # macOS/Linux
# hoặc
venv\Scripts\activate     # Windows

python manage.py runserver 0.0.0.0:8000
```

**Terminal 2 (Frontend):**
```bash
cd /path/to/Lab_CSDL_WEB
npm start
```

### Kiểm Tra Kết Nối

1. Mở trình duyệt: `http://localhost:3000`
2. Bạn sẽ thấy giao diện ClassicModels Dashboard
3. Nếu có lỗi, kiểm tra tab Console trong DevTools

## Xử Lý Sự Cố

### Lỗi: "Cannot connect to MySQL server"

**Giải pháp:**
```bash
# Kiểm tra MySQL service
sudo service mysql status

# Restart MySQL
sudo service mysql restart

# Kiểm tra MySQL đang nghe port 3306
netstat -an | grep 3306
```

### Lỗi: "Connection refused" từ Frontend

**Giải pháp:**
- Kiểm tra backend có đang chạy không
- Kiểm tra `settings.py` có `CORS_ALLOWED_ORIGINS` không

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Lỗi: "Module not found" khi chạy npm start

**Giải pháp:**
```bash
# Xóa node_modules
rm -rf node_modules

# Cài lại
npm install

# Chạy lại
npm start
```

### Lỗi: Python "No module named django"

**Giải pháp:**
```bash
# Kiểm tra virtual environment đã activate chưa
which python  # macOS/Linux - phải chỉ đến venv

# Nếu chưa, activate:
source venv/bin/activate

# Cài lại
pip install -r requirements.txt
```

### Lỗi: MySQL "Access denied for user 'root'@'localhost'"

**Giải pháp:**
```bash
# Đặt lại mật khẩu MySQL (Linux)
sudo mysql -u root

# Trong MySQL shell
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

Sau đó, cập nhật `settings.py`:
```python
'PASSWORD': 'new_password',
```

## API URLs Để Kiểm Tra

Mở trình duyệt hoặc Postman:

```
# Danh sách khách hàng
http://localhost:8000/api/customers/

# Tìm kiếm khách hàng từ USA
http://localhost:8000/api/customers/search/?country=USA

# Thống kê khách hàng
http://localhost:8000/api/customers/statistics/

# Danh sách đơn hàng
http://localhost:8000/api/orders/

# Thống kê sản phẩm
http://localhost:8000/api/products/statistics/
```

## Cấu Trúc Ứng Dụng

```
ClassicModels Dashboard
├── 🔍 Tìm Kiếm
│   ├── Customer Search (Tìm kiếm khách hàng)
│   └── Order Search (Tìm kiếm đơn hàng)
└── 📊 Thống Kê
    ├── Customer Statistics (Thống kê khách hàng & Pivot)
    ├── Order Statistics (Biểu đồ đơn hàng)
    └── Product Statistics (Biểu đồ sản phẩm)
```

## Các Tính Năng Chính

### 🔎 Tìm Kiếm Khách Hàng
- Lọc theo tên, quốc gia, thành phố
- Đặt ngưỡng hạn mức tín dụng
- Xem danh sách kết quả có phân trang

### 🔎 Tìm Kiếm Đơn Hàng
- Lọc theo ID khách hàng, trạng thái
- Chọn khoảng thời gian
- Xem chi tiết đơn hàng

### 📊 Thống Kê Khách Hàng
- Bảng thống kê: doanh số, chi tiêu, giá trị trung bình
- Pivot table khách hàng theo quốc gia
- Hiển thị hạn mức tín dụng tổng

### 📈 Biểu Đồ Đơn Hàng
- Biểu đồ tròn: phân bổ theo trạng thái
- Biểu đồ cột: Top 10 khách hàng chi tiêu
- Bảng top khách hàng

### 💰 Biểu Đồ Sản Phẩm
- Biểu đồ cột: Top 10 sản phẩm theo doanh thu
- Bảng thống kê sản phẩm
- Lượng bán và số lượng đơn hàng

## Tiếp Theo

- Đọc [README.md](./README.md) để hiểu chi tiết hơn
- Xem [API Endpoints](./README.md#api-endpoints)
- Tìm hiểu [Models & Database](./README.md#models-orm)

---

**Ghi chú:** 
- Nếu cần trợ giúp, kiểm tra tab Console/Network trong DevTools (F12)
- Nếu vẫn có vấn đề, kiểm tra terminal Django có error message không

🎉 Chúc bạn thành công!
