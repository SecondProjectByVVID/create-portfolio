# Generated by Django 4.2.7 on 2024-02-22 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_contactus_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contactus',
            name='created_at',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Дата и время отправки заявки'),
        ),
    ]
