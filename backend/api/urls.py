from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('portfolio', views.PortfolioView, basename='portfolio')
router.register('profile', views.ProfileView, basename='profile')

urlpatterns = [
    path("portfolio-list/", views.PortfolioListView.as_view(), name="portfolio-list"),
    path('user-profile/', views.UserProfileView.as_view(), name="user-profile"),
    path('user-profile/<int:pk>/', views.UserProfileView.as_view(), name="user-profile-pk"),
]


urlpatterns += router.urls