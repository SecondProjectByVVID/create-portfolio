# Generated by Django 4.2.7 on 2024-02-14 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_portfolio_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='wa',
            field=models.CharField(blank=True, default='', max_length=15, verbose_name='WhatsApp'),
        ),
    ]
