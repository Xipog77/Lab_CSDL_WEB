# ClassicModels Dashboard - Web Ứng dụng Phân Tích Dữ Liệu

Ứng dụng web toàn diện với các chức năng tìm kiếm và thống kê nâng cao cho cơ sở dữ liệu ClassicModels.

## Tính Năng

### 🔍 Tìm Kiếm Nâng Cao
- **Tìm kiếm khách hàng**: Lọc theo tên, quốc gia, thành phố, hạn mức tín dụng
- **Tìm kiếm đơn hàng**: Lọc theo khách hàng, trạng thái, khoảng thời gian

### 📊 Thống Kê & Pivot Table
- **Thống kê khách hàng**: Doanh số, số lượng đơn hàng, giá trị trung bình
- **Pivot table khách hàng**: Phân bổ theo quốc gia, hạn mức tín dụng
- **Thống kê đơn hàng**: Theo ngày tháng, khách hàng, trạng thái
- **Thống kê sản phẩm**: Doanh thu, số lượng bán

### 📈 Biểu Đồ & Trực Quan
- **Biểu đồ tròn**: Phân bổ đơn hàng theo trạng thái
- **Biểu đồ cột**: Top 10 khách hàng chi tiêu cao nhất
- **Biểu đồ doanh thu**: Sản phẩm bán chạy nhất

### 🤖 Trợ Lý Ảo (ChatBox)
- **Chatbot thông minh**: Hỗ trợ tìm kiếm và trả lời câu hỏi
- **Giao diện thân thiện**: UI chat hiện đại với typing indicators
- **Phản hồi nhanh**: Tự động trả lời dựa trên từ khóa
- **Đa ngôn ngữ**: Hỗ trợ tiếng Việt và tiếng Anh

## Công Nghệ

### Backend
- Django 4.2 - Framework web Python
- Django REST Framework - API RESTful
- MySQL - Cơ sở dữ liệu
- ORM Django - Tương tác với CSDL

### Frontend
- React 18 - Thư viện UI JavaScript
- Ant Design - Thư viện component
- Chart.js - Thư viện biểu đồ
- Axios - Client HTTP

## Hướng Dẫn Cài Đặt

### 🚀 Phương Pháp 1: Sử Dụng Docker (Khuyến Nghị)

**Yêu cầu**: Docker và Docker Compose đã được cài đặt

```bash
# 1. Clone hoặc di chuyển đến thư mục project
cd /path/to/Lab_CSDL_WEB

# 2. Chạy script Docker (tự động setup MySQL + Django)
./docker.sh start

# 3. Kiểm tra trạng thái services
./docker.sh status

# 4. Cài đặt frontend dependencies
npm install

# 5. Chạy React frontend
npm start
```

**Truy cập ứng dụng:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000/api`
- MySQL: `localhost:3306` (user: django_user, pass: django_password)

### 🔧 Phương Pháp 2: Cài Đặt Thủ Công

**Yêu cầu**: Python 3.8+, Node.js 14+, MySQL Server 5.7+

#### Bước 1: Chuẩn Bị Cơ Sở Dữ Liệu

**Khởi động MySQL:**
```bash
# Linux/Mac
sudo service mysql start
# hoặc
sudo systemctl start mysql

# Windows (nếu MySQL đã được cài đặt)
# Mở MySQL Command Line Client
```

**Tạo CSDL từ file SQL:**
```bash
mysql -u root -p < mysqlsampledatabase.sql
```

> **Ghi chú**: Nếu bạn không có mật khẩu cho root, bỏ qua `-p`:
> ```bash
> mysql -u root < mysqlsampledatabase.sql
> ```

#### Bước 2: Cài Đặt Backend

```bash
cd /path/to/Lab_CSDL_WEB

# Cài đặt Python dependencies
pip install -r requirements.txt

# Chạy server (Port: 8000)
python manage.py runserver 0.0.0.0:8000
```

Backend sẽ chạy tại: `http://localhost:8000/api`

#### Bước 3: Cài Đặt Frontend

**Mở terminal khác:**
```bash
cd /path/to/Lab_CSDL_WEB

# Cài đặt npm dependencies
npm install

# Chạy React dev server (Port: 3000)
npm start
```

Frontend sẽ mở tại: `http://localhost:3000`

## 🐳 Docker Setup

### Cấu Trúc Docker

```
ClassicModels Dashboard
├── docker-compose.yml      # Orchestration cho MySQL + Django
├── Dockerfile.backend      # Container cho Django backend
├── docker.sh              # Script quản lý Docker
├── .dockerignore          # Loại trừ files khỏi build
└── mysqlsampledatabase.sql # Database schema & data
```

### Lệnh Docker

```bash
# Khởi động tất cả services
./docker.sh start

# Dừng services
./docker.sh stop

# Khởi động lại
./docker.sh restart

# Xem logs
./docker.sh logs          # Tất cả logs
./docker.sh logs mysql    # Chỉ MySQL logs
./docker.sh logs backend  # Chỉ Django logs

# Kết nối shell
./docker.sh shell mysql   # MySQL shell
./docker.sh shell backend # Django container shell

# Kiểm tra trạng thái
./docker.sh status

# Dọn dẹp (xóa containers, volumes)
./docker.sh clean
```

### Cấu Hình Database

**Docker MySQL:**
- **Host**: localhost:3306
- **Database**: classicmodels
- **Username**: django_user
- **Password**: django_password
- **Root Password**: rootpassword

**Volume**: `mysql_data` - Persistent storage cho database

## API Endpoints

### Customers
- `GET /api/customers/` - Danh sách khách hàng
- `GET /api/customers/search/` - Tìm kiếm khách hàng
- `GET /api/customers/statistics/` - Thống kê khách hàng
- `GET /api/customers/pivot_by_country/` - Pivot table theo quốc gia

### Orders
- `GET /api/orders/` - Danh sách đơn hàng
- `GET /api/orders/search/` - Tìm kiếm đơn hàng
- `GET /api/orders/statistics_by_date/` - Thống kê theo ngày
- `GET /api/orders/statistics_by_customer/` - Thống kê theo khách hàng
- `GET /api/orders/statistics_by_status/` - Thống kê theo trạng thái

### Products
- `GET /api/products/` - Danh sách sản phẩm
- `GET /api/products/statistics/` - Thống kê sản phẩm

## Xử Lý Sự Cố

### Lỗi: MySQL Access Denied
**Nguyên nhân**: MySQL không chạy hoặc user credentials không đúng
**Giải pháp**:
```bash
# Khởi động MySQL
sudo service mysql start

# Hoặc trên Mac
brew services start mysql

# Kiểm tra MySQL đã chạy chưa
mysql -u root -p
# Nếu yêu cầu password mà bạn không có, thử:
mysql -u root
```

### Lỗi: PyMySQL Import Error
**Nguyên nhân**: Thiếu dependencies
**Giải pháp**:
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Lỗi: Database 'classicmodels' doesn't exist
**Nguyên nhân**: Chưa import SQL script
**Giải pháp**:
```bash
mysql -u root < mysqlsampledatabase.sql
# Hoặc
mysql -u root < /path/to/Lab_CSDL_WEB/mysqlsampledatabase.sql
```

### Lỗi: React Port 3000 Already in Use
**Nguyên nhân**: Port 3000 đang được sử dụng bởi ứng dụng khác
**Giải pháp**:
```bash
# Cách 1: Kill process đang sử dụng port 3000
lsof -ti:3000 | xargs kill -9

# Cách 2: Chạy React trên port khác
PORT=3001 npm start
```

### Lỗi: Django Port 8000 Already in Use
**Nguyên nhân**: Port 8000 đang được sử dụng
**Giải pháp**:
```bash
# Kill Django process
pkill -f "python manage.py runserver"

# Hoặc chạy trên port khác
python manage.py runserver 0.0.0.0:8001
```

## API Endpoints

### Customers
- `GET /api/customers/` - Danh sách khách hàng
- `GET /api/customers/search/` - Tìm kiếm khách hàng
- `GET /api/customers/statistics/` - Thống kê khách hàng
- `GET /api/customers/pivot_by_country/` - Pivot table theo quốc gia

### Orders
- `GET /api/orders/` - Danh sách đơn hàng
- `GET /api/orders/search/` - Tìm kiếm đơn hàng
- `GET /api/orders/statistics_by_date/` - Thống kê theo ngày
- `GET /api/orders/statistics_by_customer/` - Thống kê theo khách hàng
- `GET /api/orders/statistics_by_status/` - Thống kê theo trạng thái

### Products
- `GET /api/products/` - Danh sách sản phẩm
- `GET /api/products/statistics/` - Thống kê sản phẩm

## Cấu Trúc Dự Án

```
Lab_CSDL_WEB/
├── models.py                 # Django ORM Models
├── serializers.py            # DRF Serializers
├── views.py                  # Views xử lý logic
├── settings.py               # Cài đặt Django
├── api/urls.py              # URL routing
├── src/
│   ├── App.js               # Main component
│   ├── components/
│   │   ├── CustomerSearch.jsx
│   │   ├── OrderSearch.jsx
│   │   ├── CustomerStatistics.jsx
│   │   ├── OrderStatistics.jsx
│   │   └── ProductStatistics.jsx
│   └── services/api.js
├── public/index.html
└── package.json
```

---
**Phiên bản**: 1.0.0
│
└── frontend/
    ├── package.json
    └── src/
        ├── App.js
        └── api.js

Chuẩn bị CSDL: mysql -u root -p < mysqlsampledatabase.sql
Chạy backend: python manage.py runserver 0.0.0.0:8000
Chạy frontend: npm install && npm start
Truy cập: http://localhost:3000
