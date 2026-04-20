# 📚 API Reference - ClassicModels REST API

Base URL: `http://localhost:8000/api`

## Table of Contents
- [Customers API](#customers-api)
- [Orders API](#orders-api)
- [Products API](#products-api)
- [Payments API](#payments-api)
- [Query Parameters](#query-parameters)
- [Response Format](#response-format)

---

## Customers API

### Get All Customers
**GET** `/customers/`
- **Description**: Retrieve all customers with pagination
- **Params**:
  - `page` (int): Page number (default: 1)
  - `page_size` (int): Items per page (default: 50, max: 1000)

**Example:**
```
GET /customers/?page=1&page_size=20
```

**Response:**
```json
{
  "count": 122,
  "next": "http://localhost:8000/api/customers/?page=2",
  "previous": null,
  "results": [
    {
      "customer_number": 103,
      "customer_name": "Atelier graphique",
      "contact_first_name": "Carine",
      "contact_last_name": "Schmitt",
      "phone": "40.32.2555",
      "city": "Nantes",
      "country": "France",
      "credit_limit": "21000.00"
    }
  ]
}
```

### Search Customers
**GET** `/customers/search/`
- **Description**: Advanced customer search with filters
- **Query Params**:
  - `customer_name` (str): Customer name (contains query)
  - `country` (str): Country (contains query)
  - `city` (str): City (contains query)
  - `min_credit` (decimal): Minimum credit limit
  - `has_orders` (bool): Filter customers with/without orders

**Examples:**
```
# Find customers in USA
GET /customers/search/?country=USA

# Find customers from Paris with min credit 50000
GET /customers/search/?city=Paris&min_credit=50000

# Find customers with orders
GET /customers/search/?has_orders=true
```

### Customer Statistics
**GET** `/customers/statistics/`
- **Description**: Get customer spending statistics
- **Return**: List of customers with total orders, spending, and avg order value

**Response:**
```json
[
  {
    "customer__customer_name": "Bavarian Collectables Imports, Co.",
    "customer__customer_number": 415,
    "total_orders": 5,
    "total_spent": "77000.00",
    "average_order": "15400.00"
  }
]
```

### Pivot Table: Customers by Country
**GET** `/customers/pivot_by_country/`
- **Description**: Pivot table aggregating customers by country
- **Return**: Country-wise customer count, credit limit, and orders

**Response:**
```json
[
  {
    "country": "USA",
    "total_customers": 36,
    "total_credit_limit": "3286500.00",
    "total_orders": 98
  },
  {
    "country": "France",
    "total_customers": 12,
    "total_credit_limit": "1194600.00",
    "total_orders": 31
  }
]
```

---

## Orders API

### Get All Orders
**GET** `/orders/`
- **Description**: Retrieve all orders with pagination
- **Params**:
  - `page` (int): Page number
  - `page_size` (int): Items per page

### Search Orders
**GET** `/orders/search/`
- **Description**: Advanced order search with filters
- **Query Params**:
  - `customer_id` (int): Customer number
  - `status` (str): Order status (Shipped, In Process, Cancelled, Disputed, Resolved, On Hold)
  - `from_date` (date): Start date (YYYY-MM-DD)
  - `to_date` (date): End date (YYYY-MM-DD)

**Examples:**
```
# Get all Shipped orders
GET /orders/search/?status=Shipped

# Orders from specific date range
GET /orders/search/?from_date=2004-01-01&to_date=2004-12-31

# Orders from specific customer
GET /orders/search/?customer_id=103

# Cancelled orders
GET /orders/search/?status=Cancelled
```

### Order Statistics by Date
**GET** `/orders/statistics_by_date/`
- **Description**: Daily order statistics
- **Return**: Date, total orders, total amount, average amount

**Response:**
```json
[
  {
    "date": "2005-05-29",
    "total_orders": 2,
    "total_amount": "28500.00",
    "average_amount": "14250.00"
  }
]
```

### Order Statistics by Customer
**GET** `/orders/statistics_by_customer/`
- **Description**: Customer-wise order statistics
- **Return**: Customer name, total orders, total amount

### Order Statistics by Status
**GET** `/orders/statistics_by_status/`
- **Description**: Status-wise order statistics
- **Return**: Status, count, total amount

**Response:**
```json
[
  {
    "status": "Shipped",
    "count": 302,
    "total_amount": "2865659.04"
  },
  {
    "status": "In Process",
    "count": 2,
    "total_amount": "9650.05"
  }
]
```

### Pivot Table: Orders by Month
**GET** `/orders/pivot_by_month/`
- **Description**: Pivot table showing orders by month and status
- **Return**: Month as index, statuses as columns, amounts as values

**Response:**
```json
{
  "2003-01": {
    "Shipped": 15000.50,
    "Cancelled": 2000.00
  },
  "2003-02": {
    "Shipped": 18000.00,
    "In Process": 5000.00
  }
}
```

---

## Products API

### Get All Products
**GET** `/products/`
- **Description**: Retrieve all products
- **Params**:
  - `page` (int): Page number
  - `search` (str): Search by product name or code
  - `ordering` (str): Sort by buy_price, msrp, quantity_in_stock

**Examples:**
```
# Search by name
GET /products/?search=Ferrari

# Sort by price
GET /products/?ordering=msrp
```

### Get Products by Line
**GET** `/products/by_line/?line_code=Classic%20Cars`
- **Description**: Get products in specific product line
- **Params**:
  - `line_code` (str): Product line code

**Product Lines:**
- Classic Cars
- Motorcycles
- Planes
- Ships
- Trains
- Trucks and Buses
- Vintage Cars

### Product Statistics
**GET** `/products/statistics/`
- **Description**: Product sales and revenue statistics
- **Return**: Product name, product line, total quantity, total revenue, orders count

**Response:**
```json
[
  {
    "product_name": "1992 Ferrari 360 Spider red",
    "product_line": "Classic Cars",
    "total_quantity": 8347,
    "total_revenue": "1283947.58",
    "orders_count": 25
  }
]
```

---

## Payments API

### Get All Payments
**GET** `/payments/`
- **Description**: Retrieve all payments
- **Params**:
  - `page` (int): Page number

### Payment Statistics
**GET** `/payments/statistics/`
- **Description**: Payment aggregated statistics
- **Return**: Total payments, total amount, average payment

**Response:**
```json
{
  "total_payments": 273,
  "total_amount": 8826064.23,
  "average_payment": 32313.21
}
```

### Get Payments by Customer
**GET** `/payments/by_customer/?customer_id=103`
- **Description**: Get all payments from specific customer
- **Params**:
  - `customer_id` (int): Customer number

---

## Query Parameters

### Pagination
All list endpoints support pagination:
- `page`: Page number (starts from 1)
- `page_size`: Items per page (default 50, max 1000)

### Filtering & Search
- Use `?search=keyword` for text search
- Use `?field=value` for exact match filters
- Combine with `&` for multiple filters

### Sorting/Ordering
Use `?ordering=field_name` where:
- Positive: `?ordering=name` (ascending)
- Negative: `?ordering=-date` (descending)

### Date Format
All dates use ISO format: `YYYY-MM-DD`

---

## Response Format

### Success Response (200 OK)
```json
{
  "count": 100,
  "next": "http://...",
  "previous": null,
  "results": [...]
}
```

Or for single objects:
```json
{
  "id": 1,
  "name": "...",
  ...
}
```

### Error Response (400, 404, 500)
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Common Use Cases

### Get All USA Customers
```
GET /customers/search/?country=USA
```

### Get Orders from Last 30 Days
```bash
# Calculate date 30 days ago
GET /orders/search/?from_date=2024-03-20&to_date=2024-04-20
```

### Get Top Spending Customers
```
GET /customers/statistics/
# Results already sorted by total_spent (descending)
# Take first 10
```

### Get Revenue by Product Line
```bash
# Get all products with statistics
GET /products/statistics/
# Group by product_line in frontend
```

### Get Order Status Distribution
```
GET /orders/statistics_by_status/
# Use for charts
```

---

## Using with cURL

```bash
# Get customers
curl http://localhost:8000/api/customers/

# Search for customers in USA
curl "http://localhost:8000/api/customers/search/?country=USA"

# Get customer statistics
curl http://localhost:8000/api/customers/statistics/

# Get orders statistics
curl http://localhost:8000/api/orders/statistics_by_status/
```

---

## Using with Python Requests

```python
import requests

BASE_URL = "http://localhost:8000/api"

# Get customers
response = requests.get(f"{BASE_URL}/customers/")
customers = response.json()

# Search customers
params = {"country": "USA"}
response = requests.get(f"{BASE_URL}/customers/search/", params=params)

# Get statistics
response = requests.get(f"{BASE_URL}/customers/statistics/")
stats = response.json()
```

---

**Last Updated**: April 2026  
**Version**: 1.0.0
