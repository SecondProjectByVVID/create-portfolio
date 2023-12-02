from django.contrib import admin
from .models import User, Profile, Portfolio


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    '''Пользователь'''
    list_display = ('id', 'email', 'mobile', 'name', 'surname', 'profession',
                    'is_active', 'is_superuser', 'is_staff', 'date_joined', 'last_login',)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    '''Профиль'''
    list_display = ('id', 'user', 'image', 'location', 'vk',
                    'wa', 'tg',)


@admin.register(Portfolio)
class UserAdmin(admin.ModelAdmin):
    '''Портфолио'''
    list_display = ('id', 'title', 'descriptionfffff',)
