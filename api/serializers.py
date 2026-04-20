from rest_framework import serializers
from .models import (
    Customer, Order, OrderDetail, Product, Payment, 
    ProductLine, Office, Employee
)

class ProductLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductLine
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class OrderDetailSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.product_name', read_only=True)
    class Meta:
        model = OrderDetail
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.customer_name', read_only=True)
    order_details = OrderDetailSerializer(source='orderdetail_set', many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'


class OrderStatisticsSerializer(serializers.Serializer):
    """Serializer for order statistics"""
    date = serializers.DateField()
    total_orders = serializers.IntegerField()
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    average_amount = serializers.DecimalField(max_digits=15, decimal_places=2)


class CustomerStatisticsSerializer(serializers.Serializer):
    """Serializer for customer statistics"""
    customer_name = serializers.CharField()
    total_orders = serializers.IntegerField()
    total_spent = serializers.DecimalField(max_digits=15, decimal_places=2)
    average_order = serializers.DecimalField(max_digits=15, decimal_places=2)


class ProductStatisticsSerializer(serializers.Serializer):
    """Serializer for product statistics"""
    product_name = serializers.CharField()
    product_line = serializers.CharField()
    total_quantity = serializers.IntegerField()
    total_revenue = serializers.DecimalField(max_digits=15, decimal_places=2)
    orders_count = serializers.IntegerField()
