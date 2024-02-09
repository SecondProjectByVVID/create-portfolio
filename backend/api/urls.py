from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('portfolio', views.PortfolioView, basename='portfolio')
router.register('profile', views.ProfileView, basename='profile')

urlpatterns = router.urls
