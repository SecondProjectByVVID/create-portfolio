import logging
from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from .models import ContactUs
from django.utils.timezone import localtime

logger = logging.getLogger(__name__)

@shared_task
def delete_old_requests():
    one_minute_ago = localtime(timezone.now()) - timedelta(minutes=1)
    old_requests = ContactUs.objects.filter(created_at__lte=one_minute_ago)
    
    logger.info(f"Deleting requests older than {one_minute_ago}")
    
    count = old_requests.count()
    old_requests.delete()
    
    logger.info(f"Deleted {count} requests")


