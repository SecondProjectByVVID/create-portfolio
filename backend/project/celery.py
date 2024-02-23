from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

app = Celery('project')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'delete_old_requests_every_minute': {
        'task': 'api.tasks.delete_old_requests',
        'schedule': crontab(minute='*/1'),
    },
}

# celery -A project worker --loglevel=info