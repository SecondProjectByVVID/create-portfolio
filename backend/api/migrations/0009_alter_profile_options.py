# Generated by Django 4.2.7 on 2023-12-02 12:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_user_location_remove_user_portfolio_favorites_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='profile',
            options={'verbose_name': 'Профиль', 'verbose_name_plural': 'Профили'},
        ),
    ]