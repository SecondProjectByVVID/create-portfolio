from django.contrib.auth.models import AbstractUser
from django.db import models

from phonenumber_field.modelfields import PhoneNumberField

class CustomUser(AbstractUser):

    STATUS = (
        ('regular', 'regular'),
        ('subscriber', 'subscriber'),
        ('moderator', 'moderator'),
    )

    first_name = models.CharField("Имя", max_length=30, default='Пользователь')
    last_name = models.CharField("Фамилия", max_length=150, default='')
    email = models.EmailField("Почта", unique=True)
    mobile = PhoneNumberField("моб. телефон", unique=True)
    profession = models.CharField("Профессия", max_length=255)
    location = models.CharField("Местоположение человека - Город", max_length=70, blank=True, null=True)
    status = models.CharField(max_length=100, choices=STATUS, default='regular')
    password_reset_token_used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    