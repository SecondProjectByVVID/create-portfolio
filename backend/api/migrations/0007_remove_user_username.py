# Generated by Django 4.2 on 2023-11-30 18:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_user_managers_user_first_name_user_last_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
    ]
