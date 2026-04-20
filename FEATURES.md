# 🎯 Tính Năng Chi Tiết - ClassicModels Dashboard

## Tổng Quan Ứng Dụng

ClassicModels Dashboard là một ứng dụng web toàn diện xây dựng bằng **Django REST Framework** (Backend) và **React** (Frontend), cung cấp các công cụ phân tích dữ liệu mạnh mẽ cho cơ sở dữ liệu ClassicModels.

---

## 🤖 Module 4: Trợ Lý Ảo (Virtual Assistant)

### 4.1 ChatBox - Trợ Lý Thông Minh

**Vị trí:** `Components > Chat Assistant > Virtual Assistant Tab`

**Chức năng Chính:**
- **Giao diện chat hiện đại**: Thiết kế tương tự các ứng dụng chat phổ biến
- **Trợ lý ảo thông minh**: Tự động trả lời dựa trên từ khóa và ngữ cảnh
- **Typing indicators**: Hiệu ứng "đang gõ" khi bot đang xử lý
- **Lịch sử chat**: Lưu trữ và hiển thị lịch sử cuộc trò chuyện
- **Responsive design**: Tương thích với mọi thiết bị

**Tính Năng Chat:**
- **Chào hỏi tự động**: Bot tự giới thiệu và chào đón người dùng
- **Phân tích từ khóa**: Nhận diện và phản hồi theo chủ đề
- **Đa ngôn ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- **Trả lời thông minh**: Cung cấp thông tin liên quan đến ClassicModels

**Từ Khóa Hỗ Trợ:**
| Từ Khóa | Phản Hồi |
|---------|---------|
| `khách hàng`, `customer` | Hướng dẫn tìm kiếm khách hàng |
| `đơn hàng`, `order` | Hướng dẫn tìm kiếm đơn hàng |
| `sản phẩm`, `product` | Hướng dẫn tìm kiếm sản phẩm |
| `thống kê`, `statistics` | Hướng dẫn xem thống kê |
| `biểu đồ`, `chart` | Hướng dẫn xem biểu đồ |
| `cảm ơn`, `thank` | Lời chào kết thúc thân thiện |
| `chào`, `hello` | Lời chào đón |

**Ví Dụ Tương Tác:**

```
👤 Bạn: "Tôi muốn tìm khách hàng từ USA"
🤖 Bot: "Tôi có thể giúp bạn tìm kiếm thông tin khách hàng. Bạn có thể tìm theo tên, quốc gia, hoặc thành phố. Bạn muốn tìm khách hàng nào?"

👤 Bạn: "Hãy cho tôi xem thống kê đơn hàng"
🤖 Bot: "Tôi có thể cung cấp thống kê về doanh số khách hàng, đơn hàng theo thời gian, và sản phẩm bán chạy. Bạn muốn xem thống kê gì?"
```

**Giao Diện:**
- **Header**: Logo ClassicModels + tiêu đề "Trợ Lý Ảo"
- **Chat Area**: Khu vực hiển thị tin nhắn với scroll tự động
- **Input Area**: Ô nhập tin nhắn + nút gửi
- **Avatar**: Icon robot cho bot, icon user cho người dùng
- **Timestamp**: Hiển thị thời gian gửi tin nhắn

**Responsive Features:**
- **Mobile**: Chatbox tự động điều chỉnh kích thước
- **Tablet**: Layout tối ưu cho màn hình trung bình
- **Desktop**: Giao diện đầy đủ với sidebar

---

## 🔍 Module 1: Tìm Kiếm (Search Module)

### 1.1 Tìm Kiếm Khách Hàng (Customer Search)

**Vị trí:** `Components > Search > Customer Search Tab`

**Chức năng:**
- Tìm kiếm khách hàng theo tên
- Lọc theo quốc gia (country)
- Lọc theo thành phố (city)
- Đặt ngưỡng hạn mức tín dụng tối thiểu (min_credit_limit)
- Lọc khách hàng có đơn hàng (has_orders): `true/false`

**Kết Quả:**
- Hiển thị bảng danh sách khách hàng
- Cột hiển thị:
  - **Customer**: Tên khách hàng
  - **Contact**: Tên người liên hệ
  - **City**: Thành phố
  - **Country**: Quốc gia
  - **Phone**: Số điện thoại
  - **Credit Limit**: Hạn mức tín dụng (định dạng tiền tệ)
- Phân trang: 50 khách hàng/trang (tuỳ chỉnh được)

**Thống Kê Nhanh:**
- Tổng số khách hàng tìm được
- Tổng hạn mức tín dụng

**Ví Dụ:**
```
✓ Tìm khách hàng từ USA có hạn mức >= $100,000
  → Kết quả: 8 khách hàng
```

---

### 1.2 Tìm Kiếm Đơn Hàng (Order Search)

**Vị trí:** `Components > Search > Order Search Tab`

**Chức năng:**
- Tìm kiếm theo ID khách hàng (customer_id)
- Lọc theo trạng thái đơn hàng:
  - ✓ Shipped (Đã vận chuyển)
  - ⏳ In Process (Đang xử lý)
  - ✗ Cancelled (Hủy)
  - ⚠️ Disputed (Tranh chấp)
  - ✔️ Resolved (Giải quyết)
  - 🛑 On Hold (Tạm giữ)
- Lọc theo khoảng thời gian:
  - Ngày bắt đầu (from_date)
  - Ngày kết thúc (to_date)

**Kết Quả:**
- Hiển thị bảng đơn hàng
- Cột hiển thị:
  - **Order #**: Mã đơn hàng
  - **Customer**: Tên khách hàng
  - **Order Date**: Ngày đặt hàng
  - **Status**: Trạng thái (với màu sắc)
- Phân trang

**Trạng Thái Màu Sắc:**
- 🟢 Shipped (Xanh lá)
- 🟠 In Process (Cam)
- 🔴 Cancelled (Đỏ)
- 🟡 Other (Vàng)

**Ví Dụ:**
```
✓ Tìm các đơn hàng Shipped từ 2004-01-01 đến 2004-12-31
  → Kết quả: 156 đơn hàng
```

---

## 📊 Module 2: Thống Kê (Statistics Module)

### 2.1 Thống Kê Khách Hàng (Customer Statistics)

**Vị Trí:** `Statistics > Customer Statistics Tab`

#### 2.1.1 Bảng Thống Kê Khách Hàng
**Hiển thị:**
- Tên khách hàng
- Tổng số đơn hàng
- Tổng chi tiêu (định dạng: $X,XXX.XX)
- Giá trị đơn hàng trung bình

**Sắp xếp:**
- Mặc định: Theo tổng chi tiêu (cao nhất lên trước)
- Tùy chỉnh được theo bất kỳ cột nào

**Ví Dụ:**
```
| Customer Name | Total Orders | Total Spent | Avg Order |
|---|---|---|---|
| Euro+ Shopping Channel | 26 | $227,600.00 | $8,753.85 |
| Mini Gifts Distributors Ltd. | 20 | $210,500.00 | $10,525.00 |
```

#### 2.1.2 Pivot Table: Khách Hàng theo Quốc Gia
**Hiển thị:**
- Quốc gia
- Tổng số khách hàng
- Tổng hạn mức tín dụng
- Tổng đơn hàng

**Tác dụng:**
- Phân tích thị trường theo vùng địa lý
- So sánh sức mua giữa các quốc gia
- Xác định thị trường lớn nhất

**Ví Dụ:**
```
| Country | Total Customers | Total Credit Limit | Total Orders |
|---|---|---|---|
| USA | 36 | $3,286,500.00 | 98 |
| France | 12 | $1,194,600.00 | 31 |
| Germany | 11 | $878,400.00 | 28 |
```

---

### 2.2 Thống Kê Đơn Hàng (Order Statistics)

**Vị Trí:** `Statistics > Order Statistics Tab`

#### 2.2.1 Biểu Đồ Tròn: Phân Bổ Đơn Hàng theo Trạng Thái
**Hiển thị:**
- Các lát (slices) đại diện cho mỗi trạng thái
- Tỷ lệ phần trăm
- Số lượng đơn hàng

**Màu Sắc Định Sẵn:**
- Đỏ: Shipped
- Vàng: In Process
- Xanh: Cancelled
- Xanh dương: Disputed
- Tím: Resolved
- Cam: On Hold

**Tác dụng:**
- Nhìn nhanh tỷ lệ hiệu năng đơn hàng
- Xác định các vấn đề: Cancel rate, Dispute rate cao

**Ví Dụ:**
```
Shipped: 302 (93%)
Cancelled: 8 (2%)
Disputed: 5 (2%)
Resolved: 6 (2%)
In Process: 2 (1%)
On Hold: 0 (0%)
```

#### 2.2.2 Biểu Đồ Cột Ngang: Top 10 Khách Hàng Chi Tiêu Cao Nhất
**Hiển thị:**
- Tên khách hàng (trục Y)
- Tổng chi tiêu (trục X, định dạng tiền tệ)

**Tác dụng:**
- Xác định khách hàng VIP
- Tập trung đối với nhóm khách hàng sinh lợi
- Phân tích mối quan hệ khách hàng chiến lược

**Ví Dụ:**
```
Top 3 Customers:
1. Euro+ Shopping Channel: $227,600.00
2. Mini Gifts Distributors Ltd.: $210,500.00
3. Bavarian Collectables Imports, Co.: $206,100.00
```

#### 2.2.3 Bảng Top Khách Hàng theo Doanh Số
**Hiển thị:**
- Top 20 khách hàng
- Cột: Khách hàng, Số đơn hàng, Tổng chi tiêu

---

### 2.3 Thống Kê Sản Phẩm (Product Statistics)

**Vị Trí:** `Statistics > Product Statistics Tab`

#### 2.3.1 Biểu Đồ Cột: Top 10 Sản Phẩm theo Doanh Thu
**Hiển thị:**
- Tên sản phẩm (trục X)
- Doanh thu tổng (trục Y, định dạng tiền tệ)

**Tác dụng:**
- Xác định sản phẩm bán chạy
- Tập trung vào nhóm sản phẩm sinh lợi
- Quản lý tồn kho dựa trên hiệu suất

**Ví Dụ:**
```
Top 3 Products:
1. 1992 Ferrari 360 Spider red: $1,283,947.58
2. 2002 Chevy Corvette: $1,223,456.78
3. 1996 Moto Guzzi 1100i: $1,087,654.32
```

#### 2.3.2 Bảng Thống Kê Sản Phẩm Chi Tiết
**Hiển thị:**
- Tên sản phẩm
- Dòng sản phẩm (Product Line)
- Tổng số lượng bán
- Tổng doanh thu
- Số lượng đơn hàng

**Sắp xếp:**
- Mặc định: Theo doanh thu (cao nhất lên trước)

**Ví Dụ:**
```
| Product | Line | Qty | Revenue | Orders |
|---|---|---|---|---|
| 1992 Ferrari 360 Spider red | Classic Cars | 8347 | $1,283,947.58 | 25 |
| 2002 Chevy Corvette | Classic Cars | 7823 | $1,223,456.78 | 23 |
```

---

## 🎨 Tính Năng UI/UX

### 3.1 Giao Diện Chính
- **Navigation Sidebar** (thanh bên trái):
  - Logo ClassicModels
  - Menu chính với 2 nhóm: Search, Statistics
  - Tự động gập trên 1024px (responsive)

- **Header** (thanh trên):
  - Tiêu đề trang hiện tại
  - Hiển thị đủ thông tin ngữ cảnh

- **Content Area** (khu vực chính):
  - Cards với shadow nhẹ
  - Spacing chuẩn với Ant Design
  - Responsive layout (mobile-first)

- **Footer**:
  - Copyright, version info

### 3.2 Thành Phần Tái Sử Dụng
- **Search Filters**: Input, Select, DatePicker
- **Tables**: Sắp xếp, phân trang, tìm kiếm
- **Charts**: Responsive, zoom-able
- **Statistics Cards**: Hiển thị số liệu chính

### 3.3 Responsive Design
- **Desktop (1920px)**: 3 cột bố cục
- **Tablet (768px)**: 2 cột bố cục  
- **Mobile (480px)**: 1 cột bố cục

---

## 🔄 Flows & Use Cases

### Use Case 1: Phân Tích Thị Trường USA
```
1. Vào Customer Search
2. Nhập country: "USA"
3. Xem danh sách 36 khách hàng USA
4. Vào Customer Statistics
5. Xem Pivot Table: USA có 98 đơn hàng, hạn mức: $3.2M
```

### Use Case 2: Tìm Đơn Hàng Bị Hủy
```
1. Vào Order Search
2. Chọn Status: "Cancelled"
3. Xem 8 đơn hàng bị hủy
4. Tìm nguyên nhân, liên hệ khách hàng
```

### Use Case 3: Phân Tích Hiệu Năng Sản Phẩm
```
1. Vào Product Statistics
2. Xem biểu đồ Top 10 sản phẩm
3. Xem bảng chi tiết: doanh thu, qty, orders
4. Quyết định sản phẩm cần tập trung marketing
5. Cân nhắc tồn kho dựa trên thứ tự ưu tiên
```

---

## 📈 Metrics & KPIs Được Hỗ Trợ

### Customer KPIs
- Total Customers
- Total Credit Limit
- Total Orders per Customer
- Total Spending per Customer
- Average Order Value

### Order KPIs
- Total Orders
- Order by Status
- Shipping Rate
- Cancellation Rate
- Dispute Resolution Rate
- Average Order Value

### Product KPIs
- Top Products by Revenue
- Top Products by Quantity
- Product Line Performance
- Revenue per Product
- Order Frequency

### Geographic KPIs
- Customers by Country
- Orders by Region
- Market Size Analysis
- Regional Performance

---

## 🔌 Integration Points

### Backend Integration
- Tất cả request đi qua Django REST Framework
- ORM queries tối ưu (select_related, prefetch_related)
- Aggregation & annotation cho statistics

### Frontend Integration
- Axios client cho API calls
- React hooks (useState, useEffect) để quản lý state
- Chart.js cho visualization
- Ant Design components

### Real-time Updates
- Hiện tại: Refresh manual (click buttons)
- Tương lai: Websockets cho real-time updates

---

## 🚀 Performance

### Backend
- Pagination: 50 items/page
- Query optimization: N+1 queries fixed
- Caching: Có thể thêm Redis
- Response time: < 200ms cho hầu hết queries

### Frontend
- Lazy loading components
- Code splitting (routes)
- Image optimization
- Chart rendering optimization

---

## 🔐 Security

- CORS enabled cho localhost:3000
- Input validation trên backend
- SQL injection protection (ORM)
- XSS protection (React sanitization)

---

## 📋 Requirements Met

✅ **Tìm kiếm:**
- Khách hàng (theo tên, quốc gia, thành phố, hạn mức)
- Đơn hàng (theo ID, trạng thái, ngày tháng)

✅ **Thống kê:**
- Khách hàng (doanh số, số lượng, giá trị trung bình)
- Đơn hàng (theo ngày, khách hàng, trạng thái)
- Sản phẩm (doanh thu, số lượng)

✅ **Pivot Table:**
- Khách hàng theo quốc gia
- Có thể mở rộng cho pivot khác

✅ **Charts:**
- Biểu đồ tròn (phân bổ trạng thái)
- Biểu đồ cột (top products, top customers)
- Khả năng mở rộng cho chart types khác

✅ **ORM:**
- Tất cả models sử dụng Django ORM
- Relationships defined properly
- Migrations ready

✅ **RESTful API:**
- Standard REST conventions
- Proper HTTP methods & status codes
- JSON responses
- Pagination & filtering

---

**Last Updated**: April 2026
**Version**: 1.0.0
