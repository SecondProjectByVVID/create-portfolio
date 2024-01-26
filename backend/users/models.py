from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db import models

# Create your models here.

class CustomUser(AbstractUser):

    STATUS = (
        ('regular', 'regular'),
        ('subscriber', 'subscriber'),
        ('moderator', 'moderator'),
    )
        
    first_name = models.CharField(max_length=30, default='Пользователь')
    last_name = models.CharField(max_length=150, default='')
    email = models.EmailField(unique=True)
    mobile = PhoneNumberField("моб. телефон", unique=True)
    profession = models.CharField("Профессия", max_length=255)
    location = models.CharField("Местоположение человека - Город", max_length=70, blank=True, null=True)
    status = models.CharField(max_length=100, choices=STATUS, default='regular')
    description = models.TextField("Description", max_length=600, default='', blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"