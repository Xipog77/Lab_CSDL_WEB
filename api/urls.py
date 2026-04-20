from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, CustomerViewSet, OrderViewSet, 
    OrderDetailViewSet, PaymentViewSet, ProductLineViewSet,
    EmployeeViewSet
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'order-details', OrderDetailViewSet, basename='order-detail')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'product-lines', ProductLineViewSet, basename='product-line')
router.register(r'employees', EmployeeViewSet, basename='employee')

urlpatterns = [
    path('', include(router.urls)),
]