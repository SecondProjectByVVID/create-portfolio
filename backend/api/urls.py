from django.urls import path

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('portfolio', views.PortfolioView, basename='portfolio')
router.register('profile', views.ProfileView, basename='profile')
router.register('playlist', views.PlaylistView, basename='playlist')
router.register('contact-us', views.ContactUsView, basename='contact-us')

urlpatterns = [
    path('portfolio-list/', views.PortfolioListView.as_view(), name="portfolio-list"),
    path('user-profile/', views.UserProfileView.as_view(), name="user-profile"),
    path('user-profile/<int:pk>/', views.UserProfileView.as_view(), name="user-profile-pk"),
]


urlpatterns += router.urls
