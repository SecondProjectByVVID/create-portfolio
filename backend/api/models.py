from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

class Profile(models.Model):
    """Профиль пользователя"""
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, null=True)
    description = models.TextField(
        "Описание", default='', max_length=600, null=True, blank=True)
    image = models.ImageField(
        "Фото", upload_to="user_images/", blank=True, null=True)
    portfolio_favorites = models.ManyToManyField(
        'Portfolio', verbose_name="Избранные портфолио", related_name='portfolio_favorites_users', max_length=20, blank=True)
    
    vk = models.URLField(
        "Вконтакте", blank=True, default='')
    wa = models.CharField(
        "WhatsApp", max_length=20, blank=True, default='')
    tg = models.CharField(
        "Telegram", max_length=20, blank=True, default='')  
    
    def __str__(self):
        return f"{self.user} - {self.user.email}"
    
    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

class Portfolio(models.Model):
    """Портфолио"""
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True)
    title = models.CharField(
        "Название проекта", null=True, blank=True)
    description = models.TextField(
        "Описание", null=True, blank=True)
    date_work = models.DateField(
        "Дата реализации", auto_now=False, auto_now_add=False, null=True, blank=True)
    created_at = models.DateField(
        "Дата публикации проекта", auto_now=False, auto_now_add=True, null=True, blank=True)    
    
    def __str__(self):
        return f"{self.title} - {self.user}"

    class Meta:
        verbose_name = 'Портфолио'
        verbose_name_plural = 'Портфолио'
        
class PortfolioImage(models.Model):
    """Изображение портфолио"""
    image = models.ImageField(
        "Изображение", upload_to="portfolio_images/", blank=True, null=True)
    portfolio = models.ForeignKey(
        'Portfolio', related_name='images', on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.portfolio} - {self.image}"

    class Meta:
        verbose_name = 'Портфолио изображение'
        verbose_name_plural = 'Портфолио изображения'
        
class Playlist(models.Model):
    """Плейлист"""
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField("Название плейлиста", max_length=255)
    projects = models.ManyToManyField(Portfolio)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Плейлист проектов'
        verbose_name_plural = 'Плейлисты проектов'

class ContactUs(models.Model):
    """Связаться с нами"""
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    email = models.EmailField(
        "Контактная почта", max_length=255)
    description = models.TextField(
        "Сообщение", max_length=600, null=True, blank=True)
    created_at = models.DateTimeField(
        "Дата и время отправки заявки", auto_now=False, auto_now_add=False, null=True, blank=True)

    def __str__(self):
        return f"Сообщение - {self.user} - {self.created_at}"
    
    class Meta:
        verbose_name = 'Связаться с нами'
        verbose_name_plural = 'Связаться с нами'
