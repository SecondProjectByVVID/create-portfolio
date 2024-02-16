from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
from .views import LoginView, LogoutView, RegisterView, ActivateAccount, UserView, UserListView

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('activate/<uidb64>/<token>', ActivateAccount.as_view(), name='activate'),
    path('vk/login/', views.vk_login, name='vk_login'),
    path('vk/callback/', views.vk_callback, name='vk_callback'),
]

router = DefaultRouter()
router.register('user', views.UserView, basename='user')
router.register('user-list', views.UserListView, basename='user-list')

urlpatterns += router.urls
