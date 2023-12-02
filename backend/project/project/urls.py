from django.contrib import admin
from django.urls import path, include
from api import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users-list')
router.register(r'portfolio', views.PortfolioView, 'portfolios-list')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
