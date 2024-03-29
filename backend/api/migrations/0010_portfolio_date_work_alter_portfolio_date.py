# Generated by Django 4.2.7 on 2024-02-19 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_profile_tg'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='date_work',
            field=models.DateField(auto_now_add=True, null=True, verbose_name='Дата реализации'),
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='date',
            field=models.DateField(blank=True, null=True, verbose_name='Дата публикации проекта'),
        ),
    ]
