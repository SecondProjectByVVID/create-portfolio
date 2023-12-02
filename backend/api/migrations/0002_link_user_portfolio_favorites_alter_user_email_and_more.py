# Generated by Django 4.2 on 2023-11-25 12:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='portfolio_favorites',
            field=models.ManyToManyField(blank=True, max_length=20, related_name='portfolio_favorites_users', to='api.portfolio', verbose_name='Избранные портфолио'),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, default='', max_length=254, unique=True, verbose_name='Почта'),
        ),
        migrations.AlterField(
            model_name='user',
            name='location',
            field=models.CharField(blank=True, max_length=70, null=True, verbose_name='Местоположение человека - Город'),
        ),
        migrations.AlterField(
            model_name='user',
            name='mobile',
            field=models.TextField(blank=True, default='', unique=True, verbose_name='Мобильный телефон'),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='Имя'),
        ),
        migrations.AlterField(
            model_name='user',
            name='profession',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Профессия'),
        ),
        migrations.AlterField(
            model_name='user',
            name='surname',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='Фамилия'),
        ),
        migrations.AlterField(
            model_name='user',
            name='link',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.link', verbose_name='Ссылки на соц. сети'),
        ),
    ]
