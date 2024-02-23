from django.urls import path

from rest_framework.routers import DefaultRouter

from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('activate/<uidb64>/<token>', views.ActivateAccount.as_view(), name='activate'),
    path('password_change/', views.ChangePasswordView.as_view(), name='password_change'),
    path('password_reset/', views.PasswordResetRequestView.as_view(), name='password_reset'),
    path('reset/<uidb64>/<token>', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('vk/login/', views.vk_login, name='vk_login'),
    path('vk/callback/', views.vk_callback, name='vk_callback'),
]

router = DefaultRouter()
router.register('user-list', views.UserListView, basename='user-list')

urlpatterns += router.urls
