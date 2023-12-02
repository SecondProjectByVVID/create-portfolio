from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, UserManager
from django.utils import timezone


class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """Пользователь"""
    email = models.EmailField(
        "Почта", blank=True, default='', unique=True)
    mobile = models.TextField(
        "Мобильный телефон", blank=True, default='', unique=True)
    name = models.CharField("Имя", max_length=255, blank=True, default='')
    surname = models.CharField(
        "Фамилия", max_length=255, blank=True, default='')
    profession = models.CharField(
        "Профессия", max_length=255, blank=True, null=True)
    # image = models.("Фото", blank=True, default='')
    location = models.CharField(
        "Местоположение человека - Город", max_length=70, blank=True, null=True)
    portfolio_favorites = models.ManyToManyField(
        'Portfolio', verbose_name="Избранные портфолио", related_name='portfolio_favorites_users', max_length=20, blank=True)

    vk = models.TextField(blank=True, default='')
    wa = models.TextField(blank=True, default='')
    tg = models.TextField(blank=True, default='')

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Portfolio(models.Model):
    """Портфолио"""
    title = models.CharField("Название проекта", null=True, blank=True)
    description = models.TextField("Описание", null=True, blank=True)
    # image = models.CharField(
    # "Изображение", max_length=10000000, null=True, blank=True)

    class Meta:
        verbose_name = 'Портфолио'
        verbose_name_plural = 'Портфолио'
