from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests

def check_captcha(request, failed_attempts):
    if failed_attempts >= 3:
        recaptcha_response = request.data.get('g-recaptcha-response')
        data = {
            'secret': settings.RECAPTCHA_PRIVATE_KEY,
            'response': recaptcha_response
        }
        r = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
        result = r.json()

        if not result['success']:
            return Response({"message": "Ошибка в поле САРТСНА. Снова подтвердите, что вы не робот.", "failed_attempts": failed_attempts}, status=status.HTTP_400_BAD_REQUEST)

    return None
