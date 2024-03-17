from django.urls import path

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('portfolio', views.PortfolioView, basename='portfolio')
router.register('portfolios-user', views.PortfoliosRequestUser, basename='portfolios-request-user')
router.register('profile', views.ProfileView, basename='profile')
router.register('playlist', views.PlaylistView, basename='playlist')
router.register('contact-us', views.ContactUsView, basename='contact-us')
router.register('user-favorites', views.FavoritePortfolios, basename='user_favorite_portfolios')

urlpatterns = [
    path('portfolio-list/', views.PortfolioListView.as_view(), name="portfolio-list"),
    path('user-profile/', views.UserProfileView.as_view(), name="user-profile"),
    path('user-profile/<int:pk>/', views.UserProfileView.as_view(), name="user-profile-pk"),
    path('contact-us/<int:user_id>/', views.UserContactUs.as_view(), name='user-contactus'),
]

urlpatterns += router.urls
