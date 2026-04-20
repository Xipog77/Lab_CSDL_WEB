from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Sum, Count, Avg, Q, F
from django.db.models.functions import TruncDate
from datetime import datetime, timedelta
import pandas as pd
from decimal import Decimal

from models import (
    Customer, Order, OrderDetail, Product, Payment, 
    ProductLine, Office, Employee
)
from serializers import (
    CustomerSerializer, OrderSerializer, OrderDetailSerializer,
    ProductSerializer, PaymentSerializer, ProductLineSerializer,
    OfficeSerializer, EmployeeSerializer,
    OrderStatisticsSerializer, CustomerStatisticsSerializer,
    ProductStatisticsSerializer
)


class StandardPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 1000


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['product_name', 'product_code', 'product_line']
    ordering_fields = ['buy_price', 'msrp', 'quantity_in_stock']
    
    @action(detail=False, methods=['get'])
    def by_line(self, request):
        """Get products grouped by product line"""
        line_code = request.query_params.get('line_code')
        if line_code:
            products = Product.objects.filter(product_line=line_code)
        else:
            products = Product.objects.all()
        
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Product statistics and analysis"""
        try:
            stats = OrderDetail.objects.values('product__product_name', 'product__product_line').annotate(
                total_quantity=Sum('quantity_ordered'),
                total_revenue=Sum(F('quantity_ordered') * F('price_each')),
                orders_count=Count('order', distinct=True)
            ).order_by('-total_revenue')
            
            serializer = ProductStatisticsSerializer(stats, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CustomerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    pagination_class = StandardPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['customer_name', 'contact_first_name', 'contact_last_name', 'city', 'country']
    ordering_fields = ['credit_limit', 'customer_name']
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Advanced customer search"""
        query_params = request.query_params
        
        customers = Customer.objects.all()
        
        if 'country' in query_params:
            customers = customers.filter(country__icontains=query_params['country'])
        
        if 'city' in query_params:
            customers = customers.filter(city__icontains=query_params['city'])
        
        if 'min_credit' in query_params:
            try:
                min_credit = Decimal(query_params['min_credit'])
                customers = customers.filter(credit_limit__gte=min_credit)
            except:
                pass
        
        if 'has_orders' in query_params:
            if query_params['has_orders'] == 'true':
                customers = customers.filter(order__isnull=False).distinct()
        
        serializer = self.get_serializer(customers, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Customer statistics and spending analysis"""
        try:
            stats = Order.objects.values('customer__customer_name', 'customer__customer_number').annotate(
                total_orders=Count('order_number'),
                total_spent=Sum(F('orderdetail__quantity_ordered') * F('orderdetail__price_each')),
            ).annotate(
                average_order=F('total_spent') / F('total_orders')
            ).order_by('-total_spent')
            
            serializer = CustomerStatisticsSerializer(stats, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def pivot_by_country(self, request):
        """Pivot table: customers by country"""
        try:
            pivot_data = Customer.objects.values('country').annotate(
                total_customers=Count('customer_number'),
                total_credit_limit=Sum('credit_limit'),
                total_orders=Count('order', distinct=True)
            ).order_by('-total_customers')
            
            return Response(pivot_data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = StandardPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order_date', 'shipped_date', 'customer']
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Advanced order search"""
        query_params = request.query_params
        orders = Order.objects.all()
        
        if 'customer_id' in query_params:
            try:
                customer_id = int(query_params['customer_id'])
                orders = orders.filter(customer__customer_number=customer_id)
            except:
                pass
        
        if 'status' in query_params:
            orders = orders.filter(status__iexact=query_params['status'])
        
        if 'from_date' in query_params:
            try:
                from_date = datetime.strptime(query_params['from_date'], '%Y-%m-%d').date()
                orders = orders.filter(order_date__gte=from_date)
            except:
                pass
        
        if 'to_date' in query_params:
            try:
                to_date = datetime.strptime(query_params['to_date'], '%Y-%m-%d').date()
                orders = orders.filter(order_date__lte=to_date)
            except:
                pass
        
        serializer = self.get_serializer(orders, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics_by_date(self, request):
        """Order statistics grouped by date"""
        try:
            stats = Order.objects.annotate(
                date=TruncDate('order_date')
            ).values('date').annotate(
                total_orders=Count('order_number'),
                total_amount=Sum(F('orderdetail__quantity_ordered') * F('orderdetail__price_each')),
            ).annotate(
                average_amount=F('total_amount') / F('total_orders')
            ).order_by('-date')
            
            serializer = OrderStatisticsSerializer(stats, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def statistics_by_customer(self, request):
        """Order statistics grouped by customer"""
        try:
            stats = Order.objects.values('customer__customer_name').annotate(
                total_orders=Count('order_number'),
                total_amount=Sum(F('orderdetail__quantity_ordered') * F('orderdetail__price_each')),
            ).order_by('-total_amount')
            
            return Response(stats)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def statistics_by_status(self, request):
        """Order statistics grouped by status"""
        try:
            stats = Order.objects.values('status').annotate(
                count=Count('order_number'),
                total_amount=Sum(F('orderdetail__quantity_ordered') * F('orderdetail__price_each')),
            ).order_by('-count')
            
            return Response(stats)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def pivot_by_month(self, request):
        """Pivot table: orders by month and status"""
        try:
            orders = Order.objects.all()
            
            data_list = []
            for order in orders:
                data_list.append({
                    'month': order.order_date.strftime('%Y-%m'),
                    'status': order.status,
                    'amount': float(
                        OrderDetail.objects.filter(order=order).aggregate(
                            total=Sum(F('quantity_ordered') * F('price_each'))
                        )['total'] or 0
                    )
                })
            
            df = pd.DataFrame(data_list)
            if len(df) > 0:
                pivot = df.pivot_table(
                    values='amount',
                    index='month',
                    columns='status',
                    aggfunc='sum',
                    fill_value=0
                )
                pivot_dict = pivot.to_dict()
                return Response(pivot_dict)
            else:
                return Response({})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
    pagination_class = StandardPagination
    
    @action(detail=False, methods=['get'])
    def by_order(self, request):
        """Get order details for specific order"""
        order_id = request.query_params.get('order_id')
        if order_id:
            details = OrderDetail.objects.filter(order__order_number=order_id)
        else:
            details = OrderDetail.objects.all()
        
        serializer = self.get_serializer(details, many=True)
        return Response(serializer.data)


class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    pagination_class = StandardPagination
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Payment statistics"""
        try:
            stats = {
                'total_payments': Payment.objects.count(),
                'total_amount': float(Payment.objects.aggregate(Sum('amount'))['amount__sum'] or 0),
                'average_payment': float(Payment.objects.aggregate(Avg('amount'))['amount__avg'] or 0),
                'by_month': list(
                    Payment.objects.extra(
                        select={'month': 'DATE_TRUNC(\'month\', payment_date)'}
                    ).values('month').annotate(
                        total=Sum('amount'),
                        count=Count('check_number')
                    ).order_by('-month')
                )
            }
            return Response(stats)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def by_customer(self, request):
        """Get payments for specific customer"""
        customer_id = request.query_params.get('customer_id')
        if customer_id:
            payments = Payment.objects.filter(customer__customer_number=customer_id)
        else:
            payments = Payment.objects.all()
        
        serializer = self.get_serializer(payments, many=True)
        return Response(serializer.data)


class ProductLineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductLine.objects.all()
    serializer_class = ProductLineSerializer


class EmployeeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
