from django.contrib import admin
from .models import User, Portfolio
#dima krytoi

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    '''Пользователь'''
    list_display = ('id', 'email', 'mobile', 'name', 'surname', 'profession', 'vk', 'wa', 'tg', 'location',
                    'is_active', 'is_superuser', 'is_staff', 'date_joined', 'last_login',)


@admin.register(Portfolio)
class UserAdmin(admin.ModelAdmin):
    '''Портфолио'''
    list_display = ('id', 'title', 'description',)
