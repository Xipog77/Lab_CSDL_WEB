from django.db import models

# Create your models here.

class ProductLine(models.Model):
    product_line = models.CharField(max_length=50, primary_key=True)
    text_description = models.CharField(max_length=4000, null=True, blank=True)
    html_description = models.TextField(null=True, blank=True)
    image = models.BinaryField(null=True, blank=True)

    class Meta:
        db_table = 'productlines'
        verbose_name = 'Product Line'
        verbose_name_plural = 'Product Lines'

    def __str__(self):
        return self.product_line


class Product(models.Model):
    product_code = models.CharField(max_length=15, primary_key=True)
    product_name = models.CharField(max_length=70)
    product_line = models.ForeignKey(ProductLine, on_delete=models.CASCADE, db_column='productLine')
    product_scale = models.CharField(max_length=10)
    product_vendor = models.CharField(max_length=50)
    product_description = models.TextField()
    quantity_in_stock = models.SmallIntegerField()
    buy_price = models.DecimalField(max_digits=10, decimal_places=2)
    msrp = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'products'
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.product_name


class Office(models.Model):
    office_code = models.CharField(max_length=10, primary_key=True)
    city = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    address_line1 = models.CharField(max_length=50)
    address_line2 = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=15)
    territory = models.CharField(max_length=10)

    class Meta:
        db_table = 'offices'
        verbose_name = 'Office'
        verbose_name_plural = 'Offices'

    def __str__(self):
        return f"{self.office_code} - {self.city}"


class Employee(models.Model):
    employee_number = models.IntegerField(primary_key=True)
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    extension = models.CharField(max_length=10)
    email = models.CharField(max_length=100)
    office_code = models.ForeignKey(Office, on_delete=models.CASCADE, db_column='officeCode')
    reports_to = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, db_column='reportsTo')
    job_title = models.CharField(max_length=50)

    class Meta:
        db_table = 'employees'
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Customer(models.Model):
    customer_number = models.IntegerField(primary_key=True)
    customer_name = models.CharField(max_length=50)
    contact_last_name = models.CharField(max_length=50)
    contact_first_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    address_line1 = models.CharField(max_length=50)
    address_line2 = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50, null=True, blank=True)
    postal_code = models.CharField(max_length=15, null=True, blank=True)
    country = models.CharField(max_length=50)
    sales_rep_employee_number = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, blank=True, db_column='salesRepEmployeeNumber')
    credit_limit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = 'customers'
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def __str__(self):
        return self.customer_name


class Payment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, db_column='customerNumber')
    check_number = models.CharField(max_length=50)
    payment_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'payments'
        unique_together = ('customer', 'check_number')
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'

    def __str__(self):
        return f"Payment {self.check_number}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('Shipped', 'Shipped'),
        ('In Process', 'In Process'),
        ('Cancelled', 'Cancelled'),
        ('Resolved', 'Resolved'),
        ('Disputed', 'Disputed'),
        ('On Hold', 'On Hold'),
    ]
    
    order_number = models.IntegerField(primary_key=True)
    order_date = models.DateField()
    required_date = models.DateField()
    shipped_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES)
    comments = models.TextField(null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, db_column='customerNumber')

    class Meta:
        db_table = 'orders'
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return f"Order {self.order_number}"


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, db_column='orderNumber')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, db_column='productCode')
    quantity_ordered = models.IntegerField()
    price_each = models.DecimalField(max_digits=10, decimal_places=2)
    order_line_number = models.SmallIntegerField()

    class Meta:
        db_table = 'orderdetails'
        unique_together = ('order', 'product')
        verbose_name = 'Order Detail'
        verbose_name_plural = 'Order Details'

    def __str__(self):
        return f"Order {self.order.order_number} - {self.product.product_code}"
