from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin, UserManager
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField



class CustomUserManager(BaseUserManager):
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


class User(AbstractUser):
    """Пользователь"""
    email = models.EmailField(
        "Почта", blank=True, default='', unique=True)
    mobile = PhoneNumberField(
        "Мобильный телефон", blank=True, null=True, unique=True)
    name = models.CharField(
        "Имя", max_length=255, blank=True, default='')
    surname = models.CharField(
        "Фамилия", max_length=255, blank=True, default='')
    profession = models.CharField(
        "Профессия", max_length=255, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    username = None

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Profile(models.Model):
    """Профиль пользователя"""
    user = models.OneToOneField(
        'User', on_delete=models.CASCADE)
    image = models.ImageField(
        "Фото", upload_to="user_images/", blank=True, null=True)
    location = models.CharField(
        "Местоположение человека - Город", max_length=70, blank=True, null=True)
    portfolio_favorites = models.ManyToManyField(
        'Portfolio', verbose_name="Избранные портфолио", related_name='portfolio_favorites_users', max_length=20, blank=True)

    vk = models.TextField(blank=True, default='')
    wa = models.TextField(blank=True, default='')
    tg = models.TextField(blank=True, default='')
    
    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'


class Portfolio(models.Model):
    """Портфолио"""
    user = models.OneToOneField(
        'User', on_delete=models.CASCADE, default=None)
    title = models.CharField(
        "Название проекта", null=True, blank=True)
    description = models.TextField(
        "Описание", null=True, blank=True)
    image = models.ImageField(
        "Изображение", upload_to="portfolio_images/", blank=True, null=True)

    class Meta:
        verbose_name = 'Портфолио'
        verbose_name_plural = 'Портфолио'
