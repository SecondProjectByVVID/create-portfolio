# Generated by Django 4.2.7 on 2024-02-23 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_contactus_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='description',
            field=models.TextField(blank=True, default='', max_length=600, null=True, verbose_name='Описание'),
        ),
    ]
