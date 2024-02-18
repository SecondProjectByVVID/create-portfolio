from rest_framework.response import Response
from rest_framework import status

from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from django.conf import settings

from .tokens import account_activation_token

import requests

def check_captcha(request, failed_attempts):
    if failed_attempts >= 4:
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

def activateEmail(request, user):
    mail_subject = 'Активируйте свою учетную запись пользователя.'
    domain = get_current_site(request).domain
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = account_activation_token.make_token(user)
    protocol = 'https' if request.is_secure() else 'http'
    activation_link = f'{protocol}://127.0.0.1:8000/activate/{uid}/{token}'
    message = f"""
    Дорогой {user.first_name},
    
    Спасибо за регистрацию! Пожалуйста, перейдите по следующей ссылке, чтобы подтвердить свою учетную запись:
    
    {activation_link}
    
    Если вы не запрашивали это письмо, просто проигнорируйте его.
    
    С уважением,
    Pozor
    """
    email = EmailMessage(mail_subject, message, to=[user.email])
    if email.send():
        return Response({"message": f"Дорогой {user.first_name}, пожалуйста, перейдите в свой почтовый ящик {user.email} и нажмите на полученную ссылку активации, чтобы подтвердить и завершить регистрацию. Примечание: проверьте папку со спамом."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": f"Проблема с отправкой подтверждающего письма на {user.email}, проверьте, правильно ли вы его ввели."}, status=status.HTTP_400_BAD_REQUEST)


def check_captcha_reset(data):
    recaptcha_response = data.get('g-recaptcha-response')
    data = {
        'secret': settings.RECAPTCHA_PRIVATE_KEY,
        'response': recaptcha_response
    }
    r = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
    result = r.json()

    if not result['success']:
        raise serializers.ValidationError("Ошибка в поле САРТСНА. Снова подтвердите, что вы не робот.")
    
def send_reset_password_email(request, user):
    mail_subject = 'Сброс пароля'
    domain = get_current_site(request).domain
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = account_activation_token.make_token(user)
    protocol = 'https' if request.is_secure() else 'http'
    reset_link = f'{protocol}://127.0.0.1:8000/reset/{uid}/{token}'
    message = f"""
    Дорогой {user.first_name},
    
    Мы получили запрос на сброс вашего пароля. Пожалуйста, перейдите по следующей ссылке, чтобы установить новый пароль:
    
    {reset_link}
    
    Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.
    
    С уважением,
    Pozor
    """
    email = EmailMessage(mail_subject, message, to=[user.email])
    if email.send():
        return Response({"message": f"Дорогой {user.first_name}, пожалуйста, перейдите в свой почтовый ящик {user.email} и нажмите на полученную ссылку для сброса пароля."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": f"Проблема с отправкой письма для сброса пароля на {user.email}, проверьте, правильно ли вы его ввели."}, status=status.HTTP_400_BAD_REQUEST)
