# Generated by Django 4.2.7 on 2024-01-09 02:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='profile',
            name='tg',
            field=models.URLField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='profile',
            name='vk',
            field=models.URLField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='profile',
            name='wa',
            field=models.URLField(blank=True, default=''),
        ),
    ]