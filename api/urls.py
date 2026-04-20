from django.urls import path
from .views import *

urlpatterns = [
    path('search/', search_customers),
    path('revenue/customer/', revenue_by_customer),
    path('revenue/month/', revenue_by_month),
    path('revenue/product/', revenue_by_product),
]