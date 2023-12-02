from django.contrib import admin
from django.urls import path, include
from api import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from api.views import UserView

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users-list')
router.register(r'profile', views.ProfileView, 'profile-list')
router.register(r'portfolio', views.PortfolioView, 'portfolios-list')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('create_user/', UserView.as_view({'post': 'create'}), name='create_user'),
    path('authenticate_user/', UserView.as_view({'post': 'authenticate'}), name='authenticate_user'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)