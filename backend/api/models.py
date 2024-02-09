from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


class Profile(models.Model):
    """Профиль пользователя"""
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, null=True)
    description = models.TextField(
        "Описание", null=True, blank=True)
    image = models.ImageField(
        "Фото", upload_to="user_images/", blank=True, null=True)
    portfolio_favorites = models.ManyToManyField(
        'Portfolio', verbose_name="Избранные портфолио", related_name='portfolio_favorites_users', max_length=20, blank=True)

    vk = models.URLField("Вконтакте", blank=True, default='')
    wa = models.URLField("WhatsApp", blank=True, default='')
    tg = models.URLField("Telegram", blank=True, default='')
    
    def __str__(self):
        return f"{self.user} - {self.user.email}"
    
    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'


class Portfolio(models.Model):
    """Портфолио"""
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, null=True)
    title = models.CharField(
        "Название проекта", null=True, blank=True)
    description = models.TextField(
        "Описание", null=True, blank=True)
    image = models.ImageField(
        "Изображение", upload_to="portfolio_images/", blank=True, null=True)
    
    def __str__(self):
        return f"{self.title} - {self.user}"

    class Meta:
        verbose_name = 'Портфолио'
        verbose_name_plural = 'Портфолио'